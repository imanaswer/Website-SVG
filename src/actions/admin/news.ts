"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/session";
import { slugify } from "@/lib/slug";

const schema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().optional(),
  body: z.string().trim().min(1),
  coverImage: z.string().trim().optional(),
  isPublished: z.coerce.boolean(),
});

function revalidateNews(slug?: string) {
  revalidatePath("/");
  revalidatePath("/news");
  if (slug) revalidatePath(`/news/${slug}`);
  revalidatePath("/admin/news");
}

export async function upsertNews(id: string | null, formData: FormData) {
  await requireAdmin();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    // HTML `required` guards the must-haves; on a server-side miss, return to the form.
    redirect(id ? `/admin/news/${id}/edit?error=1` : "/admin/news/new?error=1");
  }
  const d = parsed.data;
  const slug = (d.slug && slugify(d.slug)) || slugify(d.title);

  const data = {
    title: d.title,
    slug,
    excerpt: d.excerpt || null,
    body: d.body,
    coverImage: d.coverImage || null,
    isPublished: d.isPublished,
    publishedAt: d.isPublished ? new Date() : null,
  };

  if (id) {
    // Preserve original publishedAt if already published.
    const existing = await prisma.news.findUnique({ where: { id } });
    await prisma.news.update({
      where: { id },
      data: {
        ...data,
        publishedAt: d.isPublished ? (existing?.publishedAt ?? new Date()) : null,
      },
    });
  } else {
    await prisma.news.create({ data });
  }

  revalidateNews(slug);
  redirect("/admin/news");
}

export async function deleteNews(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.news.delete({ where: { id } });
  revalidateNews();
  redirect("/admin/news");
}
