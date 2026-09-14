"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "adcollection:top-banner-dismissed";

export function TopBanner({ children }: { children: React.ReactNode }) {
  // Rendered hidden until the effect confirms it was not dismissed, so a dismissed
  // banner never flashes on first paint.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      setIsVisible(window.localStorage.getItem(STORAGE_KEY) !== "true");
    } catch {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const dismiss = () => {
    setIsVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      return;
    }
  };

  return (
    <div className="relative flex h-banner items-center justify-center bg-chip px-10">
      <p className="text-center text-banner text-heading">{children}</p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 flex size-6 items-center justify-center text-black/50 transition-colors hover:text-heading"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
