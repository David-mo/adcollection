"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { AdListItem } from "@/entities/ad";
import { AdCard } from "@/features/ads/components/ad-card";
import { AdGrid } from "@/features/ads/components/ad-grid";
import type { AdFilter } from "@/features/ads/schemas";
import { Button } from "@/shared/components/ui/button";
import { queryKeys } from "@/shared/lib/query-keys";
import { getAdsPage } from "./get-ads-page";

interface LoadMoreAdsProps {
  filter: AdFilter;
  initialItems: AdListItem[];
  initialCursor: number | null;
}

export function LoadMoreAds({ filter, initialItems, initialCursor }: LoadMoreAdsProps) {
  const listFilter = { ...filter, cursor: undefined };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: queryKeys.ads.list(listFilter),
    queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
      getAdsPage({ ...filter, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialData: {
      pages: [{ items: initialItems, nextCursor: initialCursor }],
      pageParams: [undefined],
    },
  });

  const extraAds = data.pages.slice(1).flatMap((page) => page.items);
  const hasMore = hasNextPage;

  if (extraAds.length === 0 && !hasMore) return null;

  return (
    <>
      {extraAds.length > 0 && (
        <AdGrid>
          {extraAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </AdGrid>
      )}
      {hasMore && (
        <div className="flex justify-center">
          <Button variant="secondary" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading…" : "Show more"}
          </Button>
        </div>
      )}
    </>
  );
}
