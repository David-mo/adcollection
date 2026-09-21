import { z } from "zod";

const envSchema = z
  .object({
    DATABASE_URL: z.url(),
    PAYLOAD_SECRET: z.string().min(1),

    STORAGE_MODE: z.enum(["r2", "local"]).default("r2"),
    NEXT_PUBLIC_REVIEW_MODE: z.enum(["true", "false"]).default("false"),
    R2_ACCOUNT_ID: z.string().min(1).optional(),
    R2_ACCESS_KEY_ID: z.string().min(1).optional(),
    R2_SECRET_ACCESS_KEY: z.string().min(1).optional(),
    R2_BUCKET_NAME: z.string().min(1).optional(),
    NEXT_PUBLIC_R2_PUBLIC_BASE_URL: z.url().optional(),

    NEXT_PUBLIC_SITE_URL: z.url(),
  })
  .superRefine((value, context) => {
    if (value.STORAGE_MODE !== "r2") return;
    for (const key of [
      "R2_ACCOUNT_ID",
      "R2_ACCESS_KEY_ID",
      "R2_SECRET_ACCESS_KEY",
      "R2_BUCKET_NAME",
      "NEXT_PUBLIC_R2_PUBLIC_BASE_URL",
    ] as const) {
      if (!value[key])
        context.addIssue({ code: "custom", path: [key], message: "Required for R2 storage" });
    }
  });

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const env = parsed.data;
