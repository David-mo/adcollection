"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AdCard } from "@/features/ads/components/ad-card";
import { AdGrid } from "@/features/ads/components/ad-grid";
import { ResultsSkeleton } from "@/features/ads/components/browse/results-skeleton";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { queryKeys } from "@/shared/lib/query-keys";
import { getFavoriteAds } from "./get-favorite-ads";

export function FavoritesGrid() {
  const { favorites } = useFavorites();

  const { data, isPending } = useQuery({
    // The key is sorted so reordering the same set reuses the cache; the query
    // itself keeps save order, which getAdsBySlugs deliberately preserves.
    queryKey: queryKeys.ads.list({ favorites: favorites.toSorted() }),
    queryFn: () => getFavoriteAds(favorites),
    enabled: favorites.length > 0,
  });

  if (favorites.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-hairline px-6 py-24 text-center">
        <p className="text-subtle">You currently have 0 favorite items</p>
        <Link href="/" className="text-body font-medium text-heading underline underline-offset-4">
          Browse UGC ads →
        </Link>
      </div>
    );
  }

  if (isPending) {
    return <ResultsSkeleton count={favorites.length} />;
  }

  return (
    <AdGrid>
      {(data ?? []).map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </AdGrid>
  );
}
