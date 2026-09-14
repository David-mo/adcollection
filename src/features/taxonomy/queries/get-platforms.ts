import { cache } from "react";
import { toTaxonomyRef } from "@/entities/taxonomy";
import { getPayloadClient } from "@/shared/lib/payload";

export const getPlatforms = cache(async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "platforms",
    sort: "name",
    limit: 0,
  });
  return docs.map(toTaxonomyRef);
});
