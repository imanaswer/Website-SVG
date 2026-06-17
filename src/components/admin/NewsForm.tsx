import type { News } from "@prisma/client";
import { Card, Field, TextArea, Checkbox } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { upsertNews } from "@/actions/admin/news";

export function NewsForm({ news, error }: { news: News | null; error?: boolean }) {
  return (
    <form action={upsertNews.bind(null, news?.id ?? null)}>
      <Card className="space-y-5">
        {error && (
          <p className="rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text">
            Please complete the required fields.
          </p>
        )}
        <Field label="Title" name="title" required defaultValue={news?.title} />
        <Field
          label="Slug"
          name="slug"
          defaultValue={news?.slug}
          placeholder="auto-generated from the title if left blank"
          help="The URL path, e.g. /news/your-slug"
        />
        <TextArea label="Excerpt" name="excerpt" rows={2} defaultValue={news?.excerpt} help="Short summary shown in listings." />
        <TextArea
          label="Body"
          name="body"
          rows={10}
          required
          defaultValue={news?.body}
          help="Supports basic HTML (headings, paragraphs, lists, links)."
        />
        <Field
          label="Cover image URL"
          name="coverImage"
          defaultValue={news?.coverImage}
          placeholder="https://… (optional)"
        />
        <Checkbox label="Published" name="isPublished" defaultChecked={news?.isPublished ?? false} />
        <div className="pt-2">
          <SubmitButton>Save news</SubmitButton>
        </div>
      </Card>
    </form>
  );
}
