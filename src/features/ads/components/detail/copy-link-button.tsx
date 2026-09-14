"use client";

import { toast } from "sonner";
import { IconActionButton } from "@/features/ads/components/detail/icon-action-button";
import { CopyIcon } from "@/features/ads/components/detail/utility-icons";

export function CopyLinkButton() {
  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  }

  return <IconActionButton icon={CopyIcon} label="Copy link" onClick={handleCopy} />;
}
