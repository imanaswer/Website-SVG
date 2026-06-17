"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/supabase/server";

const schema = z.object({
  title: z.string().trim().min(2),
  caption: z.string().trim().optional(),
  youtubeUrl: z.string().trim().optional(),
  cloudinaryId: z.string().trim().optional(),
  thumbnail: z.string().trim().optional(),
  sortOrder: z.coerce.number().int().default(0),
  isPublished: z.coerce.boolean(),
});

function revalidateStories() {
  revalidatePath("/");
  revalidatePath("/campus-life");
  revalidatePath("/admin/stories");
}

export async function upsertStory(id: string | null, formData: FormData) {
  await requireAdmin();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect(id ? `/admin/stories/${id}/edit?error=1` : "/admin/stories/new?error=1");
  }
  const d = parsed.data;
  const data = {
    title: d.title,
    caption: d.caption || null,
    youtubeUrl: d.youtubeUrl || null,
    cloudinaryId: d.cloudinaryId || null,
    thumbnail: d.thumbnail || null,
    sortOrder: d.sortOrder,
    isPublished: d.isPublished,
  };

  if (id) await prisma.story.update({ where: { id }, data });
  else await prisma.story.create({ data });

  revalidateStories();
  redirect("/admin/stories");
}

export async function deleteStory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.story.delete({ where: { id } });
  revalidateStories();
  redirect("/admin/stories");
}
