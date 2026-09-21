import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { FavoritesLink } from "@/features/favorites/components/favorites-link";
import { SiteFooter } from "@/shared/components/layout/site-footer";
import { SiteHeader } from "@/shared/components/layout/site-header";
import { TopBanner } from "@/shared/components/layout/top-banner";
import { Toaster } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { env } from "@/shared/config/env";
import { inter } from "@/shared/lib/fonts";
import { QueryProvider } from "@/shared/providers/query-provider";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    template: "AdCollection - %s",
    default: "AdCollection",
  },
  description: "Explore our work by client, industry, and video type.",
  robots: {
    index: env.NEXT_PUBLIC_REVIEW_MODE !== "true",
    follow: env.NEXT_PUBLIC_REVIEW_MODE !== "true",
  },
};

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <NuqsAdapter>
          <QueryProvider>
            <TooltipProvider>
              {env.NEXT_PUBLIC_REVIEW_MODE === "true" && (
                <TopBanner>Review environment — content may be reset.</TopBanner>
              )}
              <SiteHeader favoritesLink={<FavoritesLink />} />
              <main className="flex flex-1 flex-col">{children}</main>
              <SiteFooter />
            </TooltipProvider>
          </QueryProvider>
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}
