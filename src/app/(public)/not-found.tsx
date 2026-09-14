import type { Metadata } from "next";
import {
  NOT_FOUND_DESCRIPTION,
  NOT_FOUND_TITLE,
  NotFoundContent,
} from "@/shared/components/layout/not-found-content";

export const metadata: Metadata = {
  title: NOT_FOUND_TITLE,
  description: NOT_FOUND_DESCRIPTION,
};

export default function NotFound() {
  return <NotFoundContent />;
}
