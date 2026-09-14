import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface AdGridProps {
  children: ReactNode;
  className?: string;
}

export function AdGrid({ children, className }: AdGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-grid-gutter gap-y-12 card:grid-cols-2 wide:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
