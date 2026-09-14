import { cache } from "react";
import { toTaxonomyRef } from "@/entities/taxonomy";
import { getPayloadClient } from "@/shared/lib/payload";

export const getContentTypes = cache(async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "content-types",
    sort: "name",
    limit: 0,
  });
  return docs.map(toTaxonomyRef);
});
