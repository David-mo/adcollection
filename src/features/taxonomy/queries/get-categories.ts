import { cache } from "react";
import { toTaxonomyRef } from "@/entities/taxonomy";
import { getPayloadClient } from "@/shared/lib/payload";

export const getCategories = cache(async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "categories",
    sort: "name",
    limit: 0,
  });
  return docs.map(toTaxonomyRef);
});
