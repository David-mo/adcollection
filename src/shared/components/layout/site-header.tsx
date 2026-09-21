import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/shared/components/layout/container";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { cn } from "@/shared/lib/utils";

const CREATE_ADS_URL = "https://inbeat.agency/";

// The original nav buttons are 12px/500 with 4px corners, not shadcn's pill defaults.
const navButton =
  "rounded-sm p-3 text-xs font-semibold tracking-wide leading-none transition-colors";

function NavCtas({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link
        href="/admin/collections/sales-collections"
        className={cn(
          navButton,
          "border border-black/20 bg-transparent text-heading hover:border-black",
        )}
      >
        Collections
      </Link>
      <a
        href={CREATE_ADS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(navButton, "bg-black text-white hover:bg-black/85")}
      >
        Discuss a project
      </a>
    </div>
  );
}

// The link owns its own favorites count (client-only localStorage state) and lives in
// features/favorites, which shared/ may not import — so the caller passes it in.
interface SiteHeaderProps {
  favoritesLink: ReactNode;
}

export function SiteHeader({ favoritesLink }: SiteHeaderProps) {
  return (
    <header className="bg-transparent">
      <Container className="flex items-center justify-between py-6">
        <Link href="/" className="mr-brand-gap flex items-center" aria-label="AdCollection home">
          <Image
            src="/adcollection-logo.png"
            alt="AdCollection by inBeat"
            width={402}
            height={44}
            priority
            className="h-auto w-logo"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {favoritesLink}
          <NavCtas />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col items-start gap-4 px-4">
              {favoritesLink}
              <NavCtas className="flex-col items-stretch" />
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
