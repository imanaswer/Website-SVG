import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/admin/session";
import { adminAuthConfigured } from "@/lib/env";

export const metadata = { title: "Staff sign-in", robots: { index: false, follow: false } };

function safeNext(next: string | undefined): string {
  return next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const target = safeNext(next);

  // Already signed in → straight to the dashboard.
  if (adminAuthConfigured && (await getAdminSession())) {
    redirect(target);
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-parchment px-4">
      <div className="w-full max-w-md rounded-2xl border border-line bg-card p-8 shadow-sm">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-indigo font-display text-lg font-semibold text-gold-soft">
          SGV
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold text-indigo">Staff sign-in</h1>
        <p className="mt-2 text-sm text-muted">Sign in with your admin email and password.</p>

        {adminAuthConfigured ? (
          <LoginForm next={target} />
        ) : (
          <p className="mt-4 rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text">
            Admin sign-in is not configured yet. Add <code>ADMIN_EMAIL</code>,{" "}
            <code>ADMIN_PASSWORD</code> and <code>AUTH_SECRET</code> to your environment, then
            reload.
          </p>
        )}
      </div>
    </main>
  );
}
