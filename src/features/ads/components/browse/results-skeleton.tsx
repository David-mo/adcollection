import { AdGrid } from "@/features/ads/components/ad-grid";
import { Skeleton } from "@/shared/components/ui/skeleton";

const DEFAULT_SKELETON_COUNT = 8;

interface ResultsSkeletonProps {
  count?: number;
}

export function ResultsSkeleton({ count = DEFAULT_SKELETON_COUNT }: ResultsSkeletonProps) {
  return (
    <AdGrid>
      {Array.from({ length: count }, (_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list, never reordered
        <Skeleton key={index} className="h-card-media w-full rounded-card" />
      ))}
    </AdGrid>
  );
}
