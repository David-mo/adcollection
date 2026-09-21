/** Isolated review data only. Never run against the production database. */
import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { getPayload } from 'payload';
import config from '../src/payload.config';

if (process.env.NEXT_PUBLIC_REVIEW_MODE !== 'true' || process.env.STORAGE_MODE !== 'local' || process.env.REVIEW_SEED_CONFIRM !== 'isolated') {
  throw new Error('Review seed requires explicit isolated review mode and local storage.');
}
const email = process.env.REVIEW_ADMIN_EMAIL;
const password = process.env.REVIEW_ADMIN_PASSWORD;
if (!email || !password) throw new Error('Set review-only admin credentials before seeding.');
const payload = await getPayload({ config });
const publicBase = 'https://pub-0a938eb01fa64f2d94d57724d117426d.r2.dev';
const scratch = path.resolve('.review-seed');
await mkdir(scratch, { recursive: true });
async function upsert(collection: string, slug: string, data: Record<string, unknown>) {
  const found = await payload.find({ collection: collection as 'categories', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true });
  if (found.docs[0]) return found.docs[0];
  return payload.create({ collection: collection as 'categories', data: { ...data, slug } as never, overrideAccess: true });
}
const existingUser = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1, overrideAccess: true });
if (!existingUser.docs.length) await payload.create({ collection: 'users', data: { email, password }, overrideAccess: true });
const industry = await upsert('categories', 'dating-social-networking', { name: 'Dating & Social Networking' });
const types = [
  ['ugc', 'UGC', 'Creator-led content.'],
  ['complex', 'Complex', 'Team definition pending; do not auto-assign.'],
  ['b-roll', 'B-roll', 'Supporting footage; only assign when relevant to the example.'],
  ['blink', 'Blink', 'Team definition pending; do not auto-assign.'],
  ['mashup', 'Mashup', 'An edit combining multiple creative sources.'],
  ['static', 'Static', 'Still-image creative. Video viewer support ships first.'],
];
let ugcId: number | undefined;
for (const [slug, name, description] of types) {
  const doc = await upsert('content-types', slug, { name, description });
  if (slug === 'ugc') ugcId = doc.id;
}
const client = await upsert('clients', 'bumble', { name: 'Bumble', industry: industry.id });
async function media(filename: string, alt: string) {
  const filePath = path.join(scratch, filename);
  const response = await fetch(`${publicBase}/${filename}`);
  if (!response.ok) throw new Error(`Seed download ${filename}: HTTP ${response.status}`);
  await writeFile(filePath, Buffer.from(await response.arrayBuffer()));
  const found = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1, overrideAccess: true });
  if (found.docs[0]) {
    const upload = payload.collections.media.config.upload;
    if (upload && typeof upload === 'object' && upload.staticDir) {
      await mkdir(upload.staticDir, { recursive: true });
      await copyFile(filePath, path.join(upload.staticDir, filename));
    }
    return found.docs[0];
  }
  return payload.create({ collection: 'media', data: { alt }, filePath, overrideAccess: true });
}
const entries = [
  { key: 'leslie', title: 'Bumble: First date bowling vlog', source: '34389d7a-9bc6-4d87-acb5-d63d310d4e6b' },
  { key: 'sebas', title: 'Bumble: Arcade first date', source: 'de711b90-5760-401d-94cd-8641edafbcef' },
  { key: 'kirsten', title: 'Bumble: Thrifting first date', source: 'dae32bbd-15ad-454b-9af3-29b0e1d69edd' },
];
for (const entry of entries) {
  const video = await media(`${entry.key}.mp4`, entry.title);
  const thumbnail = await media(`${entry.key}.jpg`, entry.title);
  await upsert('ads', `review-bumble-${entry.key}`, {
    thumbnailTitle: entry.title, name: 'Bumble', companyName: 'Bumble', client: client.id,
    video: video.id, thumbnail: thumbnail.id, category: industry.id, contentTypes: [ugcId],
    madeWithInbeat: true, featured: true, _status: 'published',
    originalUrl: `https://next.frame.io/project/b3838226-fd85-4e0f-b703-26fda68f4e80/view/${entry.source}`,
  });
  console.log(`Review example ready: ${entry.key}`);
}
console.log('Isolated review seed complete. Production drafts remain unchanged.');
await payload.destroy();
