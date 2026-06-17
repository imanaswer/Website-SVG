import Link from "next/link";
import { AdminHeader, Badge, EmptyState } from "@/components/admin/ui";
import { listStories } from "@/server/admin-data";

export default async function AdminStoriesList() {
  const stories = await listStories();
  return (
    <>
      <AdminHeader
        title="Stories"
        description="Video stories shown on the home page and Campus Life."
        action={{ href: "/admin/stories/new", label: "New story" }}
      />
      {stories.length === 0 ? (
        <EmptyState message="No stories yet. Add your first video story." />
      ) : (
        <ul className="space-y-3">
          {stories.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-card px-5 py-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-indigo">
                  <span className="mr-2 text-muted">#{item.sortOrder}</span>
                  {item.title}
                </p>
                {item.caption && <p className="truncate text-sm text-muted">{item.caption}</p>}
              </div>
              <div className="flex items-center gap-3">
                {item.isPublished ? <Badge tone="green">Published</Badge> : <Badge tone="amber">Hidden</Badge>}
                <Link href={`/admin/stories/${item.id}/edit`} className="text-sm font-semibold text-indigo hover:underline">
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
