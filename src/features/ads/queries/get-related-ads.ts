import { cache } from "react";
import { toAdListItem } from "@/entities/ad";
import type { Ad } from "@/payload-types";
import { getPayloadClient } from "@/shared/lib/payload";

const RELATED_LIMIT = 4;

export const getRelatedAds = cache(async (adId: number) => {
  const payload = await getPayloadClient();
  const current = (await payload.findByID({ collection: "ads", id: adId, depth: 0 })) as Ad;

  const categoryId = typeof current.category === "number" ? current.category : current.category?.id;
  const contentTypeIds = (current.contentTypes ?? []).map((contentType) =>
    typeof contentType === "number" ? contentType : contentType.id,
  );

  if (!categoryId && contentTypeIds.length === 0) return [];

  const { docs } = await payload.find({
    collection: "ads",
    where: {
      _status: { equals: "published" },
      id: { not_equals: adId },
      or: [
        ...(categoryId ? [{ category: { equals: categoryId } }] : []),
        ...(contentTypeIds.length > 0 ? [{ contentTypes: { in: contentTypeIds } }] : []),
      ],
    },
    sort: "-createdAt",
    depth: 1,
    limit: RELATED_LIMIT,
  });

  return (docs as Ad[]).flatMap((ad) => toAdListItem(ad) ?? []);
});
