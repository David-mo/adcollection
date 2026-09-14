const STORAGE_KEY = "adcollection:favorites";
const STORAGE_EVENT = "adcollection:favorites-changed";

export const favoritesStorageKey = STORAGE_KEY;
export const favoritesChangedEvent = STORAGE_EVENT;

export function readFavorites(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    // Private browsing, blocked site data, or corrupted JSON. An empty list is the
    // correct fallback — favorites are a convenience, never a source of truth.
    return [];
  }
}

export function writeFavorites(slugs: readonly string[]): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    return;
  } finally {
    // `storage` only fires in other tabs, so same-tab subscribers need their own signal.
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

export function toggleFavorite(slugs: readonly string[], slug: string): string[] {
  return slugs.includes(slug) ? slugs.filter((entry) => entry !== slug) : [...slugs, slug];
}
