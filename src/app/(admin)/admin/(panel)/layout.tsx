import Link from "next/link";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/admin/session";
import { adminAuthConfigured } from "@/lib/env";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Without admin credentials configured, show a notice instead of crashing.
  if (!adminAuthConfigured) {
    return (
      <main className="grid min-h-dvh place-items-center bg-parchment px-4">
        <div className="max-w-lg rounded-2xl border border-line bg-card p-8 text-center">
          <h1 className="font-display text-2xl font-semibold text-indigo">Admin not configured</h1>
          <p className="mt-3 text-muted">
            Admin sign-in is not set up yet. Add <code>ADMIN_EMAIL</code>,{" "}
            <code>ADMIN_PASSWORD</code> and <code>AUTH_SECRET</code> to your environment, then
            reload.
          </p>
          <Link href="/" className="mt-6 inline-block text-sm font-semibold text-indigo underline">
            Return to website
          </Link>
        </div>
      </main>
    );
  }

  const user = await requireAdmin();

  return (
    <div className="min-h-dvh bg-parchment lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="sticky top-0 hidden h-dvh bg-indigo lg:block">
        <AdminNav email={user.email} />
      </aside>
      {/* Mobile nav (disclosure) */}
      <details className="bg-indigo lg:hidden">
        <summary className="flex cursor-pointer items-center justify-between px-4 py-3 font-display text-lg font-semibold text-parchment marker:content-['']">
          SGV Admin
          <span className="text-xs font-normal text-parchment/70">Menu ▾</span>
        </summary>
        <AdminNav email={user.email} />
      </details>
      <main className="min-w-0 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
    </div>
  );
}
