"use client";

import Link from "next/link";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";

export function FavoritesLink() {
  const { count } = useFavorites();

  return (
    <Link
      href="/favorites"
      className="flex group items-center gap-1 font-medium text-heading text-sm"
    >
      <p className="group-hover:text-black/80 transition-colors">Favorites</p>
      <span className="rounded-full bg-chip flex items-center justify-center h-5 w-5 px-1.5 py-0.5 text-xs font-medium text-black/60">
        {count}
      </span>
    </Link>
  );
}
