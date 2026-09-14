"use server";

import type { AdListItem } from "@/entities/ad";
import { getAdsBySlugs } from "@/features/ads/queries/get-ads-by-slugs";

export async function getFavoriteAds(slugs: string[]): Promise<AdListItem[]> {
  return getAdsBySlugs(slugs);
}
