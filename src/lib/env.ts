import { z } from "zod";

/**
 * Typed, validated environment variables.
 *
 * Connection strings and third-party secrets are optional for now so the app
 * builds before Supabase / Cloudinary / Resend credentials are wired up.
 * TODO(creds): make DATABASE_URL + DIRECT_URL required once Supabase creds land.
 */
const schema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Database — pooled (pgbouncer) for the app, direct for migrations.
  DATABASE_URL: z.string().min(1).optional(),
  DIRECT_URL: z.string().min(1).optional(),

  // Self-contained admin auth (single admin, email + password).
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(1).optional(),
  // Secret used to sign the admin session cookie. 32+ random chars recommended.
  AUTH_SECRET: z.string().min(16).optional(),

  // Public site URL (used for metadata, OG, sitemap). Defaults to the domain.
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),

  // Cloudinary (Phase 1 media).
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1).optional(),

  // Resend (Phase 1 enquiry notifications).
  RESEND_API_KEY: z.string().min(1).optional(),
  ENQUIRY_NOTIFY_EMAIL: z.string().email().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", z.treeifyError(parsed.error));
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;

/** True when admin auth is fully configured (admin can sign in). */
export const adminAuthConfigured = Boolean(
  env.ADMIN_EMAIL && env.ADMIN_PASSWORD && env.AUTH_SECRET,
);
