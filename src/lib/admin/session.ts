import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import {
  SESSION_COOKIE,
  DEFAULT_MAX_AGE,
  createSessionToken,
  verifySessionToken,
} from "@/lib/admin/token";

/** Constant-time string equality (length-independent via SHA-256 digests). */
function safeEqual(a: string, b: string): boolean {
  const ah = createHash("sha256").update(a).digest();
  const bh = createHash("sha256").update(b).digest();
  return timingSafeEqual(ah, bh);
}

/**
 * Validate submitted credentials against the configured admin. Returns the
 * canonical admin email on success, else null. Email compare is case-insensitive;
 * password compare is constant-time.
 */
export function verifyCredentials(email: string, password: string): string | null {
  const adminEmail = env.ADMIN_EMAIL;
  const adminPassword = env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return null;
  const emailOk = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
  const passOk = safeEqual(password, adminPassword);
  // Evaluate both before returning so timing doesn't reveal which failed.
  return emailOk && passOk ? adminEmail : null;
}

/** The current admin session ({ email }) read from the signed cookie, or null. */
export async function getAdminSession(): Promise<{ email: string } | null> {
  if (!env.AUTH_SECRET) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(token, env.AUTH_SECRET);
}

/**
 * Defense-in-depth guard for admin pages and Server Actions. Redirects to the
 * login page unless a valid session cookie is present. Returns `{ email }`.
 */
export async function requireAdmin(): Promise<{ email: string }> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

/** Sign a fresh session token for `email` and set the cookie. (Server Action only.) */
export async function startSession(email: string): Promise<void> {
  if (!env.AUTH_SECRET) throw new Error("AUTH_SECRET is not configured");
  const token = await createSessionToken(email, env.AUTH_SECRET);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DEFAULT_MAX_AGE,
  });
}

/** Clear the admin session cookie. (Server Action only.) */
export async function endSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}
