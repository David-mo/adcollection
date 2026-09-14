import { describe, expect, it } from "vitest";
import { applyOverallScore, computeOverallScore } from "./compute-overall-score";

describe("computeOverallScore", () => {
  it("averages the three ratings and rounds to one decimal", () => {
    expect(
      computeOverallScore({ ratingAudienceGrab: 8, ratingWatchability: 7, ratingClarity: 9 }),
    ).toBe(8);
  });

  it("rounds .05 fractions up to one decimal", () => {
    expect(
      computeOverallScore({ ratingAudienceGrab: 7, ratingWatchability: 8, ratingClarity: 8 }),
    ).toBe(7.7);
  });

  it("returns null when any rating is missing", () => {
    expect(
      computeOverallScore({ ratingAudienceGrab: 8, ratingWatchability: null, ratingClarity: 9 }),
    ).toBeNull();
  });

  it("returns null when all ratings are missing", () => {
    expect(
      computeOverallScore({
        ratingAudienceGrab: null,
        ratingWatchability: null,
        ratingClarity: null,
      }),
    ).toBeNull();
  });

  it("returns null when a rating is undefined", () => {
    expect(
      computeOverallScore({
        ratingAudienceGrab: 8,
        ratingWatchability: undefined,
        ratingClarity: 9,
      }),
    ).toBeNull();
  });
});

describe("applyOverallScore", () => {
  const ratedDoc = { ratingAudienceGrab: 8, ratingWatchability: 9, ratingClarity: 7 };

  it("keeps the score when an update omits the rating fields", () => {
    const result = applyOverallScore({ data: { featured: true }, originalDoc: ratedDoc });
    expect(result).toEqual({ featured: true, overallScore: 8 });
  });

  it("recomputes from the incoming ratings when they are present", () => {
    const result = applyOverallScore({
      data: { ratingAudienceGrab: 10 },
      originalDoc: ratedDoc,
    });
    expect(result.overallScore).toBe(8.7);
  });

  it("clears the score when an incoming rating is explicitly nulled", () => {
    const result = applyOverallScore({
      data: { ratingClarity: null },
      originalDoc: ratedDoc,
    });
    expect(result.overallScore).toBeNull();
  });

  it("computes from data alone on create (no originalDoc)", () => {
    const result = applyOverallScore({ data: ratedDoc });
    expect(result.overallScore).toBe(8);
  });

  it("returns null when neither data nor originalDoc carries a full rating set", () => {
    const result = applyOverallScore({ data: { featured: true }, originalDoc: {} });
    expect(result.overallScore).toBeNull();
  });
});
