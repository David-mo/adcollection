import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdHeader } from "@/features/ads/components/detail/ad-header";
import { CreatorCard } from "@/features/ads/components/detail/creator-card";
import { RatingWidget } from "@/features/ads/components/detail/rating-widget";
import { RelatedAdsSection } from "@/features/ads/components/detail/related-ads-section";
import { VideoPlayer } from "@/features/ads/components/detail/video-player";
import { getAdBySlug } from "@/features/ads/queries/get-ad-by-slug";
import { getRelatedAds } from "@/features/ads/queries/get-related-ads";
import { Container } from "@/shared/components/layout/container";

export async function generateMetadata({ params }: PageProps<"/ads/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const ad = await getAdBySlug(slug);
  if (!ad) return {};
  const description = ad.caption ?? `${ad.thumbnailTitle} by ${ad.client?.name ?? ad.companyName}.`;
  return {
    title: ad.thumbnailTitle,
    description,
    alternates: { canonical: `/ads/${slug}` },
    openGraph: { title: ad.thumbnailTitle, description, images: [{ url: ad.thumbnailUrl }] },
  };
}

export default async function AdPage({ params }: PageProps<"/ads/[slug]">) {
  const { slug } = await params;
  const ad = await getAdBySlug(slug);
  if (!ad) notFound();
  const relatedAds = await getRelatedAds(ad.id);
  return (
    <div className="flex flex-col pb-16">
      <Container className="mb-6">
        <Link
          href="/"
          aria-label="Back to all ads"
          className="inline-flex hover:bg-black/5 rounded-full size-8 items-center justify-center text-heading transition-colors hover:text-black/90"
        >
          <ArrowLeft className="size-5" />
        </Link>
      </Container>
      <Container className="grid grid-cols-1 items-start gap-10 lg:grid-split">
        <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-hairline bg-white shadow-card sm:grid-cols-2">
          <VideoPlayer
            videoUrl={ad.videoUrl}
            thumbnailUrl={ad.thumbnailUrl}
            title={ad.thumbnailTitle}
          />
          <CreatorCard ad={ad} />
        </div>
        <AdHeader ad={ad} />
      </Container>
      <Container>
        <RatingWidget
          ratings={{
            audienceGrab: ad.ratingAudienceGrab,
            watchability: ad.ratingWatchability,
            clarity: ad.ratingClarity,
          }}
          overallScore={ad.overallScore}
        />
      </Container>
      <RelatedAdsSection ads={relatedAds} />
    </div>
  );
}
