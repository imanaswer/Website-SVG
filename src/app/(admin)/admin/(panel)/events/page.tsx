import Link from "next/link";
import { AdminHeader, Badge, EmptyState } from "@/components/admin/ui";
import { listEvents } from "@/server/admin-data";
import { formatDateTime } from "@/lib/format";

export default async function AdminEventsList() {
  const events = await listEvents();
  return (
    <>
      <AdminHeader
        title="Events"
        description="Upcoming and past events."
        action={{ href: "/admin/events/new", label: "New event" }}
      />
      {events.length === 0 ? (
        <EmptyState message="No events yet. Create your first event." />
      ) : (
        <ul className="space-y-3">
          {events.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-card px-5 py-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-indigo">{item.title}</p>
                <p className="text-sm text-muted">{formatDateTime(item.startsAt)}</p>
              </div>
              <div className="flex items-center gap-3">
                {item.isPublished ? <Badge tone="green">Published</Badge> : <Badge tone="amber">Hidden</Badge>}
                <Link href={`/admin/events/${item.id}/edit`} className="text-sm font-semibold text-indigo hover:underline">
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
