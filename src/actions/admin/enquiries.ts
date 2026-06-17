"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/supabase/server";

const schema = z.object({
  id: z.string().min(1),
  status: z.enum(["NEW", "CONTACTED", "CLOSED"]),
});

export async function setEnquiryStatus(formData: FormData) {
  await requireAdmin();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return;
  await prisma.enquiry.update({
    where: { id: parsed.data.id },
    data: { status: parsed.data.status },
  });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
