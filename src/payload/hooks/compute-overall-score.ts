type Ratings = {
  ratingAudienceGrab: number | null | undefined;
  ratingWatchability: number | null | undefined;
  ratingClarity: number | null | undefined;
};

export function computeOverallScore({
  ratingAudienceGrab,
  ratingWatchability,
  ratingClarity,
}: Ratings): number | null {
  if (ratingAudienceGrab == null || ratingWatchability == null || ratingClarity == null) {
    return null;
  }

  const average = (ratingAudienceGrab + ratingWatchability + ratingClarity) / 3;
  return Math.round(average * 10) / 10;
}

const RATING_FIELDS = ["ratingAudienceGrab", "ratingWatchability", "ratingClarity"] as const;

type PartialDoc = Record<string, unknown>;

// `data` holds only the fields the request sent, so a partial update (admin bulk
// edit, PATCH /api/ads/:id with just `featured`) must fall back to originalDoc or
// it recomputes — and persists — a null score over a rated ad.
export function applyOverallScore<T extends PartialDoc>({
  data,
  originalDoc,
}: {
  data: T;
  originalDoc?: PartialDoc | null;
}): T & { overallScore: number | null } {
  const ratings = Object.fromEntries(
    RATING_FIELDS.map((field) => [field, field in data ? data[field] : originalDoc?.[field]]),
  ) as Ratings;

  return { ...data, overallScore: computeOverallScore(ratings) };
}
