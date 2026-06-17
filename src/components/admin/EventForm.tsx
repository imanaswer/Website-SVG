import type { Event } from "@prisma/client";
import { Card, Field, TextArea, Checkbox } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { upsertEvent } from "@/actions/admin/events";

/** Format a Date as a value for <input type="datetime-local"> (local time). */
function toLocalInput(d: Date | null | undefined): string | undefined {
  if (!d) return undefined;
  const dt = new Date(d);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
}

export function EventForm({ event, error }: { event: Event | null; error?: boolean }) {
  return (
    <form action={upsertEvent.bind(null, event?.id ?? null)}>
      <Card className="space-y-5">
        {error && (
          <p className="rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text">
            Please complete the required fields.
          </p>
        )}
        <Field label="Title" name="title" required defaultValue={event?.title} />
        <Field label="Slug" name="slug" defaultValue={event?.slug} placeholder="auto-generated if blank" />
        <TextArea label="Description" name="description" rows={5} required defaultValue={event?.description} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Starts at" name="startsAt" type="datetime-local" required defaultValue={toLocalInput(event?.startsAt)} />
          <Field label="Ends at" name="endsAt" type="datetime-local" defaultValue={toLocalInput(event?.endsAt)} />
        </div>
        <Field label="Location" name="location" defaultValue={event?.location} placeholder="e.g. Main Campus, Mananchira" />
        <Field label="Cover image URL" name="coverImage" defaultValue={event?.coverImage} placeholder="https://… (optional)" />
        <Checkbox label="Published" name="isPublished" defaultChecked={event?.isPublished ?? true} />
        <div className="pt-2">
          <SubmitButton>Save event</SubmitButton>
        </div>
      </Card>
    </form>
  );
}
