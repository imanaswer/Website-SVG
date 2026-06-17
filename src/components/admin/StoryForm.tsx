import type { Story } from "@prisma/client";
import { Card, Field, TextArea, Checkbox } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { upsertStory } from "@/actions/admin/stories";

export function StoryForm({ story, error }: { story: Story | null; error?: boolean }) {
  return (
    <form action={upsertStory.bind(null, story?.id ?? null)}>
      <Card className="space-y-5">
        {error && (
          <p className="rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text">
            Please complete the required fields.
          </p>
        )}
        <Field label="Title" name="title" required defaultValue={story?.title} />
        <TextArea label="Caption" name="caption" rows={2} defaultValue={story?.caption} />
        <Field
          label="YouTube URL"
          name="youtubeUrl"
          defaultValue={story?.youtubeUrl}
          placeholder="https://www.youtube.com/watch?v=…"
          help="Paste a YouTube link; a play button and thumbnail are shown automatically."
        />
        <Field
          label="Cloudinary video id"
          name="cloudinaryId"
          defaultValue={story?.cloudinaryId}
          help="Optional, if hosting the video on Cloudinary instead of YouTube."
        />
        <Field label="Thumbnail URL" name="thumbnail" defaultValue={story?.thumbnail} placeholder="https://… (optional)" />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={story?.sortOrder ?? 0} help="Lower numbers appear first." />
        <Checkbox label="Published" name="isPublished" defaultChecked={story?.isPublished ?? true} />
        <div className="pt-2">
          <SubmitButton>Save story</SubmitButton>
        </div>
      </Card>
    </form>
  );
}
