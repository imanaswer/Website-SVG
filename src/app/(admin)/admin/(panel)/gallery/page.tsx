import Link from "next/link";
import { AdminHeader, EmptyState } from "@/components/admin/ui";
import { listAlbums } from "@/server/admin-data";

export default async function AdminGalleryList() {
  const albums = await listAlbums();
  return (
    <>
      <AdminHeader
        title="Gallery"
        description="Photo albums and their images."
        action={{ href: "/admin/gallery/new", label: "New album" }}
      />
      {albums.length === 0 ? (
        <EmptyState message="No albums yet. Create your first album." />
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {albums.map((album) => (
            <li key={album.id}>
              <Link
                href={`/admin/gallery/${album.id}`}
                className="block rounded-xl border border-line bg-card px-5 py-4 transition-shadow hover:shadow-md"
              >
                <p className="font-medium text-indigo">{album.title}</p>
                <p className="text-sm text-muted">
                  /{album.slug} · {album._count.images} image{album._count.images === 1 ? "" : "s"}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
