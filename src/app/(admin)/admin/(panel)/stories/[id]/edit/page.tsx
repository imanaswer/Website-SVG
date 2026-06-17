import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/ui";
import { StoryForm } from "@/components/admin/StoryForm";
import { DeleteButton } from "@/components/admin/SubmitButton";
import { getStory } from "@/server/admin-data";
import { deleteStory } from "@/actions/admin/stories";

export default async function EditStoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const story = await getStory(id);
  if (!story) notFound();

  return (
    <>
      <AdminHeader title="Edit story" />
      <StoryForm story={story} error={Boolean(error)} />
      <form action={deleteStory} className="mt-4">
        <input type="hidden" name="id" value={story.id} />
        <DeleteButton>Delete story</DeleteButton>
      </form>
    </>
  );
}
