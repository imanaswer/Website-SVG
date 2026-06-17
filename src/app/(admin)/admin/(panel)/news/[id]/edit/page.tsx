import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/ui";
import { NewsForm } from "@/components/admin/NewsForm";
import { DeleteButton } from "@/components/admin/SubmitButton";
import { getNews } from "@/server/admin-data";
import { deleteNews } from "@/actions/admin/news";

export default async function EditNewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const news = await getNews(id);
  if (!news) notFound();

  return (
    <>
      <AdminHeader title="Edit article" />
      <NewsForm news={news} error={Boolean(error)} />
      <form action={deleteNews} className="mt-4">
        <input type="hidden" name="id" value={news.id} />
        <DeleteButton>Delete article</DeleteButton>
      </form>
    </>
  );
}
