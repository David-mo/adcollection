import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/shared/lib/utils";

export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("content-container px-4 sm:px-6 lg:px-8", className)} {...props} />;
}
