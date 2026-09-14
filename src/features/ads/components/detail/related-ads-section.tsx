import type { AdListItem } from "@/entities/ad";
import { AdCard } from "@/features/ads/components/ad-card";
import { AdGrid } from "@/features/ads/components/ad-grid";
import { Container } from "@/shared/components/layout/container";
import { SectionHeader } from "@/shared/components/layout/section-header";

interface RelatedAdsSectionProps {
  ads: AdListItem[];
}

export function RelatedAdsSection({ ads }: RelatedAdsSectionProps) {
  if (ads.length === 0) return null;

  return (
    <Container className="flex flex-col gap-8">
      <SectionHeader title="Related ads" />
      <AdGrid>
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </AdGrid>
    </Container>
  );
}
