import Link from "next/link";
import { Container } from "@/shared/components/layout/container";

const FOOTER_LINKS = [
  { href: "/", label: "Home", external: false },
  { href: "/favorites", label: "Favorites", external: false },
  { href: "https://inbeat.agency/", label: "Create UGC Ads", external: true },
  { href: "https://teaminbeat.typeform.com/to/odf5iFeS", label: "Submit an ad", external: true },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-surface-inverse text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-3">
        <div className="space-y-3">
          <span className="text-lg font-semibold">AdCollection</span>
          <p className="text-sm text-white/60">
            A curated library of the best-performing video ads, rated and broken down so you can
            learn what actually works.
          </p>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          {FOOTER_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="text-white/70 hover:text-white">
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="space-y-4">
          <p className="text-sm text-white/60">
            How we rate? Every ad is scored on audience grab, watchability, and clarity so you can
            compare performance at a glance.
          </p>
        </div>
      </Container>
    </footer>
  );
}
