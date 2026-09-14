// Filter objects are typed as `object` rather than importing the concrete
// feature types: shared/ may not import from features/ (see biome.json).
export const queryKeys = {
  ads: {
    list: (filter: object) => ["ads", "list", filter] as const,
  },
} as const;
