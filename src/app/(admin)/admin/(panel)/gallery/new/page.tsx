import { AdminHeader, Card, Field } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { upsertAlbum } from "@/actions/admin/gallery";

export default async function NewAlbumPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <AdminHeader title="New album" description="Create the album, then add images to it." />
      <form action={upsertAlbum.bind(null, null)}>
        <Card className="space-y-5">
          {error && (
            <p className="rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text">
              Please complete the required fields.
            </p>
          )}
          <Field label="Title" name="title" required />
          <Field label="Slug" name="slug" placeholder="auto-generated if blank" />
          <Field label="Cover image (Cloudinary id)" name="coverImage" placeholder="e.g. sgv/album-cover" />
          <div className="pt-2">
            <SubmitButton>Create album</SubmitButton>
          </div>
        </Card>
      </form>
    </>
  );
}
