import { cache } from "react";
import { toAdListItem } from "@/entities/ad";
import type { Ad } from "@/payload-types";
import { getPayloadClient } from "@/shared/lib/payload";

// Postgres caps bind parameters per statement, and an unbounded IN list from
// client-held favorites is untrusted input. Slice before it reaches the driver.
const MAX_SLUGS = 500;

export const getAdsBySlugs = cache(async (slugs: readonly string[]) => {
  if (slugs.length === 0) return [];

  const payload = await getPayloadClient();
  const boundedSlugs = slugs.slice(0, MAX_SLUGS);
  const { docs } = await payload.find({
    collection: "ads",
    where: { slug: { in: boundedSlugs }, _status: { equals: "published" } },
    depth: 1,
    limit: boundedSlugs.length,
  });

  const items = (docs as Ad[]).flatMap((ad) => toAdListItem(ad) ?? []);
  const bySlug = new Map(items.map((item) => [item.slug, item]));

  // Preserve the caller's order so the favorites grid reflects save order
  // rather than whatever order the database returns.
  return boundedSlugs.flatMap((slug) => bySlug.get(slug) ?? []);
});
