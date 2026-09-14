import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface PillProps {
  tone: "platform" | "default";
  children: ReactNode;
  className?: string;
}

// pt-2/pb-4 (not pt-2/pb-2) matches the original's asymmetric padding: 2px 12px 4px.
export function Pill({ tone, children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full text-xs px-2.5 py-1.5 text-black/90 font-medium tracking-normal",
        tone === "platform" && "bg-tag-tiktok",
        tone === "default" && "bg-chip",
        className,
      )}
    >
      {children}
    </span>
  );
}
