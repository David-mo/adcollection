import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Pinned to the one bucket the app uploads to. A `*.r2.dev` wildcard would let the
// image optimizer proxy any R2 bucket on the internet.
const r2PublicHostname = new URL(process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL as string).hostname;

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: r2PublicHostname }],
  },
};

export default withPayload(nextConfig);
