# Sales enablement implementation plan

Updated September 21, 2026 from Dave's scope decisions. Branch: `feat/sales-enablement`.

## Agreed scope

The library contains our work. Sales reps find videos by client, video type and industry, assemble a named collection, and share a view-only link with a prospect. Explanations of the work, performance results and attribution filters are out of scope for this release.

- Video types: editable taxonomy supporting multiple types per video. Initial candidates are UGC, Complex, B-roll, Blink and Mashup. Obtain team definitions for Complex and Blink before assigning them. Static is a later media format.
- Industries: a separate editable taxonomy. Inspect existing Categories before deciding whether they can serve this purpose without a conflicting migration.
- Clients: first-class records with name, optional logo and default industry. Each video links to a client; support video-level industry overrides. Migrate existing company names with duplicate review.
- Collections: signed-in team members create, name, reorder and edit selections. Store centrally with ownership and team handoff support. Clients use view-only share links, with revocation. A collection can contain work from multiple clients.
- Search: expose existing backend keyword search beside combined filters and extend to client names. Preserve query state in URLs, reset pagination when filters change, and provide clear empty states.

## Existing foundation

Next.js 16.3.4 and Payload 3.89, PostgreSQL metadata and Cloudflare R2 media. Existing content types, categories, platforms, browser-local favorites, detail links and copy/share controls can be reused. Actual video files belong in R2, not database rows; collections reference existing video records.

The current Payload admin supports media upload and editing ads. Large media use direct S3-compatible upload with `clientUploads: true`. A browser login is available, but it does not imply a separately configured script/API credential. Users currently use standard authentication, not API keys.

The current public route and data mapper require platform and video relations. Platform must not be inferred from vertical aspect ratio. Resolve this dependency as part of the sales-library implementation. Static media requires coordinated schema, mapper and viewer changes.

## Four-video pilot

Dave selected the four files in the Frame.io Bumble folder and authorized importing them into Payload. Model split: Astra decisions/review, Sol preparation/import, Gemini video analysis.

Workflow: fetch selected versions; retain source file IDs and a local import manifest; have Gemini propose client/type/industry with timestamp evidence; resolve ambiguity; generate thumbnails and web-compatible videos; check duplicates; upload media; create draft records first; verify relationships and playback before publication. Do not infer channel, invent ratings or classify undefined types. Frame.io remains the source, while AdCollection stores a copy for playback.

No automatic replacement when a Frame.io version changes. Reimports should detect existing source IDs and require an explicit update decision.

## Implementation order and acceptance

1. Client and industry data model plus filters; align video types with the team's definitions. Use explicit Payload migrations and generated types; database push is disabled.
2. Team collection creation/editing and client-facing sharing, with owner/team authorization and revocation enforced server-side. Collection privacy does not automatically make existing public R2 media confidential.
3. Curate initial videos, migrate legacy metadata carefully, and verify the complete sales workflow.

Acceptance: a salesperson finds relevant videos by client/type/industry, creates and orders a collection, and opens the shared view on another device within one minute. Anonymous viewers cannot edit collections or read drafts. Revoked links cease serving the collection. Legacy public URLs continue to work.

## Dave's review workflow

Read the repo's AGENTS.md and the relevant installed Next.js guides before coding. Run focused regression tests, typecheck, lint and build. Use a separate Dave-owned Render staging environment with isolated database/storage, working test login and realistic data. Smoke-check collection creation, persistence, editing, sharing/revocation, playback and mobile presentation. Let Dave review the stable staging URL before broader release checks and production approval. Do not alter shared deployment rules or merge into production without release authorization.

This is a plan, not an implemented release. No staging deployment is claimed.
