import { type AdListItem, toAdListItem } from "@/entities/ad";
import type { Ad } from "@/payload-types";
import { getPayloadClient } from "@/shared/lib/payload";

export interface SharedCollection {
  name: string;
  description: string | null;
  ads: AdListItem[];
}

const SHARE_TOKEN_PATTERN = /^[A-Za-z0-9_-]{32}$/;

export function restoreCollectionOrder(ads: AdListItem[], orderedIds: number[]): AdListItem[] {
  const byId = new Map(ads.map((ad) => [ad.id, ad]));
  return orderedIds.flatMap((id) => byId.get(id) ?? []);
}

export async function getSharedCollection(token: string): Promise<SharedCollection | null> {
  if (!SHARE_TOKEN_PATTERN.test(token)) return null;

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "sales-collections",
    overrideAccess: true,
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      and: [{ shareToken: { equals: token } }, { sharingEnabled: { equals: true } }],
    },
    select: { name: true, description: true, ads: true },
  });
  const collection = result.docs[0];
  if (!collection) return null;

  const orderedIds = collection.ads.flatMap((ad) => (typeof ad === "number" ? ad : ad.id));
  if (orderedIds.length === 0) {
    return { name: collection.name, description: collection.description ?? null, ads: [] };
  }

  const adsResult = await payload.find({
    collection: "ads",
    overrideAccess: true,
    depth: 1,
    limit: orderedIds.length,
    pagination: false,
    where: { and: [{ id: { in: orderedIds } }, { _status: { equals: "published" } }] },
    select: {
      slug: true,
      thumbnailTitle: true,
      name: true,
      companyName: true,
      client: true,
      overallScore: true,
      thumbnail: true,
      video: true,
      platform: true,
      category: true,
      contentTypes: true,
      createdAt: true,
    },
  });

  const ads = (adsResult.docs as Ad[]).flatMap((ad) => toAdListItem(ad) ?? []);
  return {
    name: collection.name,
    description: collection.description ?? null,
    ads: restoreCollectionOrder(ads, orderedIds),
  };
}
