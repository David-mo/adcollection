import { cache } from "react";
import { toAdListItem } from "@/entities/ad";
import type { Ad } from "@/payload-types";
import { getPayloadClient } from "@/shared/lib/payload";

const FEATURED_LIMIT = 8;

export const getFeaturedAds = cache(async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "ads",
    where: { _status: { equals: "published" }, featured: { equals: true } },
    sort: "-createdAt",
    depth: 1,
    limit: FEATURED_LIMIT,
  });
  return (docs as Ad[]).flatMap((ad) => toAdListItem(ad) ?? []);
});
