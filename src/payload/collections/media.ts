import path from "node:path";
import type { CollectionConfig } from "payload";
import { anyoneCanRead, onlyLoggedIn } from "@/payload/access";
import { env } from "@/shared/config/env";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    // Anonymous reads here would enumerate every upload, including the videos of
    // unpublished draft ads, each with a directly playable R2 URL. The public site
    // is unaffected: its Local API calls default to overrideAccess: true and the
    // files themselves are served straight from the public R2 bucket.
    read:
      env.STORAGE_MODE === "local" && env.NEXT_PUBLIC_REVIEW_MODE === "true"
        ? anyoneCanRead
        : onlyLoggedIn,
    create: onlyLoggedIn,
    update: onlyLoggedIn,
    delete: onlyLoggedIn,
  },
  upload: {
    mimeTypes: ["image/*", "video/mp4", "video/webm", "video/quicktime"],
    ...(env.STORAGE_MODE === "local"
      ? { staticDir: path.resolve(process.cwd(), "review-uploads") }
      : {}),
  },
  fields: [{ name: "alt", type: "text" }],
};
