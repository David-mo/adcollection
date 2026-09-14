"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/utils";

export interface FilterDropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FilterDropdownProps {
  label: string;
  options: FilterDropdownOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export function FilterDropdown({ label, options, selected, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggle(value: string) {
    onChange(
      selected.includes(value) ? selected.filter((entry) => entry !== value) : [...selected, value],
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-w-filter-trigger cursor-pointer items-center justify-between gap-3 rounded-md border tracking-wide bg-white py-2.5 px-3 text-left text-sm transition-colors",
            isOpen ? "border-black/25" : "border-hairline hover:border-black/20",
          )}
        >
          <span className="flex items-center gap-2">
            {label}
            {selected.length > 0 && (
              <Badge variant="secondary" className="rounded-full size-5 text-black font-medium">
                {selected.length}
              </Badge>
            )}
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-black transition-transform duration-150",
              isOpen && "-rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>

      {/* Locked to the trigger's width so the panel reads as an extension of the
          control rather than a floating menu. */}
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[var(--radix-popover-trigger-width)] rounded-md border-hairline p-1.5"
      >
        <div className="flex flex-col">
          {options.map((option) => {
            const inputId = `filter-${label}-${option.value}`;
            return (
              <label
                key={option.value}
                htmlFor={inputId}
                className={cn(
                  "flex items-center gap-3 rounded-sm px-2.5 py-2 transition-colors",
                  option.disabled
                    ? "cursor-not-allowed text-subtle"
                    : "cursor-pointer text-body hover:bg-chip",
                )}
              >
                <Checkbox
                  id={inputId}
                  checked={selected.includes(option.value)}
                  disabled={option.disabled}
                  onCheckedChange={() => toggle(option.value)}
                  className="size-4 rounded-checkbox border-black/25"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
