"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/session";
import { slugify } from "@/lib/slug";

function revalidateGallery(slug?: string) {
  revalidatePath("/campus-life");
  if (slug) revalidatePath(`/campus-life/${slug}`);
  revalidatePath("/admin/gallery");
}

const albumSchema = z.object({
  title: z.string().trim().min(2),
  slug: z.string().trim().optional(),
  coverImage: z.string().trim().optional(),
});

export async function upsertAlbum(id: string | null, formData: FormData) {
  await requireAdmin();
  const parsed = albumSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect(id ? `/admin/gallery/${id}?error=1` : "/admin/gallery/new?error=1");
  }
  const d = parsed.data;
  const slug = (d.slug && slugify(d.slug)) || slugify(d.title);
  const data = { title: d.title, slug, coverImage: d.coverImage || null };

  if (id) {
    await prisma.galleryAlbum.update({ where: { id }, data });
    revalidateGallery(slug);
    redirect(`/admin/gallery/${id}`);
  } else {
    const album = await prisma.galleryAlbum.create({ data });
    revalidateGallery(slug);
    redirect(`/admin/gallery/${album.id}`);
  }
}

export async function deleteAlbum(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.galleryAlbum.delete({ where: { id } }); // images cascade
  revalidateGallery();
  redirect("/admin/gallery");
}

const imageSchema = z.object({
  cloudinaryId: z.string().trim().min(1),
  caption: z.string().trim().optional(),
  sortOrder: z.coerce.number().int().default(0),
});

export async function addImage(albumId: string, formData: FormData) {
  await requireAdmin();
  const parsed = imageSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/admin/gallery/${albumId}?error=image`);
  const d = parsed.data;
  await prisma.galleryImage.create({
    data: {
      albumId,
      cloudinaryId: d.cloudinaryId,
      caption: d.caption || null,
      sortOrder: d.sortOrder,
    },
  });
  const album = await prisma.galleryAlbum.findUnique({ where: { id: albumId } });
  revalidateGallery(album?.slug);
  redirect(`/admin/gallery/${albumId}`);
}

export async function deleteImage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const albumId = String(formData.get("albumId"));
  await prisma.galleryImage.delete({ where: { id } });
  const album = await prisma.galleryAlbum.findUnique({ where: { id: albumId } });
  revalidateGallery(album?.slug);
  redirect(`/admin/gallery/${albumId}`);
}
