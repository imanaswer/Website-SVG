import Link from "next/link";
import { AdminHeader } from "@/components/admin/ui";
import { getDashboardCounts } from "@/server/admin-data";
import { hasDatabase } from "@/lib/prisma";

const TILES = [
  { href: "/admin/news", label: "News", key: "news" as const },
  { href: "/admin/events", label: "Events", key: "events" as const },
  { href: "/admin/stories", label: "Stories", key: "stories" as const },
  { href: "/admin/gallery", label: "Albums", key: "albums" as const },
];

export default async function AdminDashboard() {
  const counts = await getDashboardCounts();

  return (
    <>
      <AdminHeader title="Dashboard" description="Manage the school website content." />

      {!hasDatabase && (
        <p className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          No database is connected yet. Counts show zero until <code>DATABASE_URL</code> is set and
          migrations are run.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-xl border border-line bg-card p-6 transition-shadow hover:shadow-md"
          >
            <p className="font-display text-4xl font-semibold text-indigo">{counts[t.key]}</p>
            <p className="mt-1 text-sm text-muted">{t.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/enquiries"
          className="flex items-center justify-between rounded-xl border border-line bg-card p-6 transition-shadow hover:shadow-md"
        >
          <div>
            <p className="font-display text-xl font-semibold text-indigo">Enquiries</p>
            <p className="mt-1 text-sm text-muted">Admissions & contact messages</p>
          </div>
          {counts.newEnquiries > 0 && (
            <span className="rounded-full bg-saffron px-3 py-1 text-sm font-semibold text-ink">
              {counts.newEnquiries} new
            </span>
          )}
        </Link>
        <Link
          href="/admin/settings"
          className="flex items-center rounded-xl border border-line bg-card p-6 transition-shadow hover:shadow-md"
        >
          <div>
            <p className="font-display text-xl font-semibold text-indigo">Settings</p>
            <p className="mt-1 text-sm text-muted">Contact details, hero video, admissions flag</p>
          </div>
        </Link>
      </div>
    </>
  );
}
