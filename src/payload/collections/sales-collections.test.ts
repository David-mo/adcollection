import { describe, expect, it, vi } from "vitest";
import {
  generateShareToken,
  prepareSalesCollectionShare,
  salesCollectionsAccess,
} from "./sales-collections";

vi.mock("@/shared/config/env", () => ({
  env: { NEXT_PUBLIC_SITE_URL: "https://review.example.test" },
}));

describe("sales collections access", () => {
  it("requires an authenticated Payload user for every collection operation", () => {
    const anonymous = { req: { user: null } } as never;
    const authenticated = { req: { user: { id: 1 } } } as never;

    for (const access of Object.values(salesCollectionsAccess)) {
      expect(access(anonymous)).toBe(false);
      expect(access(authenticated)).toBe(true);
    }
  });
});

describe("sales collection share links", () => {
  it("uses opaque 192-bit URL-safe tokens", () => {
    const tokens = new Set(Array.from({ length: 20 }, generateShareToken));
    expect(tokens.size).toBe(20);
    for (const token of tokens) expect(token).toMatch(/^[A-Za-z0-9_-]{32}$/);
  });

  it("creates the token and complete share URL on create", async () => {
    const data = await prepareSalesCollectionShare({
      data: { name: "Bumble concepts" },
      operation: "create",
    } as never);

    expect(data?.shareToken).toMatch(/^[A-Za-z0-9_-]{32}$/);
    expect(data?.shareUrl).toBe(`https://review.example.test/collections/${data?.shareToken}`);
  });
});
