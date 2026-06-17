"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, startSession, endSession } from "@/lib/admin/session";
import { adminAuthConfigured } from "@/lib/env";

export type LoginState = { error?: string };

/** Only allow same-origin admin redirects (no open-redirect via ?next=). */
function safeNext(next: FormDataEntryValue | null): string {
  const value = typeof next === "string" ? next : "";
  return value.startsWith("/admin") && !value.startsWith("//") ? value : "/admin";
}

/**
 * Verify email + password against the configured admin and, on success, start a
 * signed session and redirect into the admin. Used with `useActionState`.
 */
export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!adminAuthConfigured) {
    return { error: "Admin sign-in is not configured." };
  }
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  const adminEmail = verifyCredentials(email, password);
  if (!adminEmail) {
    return { error: "Incorrect email or password." };
  }

  await startSession(adminEmail);
  redirect(next);
}

/** Clear the session and return to the login page. */
export async function signOut() {
  await endSession();
  redirect("/admin/login");
}
