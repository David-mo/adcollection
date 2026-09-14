"use client";

import { toast } from "sonner";
import { IconActionButton } from "@/features/ads/components/detail/icon-action-button";
import { ShareIcon } from "@/features/ads/components/detail/utility-icons";

interface ShareButtonProps {
  title: string;
}

// TODO: Implement share button
export function ShareButton({ title }: ShareButtonProps) {
  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard");
  }

  return <IconActionButton icon={ShareIcon} label="Share" onClick={handleShare} />;
}
