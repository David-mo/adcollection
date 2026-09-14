import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { FavoritesLink } from "@/features/favorites/components/favorites-link";
import { SiteFooter } from "@/shared/components/layout/site-footer";
import { SiteHeader } from "@/shared/components/layout/site-header";
import { Toaster } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { env } from "@/shared/config/env";
import { inter } from "@/shared/lib/fonts";
import { QueryProvider } from "@/shared/providers/query-provider";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    template: "%s | AdCollection",
    default: "AdCollection",
  },
  description:
    "A curated library of the best-performing video ads, rated and broken down so you can learn what actually works.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <NuqsAdapter>
          <QueryProvider>
            <TooltipProvider>
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
