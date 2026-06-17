import { AdminHeader } from "@/components/admin/ui";
import { StoryForm } from "@/components/admin/StoryForm";

export default async function NewStoryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <AdminHeader title="New story" />
      <StoryForm story={null} error={Boolean(error)} />
    </>
  );
}
