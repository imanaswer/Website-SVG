"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/session";

const schema = z.object({
  phone: z.string().trim().min(1),
  email: z.string().trim().email(),
  address: z.string().trim().min(1),
  admissionsOpen: z.coerce.boolean(),
  heroVideoUrl: z.string().trim().optional(),
  prospectusPdfUrl: z.string().trim().optional(),
  facebookUrl: z.string().trim().optional(),
  instagramUrl: z.string().trim().optional(),
  youtubeUrl: z.string().trim().optional(),
});

export async function upsertSettings(formData: FormData) {
  await requireAdmin();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/admin/settings?error=1");
  const d = parsed.data;

  const data = {
    phone: d.phone,
    email: d.email,
    address: d.address,
    admissionsOpen: d.admissionsOpen,
    heroVideoUrl: d.heroVideoUrl || null,
    prospectusPdfUrl: d.prospectusPdfUrl || null,
    facebookUrl: d.facebookUrl || null,
    instagramUrl: d.instagramUrl || null,
    youtubeUrl: d.youtubeUrl || null,
  };

  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  // Settings touch the whole site.
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
