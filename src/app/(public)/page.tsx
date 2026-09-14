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
import { getContentTypes } from "@/features/taxonomy/queries/get-content-types";
import { getPlatforms } from "@/features/taxonomy/queries/get-platforms";
import { Container } from "@/shared/components/layout/container";
import { SectionHeader } from "@/shared/components/layout/section-header";

export const metadata: Metadata = {
  title: "Browse UGC video ads",
  description:
    "A deep dive into the strategy behind high-converting ad creative. Browse a curated library of the best-performing video ads, rated on audience grab, watchability, and clarity.",
};

export default async function Home({ searchParams }: PageProps<"/">) {
  const resolvedSearchParams = await searchParams;
  const filter = parseAdFilter(resolvedSearchParams);

  const [featuredAds, categories, contentTypes, platforms] = await Promise.all([
    getFeaturedAds(),
    getCategories(),
    getContentTypes(),
    getPlatforms(),
  ]);

  return (
    <>
      <Container className="pt-16 pb-24">
        <h1 className="mb-6 max-w-measure-hero text-display text-heading max-lg:text-display-sm">
          A deep dive into the strategy behind high-converting ad creative
        </h1>
        <p className="max-w-measure-lede text-base text-black/60">
          A curated library of the best-performing video ads, rated and broken down so you can learn
          what actually works.
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
          <FilterBar categories={categories} contentTypes={contentTypes} platforms={platforms} />
        </SectionHeader>
        <Suspense key={JSON.stringify(filter)} fallback={<ResultsSkeleton />}>
          <ResultsGrid filter={filter} />
        </Suspense>
      </Container>
    </>
  );
}
