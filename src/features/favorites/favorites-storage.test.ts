import { beforeEach, describe, expect, it } from "vitest";
import { readFavorites, toggleFavorite, writeFavorites } from "./lib/favorites-storage";

describe("toggleFavorite", () => {
  it("adds a slug that is absent", () => {
    expect(toggleFavorite(["a"], "b")).toEqual(["a", "b"]);
  });

  it("removes a slug that is present", () => {
    expect(toggleFavorite(["a", "b"], "a")).toEqual(["b"]);
  });

  it("does not mutate the input", () => {
    const input = ["a"];
    toggleFavorite(input, "b");
    expect(input).toEqual(["a"]);
  });
});

describe("readFavorites", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns an empty list when nothing is stored", () => {
    expect(readFavorites()).toEqual([]);
  });

  it("survives corrupted json", () => {
    window.localStorage.setItem("adcollection:favorites", "{not json");
    expect(readFavorites()).toEqual([]);
  });

  it("drops non-string entries", () => {
    window.localStorage.setItem("adcollection:favorites", JSON.stringify(["a", 3, null]));
    expect(readFavorites()).toEqual(["a"]);
  });

  it("round-trips through writeFavorites", () => {
    writeFavorites(["x", "y"]);
    expect(readFavorites()).toEqual(["x", "y"]);
  });
});
