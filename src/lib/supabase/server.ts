import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import { isAllowedEmail } from "@/lib/auth";

/**
 * Supabase client for Server Components / Server Actions / Route Handlers.
 * Reads and writes the auth session via Next's cookie store.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component where cookies are read-only;
            // the middleware refreshes the session, so this is safe to ignore.
          }
        },
      },
    },
  );
}

/** The current authenticated user, or null. */
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Defense-in-depth guard for admin pages and Server Actions. Redirects to the
 * login page unless the current user is signed in and on the allow-list.
 * Returns the authenticated user.
 */
export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || !isAllowedEmail(user.email)) {
    redirect("/admin/login");
  }
  return user;
}
