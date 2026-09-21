import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdCard } from "@/features/ads/components/ad-card";
import { AdGrid } from "@/features/ads/components/ad-grid";
import { getSharedCollection } from "@/features/collections/queries/get-shared-collection";
import { Container } from "@/shared/components/layout/container";

export const metadata: Metadata = {
  title: "Shared collection",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SharedCollectionPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const collection = await getSharedCollection(token);
  if (!collection) notFound();

  return (
    <Container className="flex flex-1 flex-col gap-10 py-12 sm:py-16">
      <header className="max-w-3xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-black/50">
          Curated collection
        </p>
        <h1 className="text-page-h1 text-heading">{collection.name}</h1>
        {collection.description && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-subtle">{collection.description}</p>
        )}
      </header>

      {collection.ads.length > 0 ? (
        <AdGrid>
          {collection.ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </AdGrid>
      ) : (
        <p className="rounded-card border border-hairline bg-white p-8 text-subtle">
          This collection does not have any published ads yet.
        </p>
      )}
    </Container>
  );
}
