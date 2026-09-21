import { Music } from "lucide-react";
import Image from "next/image";
import type { AdDetail } from "@/entities/ad";

interface CreatorCardProps {
  ad: AdDetail;
}

const WORK_WITH_CREATOR_URL = "https://inbeat.agency/";

export function CreatorCard({ ad }: CreatorCardProps) {
  const {
    brandHandleName,
    brandHandleUrl,
    creatorHandle,
    creatorProfileUrl,
    profilePictureUrl,
    caption,
    soundName,
    soundUrl,
  } = ad;

  // The video panel slot is the brand's own account, not the creator's - fall back to
  // the creator handle so rows without a brand handle still show something.
  const topHandle = brandHandleName ?? creatorHandle;
  const topHandleUrl = brandHandleName ? brandHandleUrl : creatorProfileUrl;
  const topHandleInitials = topHandle?.slice(0, 2).toUpperCase() ?? "";

  return (
    <div className="flex flex-col p-5">
      {topHandle && (
        <div className="flex items-center gap-1.5">
          <span className="flex size-avatar shrink-0 items-center justify-center overflow-hidden rounded-pill border border-chip bg-chip text-micro font-medium text-black/60">
            {profilePictureUrl ? (
              <Image
                src={profilePictureUrl}
                alt=""
                width={21}
                height={21}
                className="size-full object-cover"
              />
            ) : (
              topHandleInitials
            )}
          </span>
          {topHandleUrl ? (
            <a
              href={topHandleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-heading hover:underline w-fit"
            >
              @{topHandle}
            </a>
          ) : (
            <span className="font-medium text-heading">@{topHandle}</span>
          )}
        </div>
      )}

      {caption && <p className="my-3 text-sm text-black/60">{caption}</p>}

      {soundName && (
        <div className="flex items-center gap-1.5 text-label text-black">
          <Music className="size-3.5 shrink-0" />
          {soundUrl ? (
            <a
              href={soundUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {soundName}
            </a>
          ) : (
            <span>{soundName}</span>
          )}
        </div>
      )}

      <div className="mt-auto pt-8">
        <a
          href={WORK_WITH_CREATOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="brand-cycle-hover block rounded-sm bg-black px-6 py-3 text-center leading-6 text-white"
        >
          Discuss a project
        </a>
      </div>
    </div>
  );
}
