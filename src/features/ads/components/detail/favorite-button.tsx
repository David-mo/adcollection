"use client";

import { IconActionButton } from "@/features/ads/components/detail/icon-action-button";
import { BookmarkIcon } from "@/features/ads/components/detail/utility-icons";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";

interface FavoriteButtonProps {
  slug: string;
}

export function FavoriteButton({ slug }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(slug);
  const label = active ? "Remove from favorites" : "Add to favorites";

  return (
    <IconActionButton
      icon={BookmarkIcon}
      label={label}
      active={active}
      aria-pressed={active}
      onClick={() => toggle(slug)}
    />
  );
}
