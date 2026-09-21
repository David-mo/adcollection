import Link from "next/link";
import { Container } from "@/shared/components/layout/container";

const FOOTER_LINKS = [
  { href: "/", label: "Home", external: false },
  { href: "/favorites", label: "Favorites", external: false },
  { href: "https://inbeat.agency/", label: "Discuss a project", external: true },
  { href: "/admin/collections/sales-collections", label: "Collections", external: false },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-surface-inverse text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-3">
        <div className="space-y-3">
          <span className="text-lg font-semibold">AdCollection</span>
          <p className="text-sm text-white/60">
            Our work, organized by client, industry, and video type.
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
            Explore examples from our team and create a collection for your next conversation.
          </p>
        </div>
      </Container>
    </footer>
  );
}
