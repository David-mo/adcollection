import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Pinned to the one bucket the app uploads to. A `*.r2.dev` wildcard would let the
// image optimizer proxy any R2 bucket on the internet.
const r2PublicBaseUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL;
const usesLocalStorage = process.env.STORAGE_MODE === "local";

if (!usesLocalStorage && !r2PublicBaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_R2_PUBLIC_BASE_URL is required at build time to allow-list the image host.",
  );
}

const r2PublicHostname = r2PublicBaseUrl ? new URL(r2PublicBaseUrl).hostname : null;

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: r2PublicHostname ? [{ protocol: "https", hostname: r2PublicHostname }] : [],
  },
};

export default withPayload(nextConfig);
