import { Link2 } from "lucide-react";
import type { ReactNode } from "react";
import type { AdDetail } from "@/entities/ad";
import { Pill } from "@/shared/components/pill";
import { CopyLinkButton } from "./copy-link-button";
import { FavoriteButton } from "./favorite-button";

interface AdHeaderProps {
  ad: AdDetail;
}

function formatWebsiteLabel(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-hairline py-3">
      <dt className="text-label text-black/60">{label}</dt>
      <dd className="mt-1 leading-6 text-black">{children}</dd>
    </div>
  );
}

export function AdHeader({ ad }: AdHeaderProps) {
  return (
    <div className="flex flex-col p-1">
      <Pill tone="default">Our work</Pill>

      <h1 className="mt-2 border-b border-hairline pt-2 pb-6 text-h2 text-heading">
        {ad.thumbnailTitle}
      </h1>

      <dl className="flex flex-col">
        <InfoRow label="Client">{ad.client?.name ?? ad.companyName}</InfoRow>

        {ad.companyWebsiteUrl && (
          <InfoRow label="Website">
            <a
              href={ad.companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline underline-offset-2"
            >
              <Link2 className="size-3.5 shrink-0" />
              {ad.companyWebsiteDisplay ?? formatWebsiteLabel(ad.companyWebsiteUrl)}
            </a>
          </InfoRow>
        )}

        {ad.category && <InfoRow label="Industry">{ad.category.name}</InfoRow>}
        {ad.contentTypes.length > 0 && (
          <InfoRow label="Video types">
            <div className="flex flex-wrap gap-2">
              {ad.contentTypes.map((contentType) => (
                <Pill key={contentType.id} tone="default">
                  {contentType.name}
                </Pill>
              ))}
            </div>
          </InfoRow>
        )}
        {ad.subcategories.length > 0 && (
          <InfoRow label="Tags">
            <div className="flex flex-wrap gap-2">
              {ad.subcategories.map((subcategory) => (
                <Pill key={subcategory.id} tone="default">
                  {subcategory.name}
                </Pill>
              ))}
            </div>
          </InfoRow>
        )}
      </dl>

      <div className="mt-8 flex items-center gap-3">
        <FavoriteButton slug={ad.slug} />
        <CopyLinkButton />
      </div>
    </div>
  );
}
