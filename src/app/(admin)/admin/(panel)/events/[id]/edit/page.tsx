import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/ui";
import { EventForm } from "@/components/admin/EventForm";
import { DeleteButton } from "@/components/admin/SubmitButton";
import { getEvent } from "@/server/admin-data";
import { deleteEvent } from "@/actions/admin/events";

export default async function EditEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const event = await getEvent(id);
  if (!event) notFound();

  return (
    <>
      <AdminHeader title="Edit event" />
      <EventForm event={event} error={Boolean(error)} />
      <form action={deleteEvent} className="mt-4">
        <input type="hidden" name="id" value={event.id} />
        <DeleteButton>Delete event</DeleteButton>
      </form>
    </>
  );
}
