import { randomBytes } from "node:crypto";
import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";
import { onlyLoggedIn } from "@/payload/access";
import { env } from "@/shared/config/env";

export const salesCollectionsAccess = {
  read: onlyLoggedIn,
  create: onlyLoggedIn,
  update: onlyLoggedIn,
  delete: onlyLoggedIn,
} satisfies NonNullable<CollectionConfig["access"]>;

export function generateShareToken(): string {
  return randomBytes(24).toString("base64url");
}

export const prepareSalesCollectionShare: CollectionBeforeValidateHook = ({
  data,
  operation,
  originalDoc,
}) => {
  if (!data) return data;

  const shareToken =
    operation === "create" ? generateShareToken() : (originalDoc?.shareToken as string | undefined);

  if (!shareToken) return data;

  return {
    ...data,
    shareToken,
    shareUrl: `${env.NEXT_PUBLIC_SITE_URL}/collections/${shareToken}`,
  };
};

export const SalesCollections: CollectionConfig = {
  slug: "sales-collections",
  labels: { singular: "Collection", plural: "Collections" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "sharingEnabled", "updatedAt"],
    description: "Create an ordered selection of ads and share it with an unlisted view-only link.",
  },
  access: salesCollectionsAccess,
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "description",
      type: "textarea",
      admin: { description: "Optional introduction shown on the public collection page." },
    },
    {
      name: "ads",
      type: "relationship",
      relationTo: "ads",
      hasMany: true,
      required: true,
      admin: { description: "Ads appear on the share page in this order." },
    },
    {
      name: "sharingEnabled",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Turn off to revoke this collection link immediately.",
      },
    },
    {
      name: "shareUrl",
      type: "text",
      index: true,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Public view-only link. Save the collection before copying it.",
      },
      access: { update: () => false },
    },
    {
      name: "shareToken",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { hidden: true },
      access: { update: () => false },
    },
    {
      name: "privateNotes",
      type: "textarea",
      admin: { description: "Internal notes. Never shown on the public share page." },
    },
  ],
  hooks: { beforeValidate: [prepareSalesCollectionShare] },
};
