import type { Metadata } from "next";
import { Suspense } from "react";
import { AdCard } from "@/features/ads/components/ad-card";
import { AdGrid } from "@/features/ads/components/ad-grid";
import { FilterBar } from "@/features/ads/components/browse/filter-bar";
import { ResultsGrid } from "@/features/ads/components/browse/results-grid";
import { ResultsSkeleton } from "@/features/ads/components/browse/results-skeleton";
import { getFeaturedAds } from "@/features/ads/queries/get-featured-ads";
import { parseAdFilter } from "@/features/ads/schemas";
import { getCategories } from "@/features/taxonomy/queries/get-categories";
import { getClients } from "@/features/taxonomy/queries/get-clients";
import { getContentTypes } from "@/features/taxonomy/queries/get-content-types";
import { Container } from "@/shared/components/layout/container";
import { SectionHeader } from "@/shared/components/layout/section-header";

export const metadata: Metadata = {
  // The title template only applies to child segments, and this page shares the
  // layout segment, so the prefix is spelled out here.
  title: "AdCollection - Our work",
  description: "Explore our work by client, industry, and video type.",
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const resolvedSearchParams = await searchParams;
  const filter = parseAdFilter(resolvedSearchParams);

  const [featuredAds, industries, videoTypes, clients] = await Promise.all([
    getFeaturedAds(),
    getCategories(),
    getContentTypes(),
    getClients(),
  ]);

  return (
    <>
      <Container className="pt-16 pb-24">
        <h1 className="mb-6 max-w-measure-hero text-display text-heading max-lg:text-display-sm">
          Our work
        </h1>
        <p className="max-w-measure-lede text-base text-black/60">
          Find the right example by client, industry, or video type.
        </p>
      </Container>

      {featuredAds.length > 0 && (
        <Container className="flex flex-col gap-8">
          <SectionHeader title="Featured" />
          <AdGrid>
            {featuredAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </AdGrid>
        </Container>
      )}

      <Container id="browse" className="mt-24 flex flex-col gap-8">
        <SectionHeader title="Browse & Filter">
          <FilterBar clients={clients} industries={industries} videoTypes={videoTypes} />
        </SectionHeader>
        <Suspense key={JSON.stringify(filter)} fallback={<ResultsSkeleton />}>
          <ResultsGrid filter={filter} />
        </Suspense>
      </Container>
    </>
  );
}
