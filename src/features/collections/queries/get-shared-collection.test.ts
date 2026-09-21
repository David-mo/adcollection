import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AdListItem } from "@/entities/ad";
import { getPayloadClient } from "@/shared/lib/payload";
import { getSharedCollection, restoreCollectionOrder } from "./get-shared-collection";

vi.mock("@/shared/lib/payload", () => ({ getPayloadClient: vi.fn() }));

describe("restoreCollectionOrder", () => {
  it("keeps the editor's ordering and omits unavailable ads", () => {
    const makeAd = (id: number) => ({ id }) as AdListItem;
    expect(restoreCollectionOrder([makeAd(3), makeAd(1)], [1, 2, 3]).map((ad) => ad.id)).toEqual([
      1, 3,
    ]);
  });
});

describe("getSharedCollection", () => {
  const find = vi.fn();

  beforeEach(() => {
    find.mockReset();
    (
      getPayloadClient as unknown as {
        mockResolvedValue: (value: unknown) => void;
      }
    ).mockResolvedValue({ find });
  });

  it("rejects malformed tokens without querying Payload", async () => {
    expect(await getSharedCollection("guessable-token")).toBeNull();
    expect(find).not.toHaveBeenCalled();
  });

  it("returns null for missing or revoked links without looking up ads", async () => {
    find.mockResolvedValueOnce({ docs: [] });
    expect(await getSharedCollection("a".repeat(32))).toBeNull();
    expect(find).toHaveBeenCalledTimes(1);
    expect(find.mock.calls[0]?.[0].where).toEqual({
      and: [{ shareToken: { equals: "a".repeat(32) } }, { sharingEnabled: { equals: true } }],
    });
  });

  it("requests published ads only and never returns private notes", async () => {
    find
      .mockResolvedValueOnce({
        docs: [
          {
            name: "Client picks",
            description: "The strongest concepts.",
            ads: [3, 1],
            privateNotes: "Internal only",
          },
        ],
      })
      .mockResolvedValueOnce({ docs: [] });

    const result = await getSharedCollection("b".repeat(32));
    expect(find.mock.calls[1]?.[0].where).toEqual({
      and: [{ id: { in: [3, 1] } }, { _status: { equals: "published" } }],
    });
    expect(result).toEqual({
      name: "Client picks",
      description: "The strongest concepts.",
      ads: [],
    });
    expect(result).not.toHaveProperty("privateNotes");
  });
});
