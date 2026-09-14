import Link from "next/link";
import { Container } from "@/shared/components/layout/container";

export const NOT_FOUND_TITLE = "Page Not Found";
export const NOT_FOUND_DESCRIPTION =
  "The ad you're looking for doesn't exist or may have been removed.";

export function NotFoundContent() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-page-h1 text-heading">{NOT_FOUND_TITLE}</h1>
      <p className="max-w-md text-subtle">{NOT_FOUND_DESCRIPTION}</p>
      <Link href="/" className="text-body font-medium text-heading underline underline-offset-4">
        ← Take me back!
      </Link>
    </Container>
  );
}
