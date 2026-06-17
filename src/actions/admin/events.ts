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
  description: z.string().trim().min(1),
  startsAt: z.string().trim().min(1),
  endsAt: z.string().trim().optional(),
  location: z.string().trim().optional(),
  coverImage: z.string().trim().optional(),
  isPublished: z.coerce.boolean(),
});

function revalidateEvents(slug?: string) {
  revalidatePath("/");
  revalidatePath("/news");
  if (slug) revalidatePath(`/events/${slug}`);
  revalidatePath("/admin/events");
}

export async function upsertEvent(id: string | null, formData: FormData) {
  await requireAdmin();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect(id ? `/admin/events/${id}/edit?error=1` : "/admin/events/new?error=1");
  }
  const d = parsed.data;
  const slug = (d.slug && slugify(d.slug)) || slugify(d.title);

  const data = {
    title: d.title,
    slug,
    description: d.description,
    startsAt: new Date(d.startsAt),
    endsAt: d.endsAt ? new Date(d.endsAt) : null,
    location: d.location || null,
    coverImage: d.coverImage || null,
    isPublished: d.isPublished,
  };

  if (id) await prisma.event.update({ where: { id }, data });
  else await prisma.event.create({ data });

  revalidateEvents(slug);
  redirect("/admin/events");
}

export async function deleteEvent(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.event.delete({ where: { id } });
  revalidateEvents();
  redirect("/admin/events");
}
