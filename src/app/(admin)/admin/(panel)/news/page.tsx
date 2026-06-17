import Link from "next/link";
import { AdminHeader, Badge, EmptyState } from "@/components/admin/ui";
import { listNews } from "@/server/admin-data";
import { formatDate } from "@/lib/format";

export default async function AdminNewsList() {
  const news = await listNews();
  return (
    <>
      <AdminHeader
        title="News"
        description="Announcements and articles."
        action={{ href: "/admin/news/new", label: "New article" }}
      />
      {news.length === 0 ? (
        <EmptyState message="No news yet. Create your first article." />
      ) : (
        <ul className="space-y-3">
          {news.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-card px-5 py-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-indigo">{item.title}</p>
                <p className="text-sm text-muted">
                  /{item.slug}
                  {item.publishedAt ? ` · ${formatDate(item.publishedAt)}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {item.isPublished ? <Badge tone="green">Published</Badge> : <Badge tone="amber">Draft</Badge>}
                <Link href={`/admin/news/${item.id}/edit`} className="text-sm font-semibold text-indigo hover:underline">
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
