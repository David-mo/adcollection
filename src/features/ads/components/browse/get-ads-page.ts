"use server";

import { getPublishedAds, type PublishedAdsResult } from "@/features/ads/queries/get-published-ads";
import { adFilterSchema } from "@/features/ads/schemas";

// A "use server" action is a public POST endpoint and the AdFilter type is erased at
// runtime, so the schema (which caps limit at 100) is the only thing stopping an
// anonymous caller from asking Payload to hydrate the whole table.
export async function getAdsPage(filter: unknown): Promise<PublishedAdsResult> {
  return getPublishedAds(adFilterSchema.parse(filter));
}
