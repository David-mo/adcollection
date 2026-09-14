import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Without this, tailwind-merge reads our custom `text-*` scale as text COLOR and drops
// e.g. `text-tag` whenever a `text-black/80` follows it in the same cn() call.
const FONT_SIZES = [
  "banner",
  "card-title",
  "display",
  "display-sm",
  "h2",
  "label",
  "lede",
  "meta",
  "micro",
  "page-h1",
  "rating-average",
  "rating-value",
  "section-title",
  "tag",
];

const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: FONT_SIZES }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
