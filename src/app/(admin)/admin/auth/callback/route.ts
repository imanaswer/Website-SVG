import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { env, supabaseConfigured } from "@/lib/env";
import { isAllowedEmail } from "@/lib/auth";

/**
 * Magic-link callback. Exchanges the PKCE code for a session, enforces the
 * staff allow-list, then redirects to the requested admin page.
 *
 * Cookies the Supabase client wants to set are captured and written onto the
 * redirect response itself — in App-Router route handlers, cookies set on the
 * shared store don't reliably attach to a hand-built NextResponse.redirect().
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  const redirectWith = (
    path: string,
    cookieWrites: { name: string; value: string; options: Record<string, unknown> }[] = [],
  ) => {
    const res = NextResponse.redirect(`${origin}${path}`);
    cookieWrites.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
    return res;
  };

  if (!supabaseConfigured) return redirectWith("/admin/login?error=not-configured");
  if (!code) return redirectWith("/admin/login?error=missing-code");

  const cookieWrites: { name: string; value: string; options: Record<string, unknown> }[] = [];
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(toSet) {
          toSet.forEach(({ name, value, options }) =>
            cookieWrites.push({ name, value, options: (options ?? {}) as Record<string, unknown> }),
          );
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return redirectWith("/admin/login?error=exchange-failed", cookieWrites);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAllowedEmail(user.email)) {
    await supabase.auth.signOut(); // pushes cookie-clearing writes
    return redirectWith("/admin/login?error=not-allowed", cookieWrites);
  }

  const target = next.startsWith("/admin") ? next : "/admin";
  return redirectWith(target, cookieWrites);
}
