# Sales enablement implementation plan

Status: proposed implementation scope; local branch `feat/sales-enablement`, based on `main` at `34f2887`. No application changes or deployments yet.

## Outcome

A salesperson can find a relevant, approved example by capability and industry, present it with a credible explanation and available results, and copy its link within 60 seconds.

Feedback supplied by Dave: Max wants coverage of UGC, Complex, B-roll, Blink, Mashup, and Static by industry/category; video can launch first. Fouad wants examples and stats available during the client call. These are product inputs, not instructions to contact anyone or publish changes.

## Existing foundation and constraints

- Next.js 16.3.4, Payload 3.89, PostgreSQL, R2 media, Bun package manager.
- Category, content-type and platform filtering already exists in `src/features/ads/components/browse/filter-bar.tsx` and `src/features/ads/queries/build-ads-where.ts`.
- Backend keyword search already matches title, caption and name. Add an obvious browse search control and extend useful matches rather than introduce a search service.
- `madeWithInbeat` means either made using inBeat or by the agency (`src/payload/collections/ads.ts`). It is insufficient evidence of agency authorship. Preserve it and add explicit attribution rather than silently relabel existing records.
- Favorites are browser-local. Individual detail links and sharing controls already exist.
- Ratings are creative evaluations, not campaign performance.
- Current ad entities require video. Static requires a coordinated schema, mapper, card and detail-view change.
- Published ads are public; local reads bypass access rules by default. Media URLs are public. Internal notes and confidential assets require real authorization and storage changes.
- Database schema push is disabled. Use explicit migrations and generated Payload types.

## First increment: find relevant work

1. Add visible keyword search beside the existing filters; search title, caption, name and company name. Preserve search/filter state in URLs, support clearing filters, and show useful no-results feedback. Reset pagination when filters change.
2. Relabel style as content type. Reuse the existing taxonomy; inspect actual category values before treating categories as industries. Define Complex and Blink with the team before tagging examples. Do not guess these definitions or automatically retag production data.
3. Add explicit work attribution: agency-produced, made using inBeat, external reference, or unverified. Default legacy records to unverified; use the old flag only as a review hint. Add an agency-produced filter and clear attribution on cards/detail pages.
4. Keep the existing library available. A sales entry point should default to agency-produced examples once there is enough verified content. Empty coverage must be visible rather than filled with misattributed work.

Likely changes: ads collection and migration, generated types, entities/ad, filter schemas, query builder, filter bar, cards and public browse page. Keep existing URLs valid.

Acceptance: combining keyword + content type + category produces matching published examples; refreshing or sharing the URL preserves filters; clearing filters and loading more do not retain stale results; no draft is exposed; agency-produced results contain only explicitly verified records.

## Second increment: explain and substantiate the work

Add an optional CMS sales-context section:

- Client objective and public-facing summary of what we delivered.
- Capability/service tags and a concise client-safe talking point.
- Optional results entries: metric name, value and unit, timeframe, comparison/baseline where relevant, contextual caveat, public source/case-study link and explicit approval to display.

Keep editorial evidence and internal source material out of public fields. Only render approved results through an explicit public projection; enforce field access on REST/GraphQL as well as page output if unapproved values are stored. Put campaign results in their own section, separate from creative ratings. Missing results should not be represented as zero or inferred from creative ratings.

Start with public-safe material, using existing CMS authentication for editors. Do not introduce a sales login merely to view public examples.

Acceptance: legacy examples still render; unapproved results cannot be read anonymously through pages or APIs; approved results show their context; missing sales metadata leaves no empty UI sections.

## Third increment: present and share

Add a presentation view using the existing example URL with a presentation parameter or a dedicated route. Show the creative prominently, client-safe summary, capability labels and approved results. Suppress unrelated recommendations and provide an obvious exit. Reuse the existing copy-link control and ensure the presentation state survives the copied link.

Acceptance: a rep can find an example, play it, explain the work, reference available results and copy its presentation link within 60 seconds. Validate keyboard use and a narrow viewport as well as desktop screen sharing.

## Later increments

- Static support: add a media-kind field defaulting legacy records to video, conditional CMS validation, image rendering and mapper compatibility. Upload support alone is not sufficient.
- Saved client collections: server-backed ownership, ordered items, client-safe titles and revocable share links. Browser favorites remain useful for personal shortlists.
- Sales-only notes, private collections and confidential assets: define roles and access across pages, local queries, REST, GraphQL, metadata and object storage before building the UI. An unlisted URL is not authorization.
- Sharing analytics only after collection sharing is useful.

## Content readiness

Use a small curated set of approved examples spanning the priority industries and capability types. Verify actual authorship, tags and any performance claims. Seed staging with clearly identified non-production records; do not fabricate client results. Track missing coverage explicitly. Taxonomy definitions, approved assets and evidence for results are content dependencies, not reasons to delay building search.

## Review and release

1. Read the installed Next.js guides required by AGENTS.md before implementation.
2. Implement increment one first; add focused schema/query/entity regression coverage and run the relevant existing tests, typecheck, lint and build.
3. Inspect deployment ownership and reuse an appropriate staging environment or provision a separate Dave-owned Render service. Use isolated PostgreSQL and R2 storage, staging CMS credentials and correct upload CORS/site URLs. Do not copy production secrets or run migrations against production.
4. Generate and verify migrations on the isolated database; verify legacy record compatibility and realistic seeded data.
5. Use Luna for bounded routine test execution/browser smoke checks while Astra handles implementation and failure diagnosis. Smoke-check CMS login, the combined search/filter flow, playback and link reopening.
6. Give Dave a stable staging URL early with revision, access instructions and known limitations. Add increments two and three there after the first flow is usable.
7. Complete required release checks after review and obtain approval before a production release or a merge that triggers one. Do not modify shared release settings to enforce this personal review workflow.

Staging resources, credentials, existing taxonomy values and coverage of approved agency work have not yet been inspected. No staging URL or test result is claimed by this plan.
