"use client";

import type { ComponentProps, ComponentType } from "react";
import { Button } from "@/shared/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

interface IconActionButtonProps extends ComponentProps<typeof Button> {
  icon: ComponentType<{ className?: string }>;
  label: string;
  tooltip?: string;
  active?: boolean;
}

export function IconActionButton({
  icon: Icon,
  label,
  tooltip,
  active,
  className,
  ...props
}: IconActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon-lg"
          className={cn(
            "size-12 rounded-full border-black/20 bg-white text-heading",
            active && "border-black bg-black text-white hover:bg-black hover:text-white",
            className,
          )}
          aria-label={label}
          {...props}
        >
          <Icon className="size-12" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip ?? label}</TooltipContent>
    </Tooltip>
  );
}
