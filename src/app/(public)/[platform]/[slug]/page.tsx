import { notFound, redirect } from "next/navigation";
import { getAdBySlug } from "@/features/ads/queries/get-ad-by-slug";

export default async function LegacyAdPage({ params }: PageProps<"/[platform]/[slug]">) {
  const { slug } = await params;
  const ad = await getAdBySlug(slug);
  if (!ad) notFound();
  redirect(`/ads/${ad.slug}`);
}
