import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin/token";

/** Admin paths reachable without a session. */
function isPublicAdminPath(pathname: string) {
  return pathname === "/admin/login";
}

/**
 * Guard the admin area. Verifies the signed session cookie (Web Crypto, Edge-
 * safe). Unauthenticated users hitting a protected /admin path are redirected to
 * the login page; an already-authed user hitting the login page is sent to the
 * dashboard. No-ops when AUTH_SECRET is absent so builds/dev run.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secret = process.env.AUTH_SECRET;

  if (!secret) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token, secret);

  if (!session && !isPublicAdminPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (session && pathname === "/admin/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on admin routes only (and skip static assets).
  matcher: ["/admin/:path*"],
};
