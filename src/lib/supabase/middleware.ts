import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env, supabaseConfigured } from "@/lib/env";
import { isAllowedEmail } from "@/lib/auth";

/** Admin paths that are reachable without a session. */
function isPublicAdminPath(pathname: string) {
  return pathname === "/admin/login" || pathname.startsWith("/admin/auth");
}

/**
 * Refresh the Supabase session on every request and guard the admin area.
 * Unauthenticated or non-allow-listed users hitting /admin are redirected to
 * the login page. No-ops when Supabase is not configured (so builds/dev run).
 */
export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!supabaseConfigured) {
    // Without Supabase, let the admin layout render a "not configured" notice
    // rather than redirect-looping.
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const allowed = user && isAllowedEmail(user.email);

  // Guard the admin area (login/callback excluded).
  if (pathname.startsWith("/admin") && !isPublicAdminPath(pathname) && !allowed) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // If a signed-in allowed user hits the login page, send them to the dashboard.
  if (pathname === "/admin/login" && allowed) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
