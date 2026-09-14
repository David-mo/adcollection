"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  favoritesChangedEvent,
  favoritesStorageKey,
  readFavorites,
  toggleFavorite,
  writeFavorites,
} from "../lib/favorites-storage";

let cachedSnapshot: string[] = [];
let cachedRaw: string | null = null;

const EMPTY_SNAPSHOT: string[] = [];

// Chrome's "block all cookies" throws SecurityError on the property access itself,
// which would take down the render of every AdCard.
function readRawFavorites(): string | null {
  try {
    return window.localStorage.getItem(favoritesStorageKey);
  } catch {
    return null;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(favoritesChangedEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(favoritesChangedEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

// useSyncExternalStore compares snapshots by reference, so re-parsing on every call
// would loop forever. Cache against the raw string and only re-parse when it changes.
function getSnapshot(): string[] {
  const raw = readRawFavorites();

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedSnapshot = readFavorites();
  }

  return cachedSnapshot;
}

function getServerSnapshot(): string[] {
  return EMPTY_SNAPSHOT;
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((slug: string) => {
    writeFavorites(toggleFavorite(readFavorites(), slug));
  }, []);

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites]);

  return { favorites, count: favorites.length, toggle, isFavorite };
}
