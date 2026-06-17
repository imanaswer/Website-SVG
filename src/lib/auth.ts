import { env } from "./env";

/** Parsed staff allow-list (lower-cased). */
const allowlist = (env.ADMIN_ALLOWLIST ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/** True if the email is permitted into the admin. */
export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  // If no allow-list is configured, deny by default (fail closed).
  if (allowlist.length === 0) return false;
  return allowlist.includes(email.trim().toLowerCase());
}
