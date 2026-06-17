import { notFound } from "next/navigation";
import { AdminHeader, Card, Field, EmptyState } from "@/components/admin/ui";
import { SubmitButton, DeleteButton } from "@/components/admin/SubmitButton";
import { getAlbum } from "@/server/admin-data";
import { upsertAlbum, deleteAlbum, addImage, deleteImage } from "@/actions/admin/gallery";

export default async function AlbumEditorPage({
  params,
  searchParams,
}: {
  params: Promise<{ albumId: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { albumId } = await params;
  const { error } = await searchParams;
  const album = await getAlbum(albumId);
  if (!album) notFound();

  return (
    <>
      <AdminHeader title={album.title} description={`/campus-life/${album.slug}`} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Album details */}
        <form action={upsertAlbum.bind(null, album.id)}>
          <Card className="space-y-5">
            <h2 className="font-display text-lg font-semibold text-indigo">Album details</h2>
            <Field label="Title" name="title" required defaultValue={album.title} />
            <Field label="Slug" name="slug" defaultValue={album.slug} />
            <Field label="Cover image (Cloudinary id)" name="coverImage" defaultValue={album.coverImage} />
            <div className="flex items-center gap-3 pt-2">
              <SubmitButton>Save album</SubmitButton>
            </div>
          </Card>
        </form>

        {/* Add image */}
        <form action={addImage.bind(null, album.id)}>
          <Card className="space-y-5">
            <h2 className="font-display text-lg font-semibold text-indigo">Add an image</h2>
            {error === "image" && (
              <p className="rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text">
                A Cloudinary id is required.
              </p>
            )}
            <Field label="Cloudinary id" name="cloudinaryId" required placeholder="e.g. sgv/photo-1" />
            <Field label="Caption" name="caption" />
            <Field label="Sort order" name="sortOrder" type="number" defaultValue={0} />
            <div className="pt-2">
              <SubmitButton>Add image</SubmitButton>
            </div>
          </Card>
        </form>
      </div>

      {/* Images */}
      <h2 className="mt-10 mb-4 font-display text-xl font-semibold text-indigo">
        Images ({album.images.length})
      </h2>
      {album.images.length === 0 ? (
        <EmptyState message="No images in this album yet." />
      ) : (
        <ul className="space-y-2">
          {album.images.map((img) => (
            <li
              key={img.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-card px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-mono text-sm text-text">
                  <span className="mr-2 text-muted">#{img.sortOrder}</span>
                  {img.cloudinaryId}
                </p>
                {img.caption && <p className="truncate text-sm text-muted">{img.caption}</p>}
              </div>
              <form action={deleteImage}>
                <input type="hidden" name="id" value={img.id} />
                <input type="hidden" name="albumId" value={album.id} />
                <DeleteButton>Remove</DeleteButton>
              </form>
            </li>
          ))}
        </ul>
      )}

      {/* Delete album */}
      <form action={deleteAlbum} className="mt-10 border-t border-line pt-6">
        <input type="hidden" name="id" value={album.id} />
        <DeleteButton>Delete entire album</DeleteButton>
      </form>
    </>
  );
}
