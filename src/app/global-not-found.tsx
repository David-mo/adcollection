import type { Metadata } from "next";
import { FavoritesLink } from "@/features/favorites/components/favorites-link";
import {
  NOT_FOUND_DESCRIPTION,
  NOT_FOUND_TITLE,
  NotFoundContent,
} from "@/shared/components/layout/not-found-content";
import { SiteFooter } from "@/shared/components/layout/site-footer";
import { SiteHeader } from "@/shared/components/layout/site-header";
import { inter } from "@/shared/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `AdCollection - ${NOT_FOUND_TITLE}`,
  description: NOT_FOUND_DESCRIPTION,
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader favoritesLink={<FavoritesLink />} />
        <main className="flex flex-1 flex-col">
          <NotFoundContent />
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
