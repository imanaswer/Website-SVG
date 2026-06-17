import { AdminHeader } from "@/components/admin/ui";
import { EventForm } from "@/components/admin/EventForm";

export default async function NewEventPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <AdminHeader title="New event" />
      <EventForm event={null} error={Boolean(error)} />
    </>
  );
}
