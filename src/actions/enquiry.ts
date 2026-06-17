"use server";

import { z } from "zod";
import { Resend } from "resend";
import { prisma, hasDatabase } from "@/lib/prisma";
import { env } from "@/lib/env";
import { enquirySchema } from "@/lib/validation/enquiry";
import { ok, fail, type ActionResult } from "@/lib/response";
import { SITE } from "@/content/site";

const SUCCESS_MESSAGE =
  "Thank you — your enquiry has been received. Our office will be in touch soon.";

export async function submitEnquiry(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // Honeypot: if the hidden field is filled, treat as a bot. Return a success
  // shape without storing or notifying, so we don't tip off the bot.
  if (raw.company) return ok(undefined, SUCCESS_MESSAGE);

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return fail("Please check the highlighted fields and try again.", fieldErrors);
  }

  const data = parsed.data;

  if (!hasDatabase) {
    return fail(
      `We couldn't submit your enquiry right now. Please call us on ${SITE.phone} and we'll be glad to help.`,
    );
  }

  try {
    await prisma.enquiry.create({
      data: {
        parentName: data.parentName,
        childName: data.childName || null,
        gradeInterest: data.gradeInterest || null,
        phone: data.phone,
        email: data.email || null,
        message: data.message || null,
      },
    });
  } catch (err) {
    console.error("[enquiry] insert failed", err);
    return fail(
      `Something went wrong saving your enquiry. Please call us on ${SITE.phone}.`,
    );
  }

  // Best-effort office notification. Never blocks or fails the submission.
  await notifyOffice(data).catch((err) => console.error("[enquiry] notify failed", err));

  return ok(undefined, SUCCESS_MESSAGE);
}

async function notifyOffice(data: z.infer<typeof enquirySchema>) {
  if (!env.RESEND_API_KEY || !env.ENQUIRY_NOTIFY_EMAIL) {
    console.warn("[enquiry] Resend not configured; skipping notification.");
    return;
  }
  const resend = new Resend(env.RESEND_API_KEY);
  await resend.emails.send({
    from: `Sri Gujarati Vidhyalaya <onboarding@resend.dev>`, // TODO(domain): verified sender
    to: env.ENQUIRY_NOTIFY_EMAIL,
    replyTo: data.email || undefined,
    subject: `New admissions enquiry — ${data.parentName}`,
    text: [
      `Parent / guardian: ${data.parentName}`,
      data.childName ? `Child: ${data.childName}` : null,
      data.gradeInterest ? `Class of interest: ${data.gradeInterest}` : null,
      `Phone: ${data.phone}`,
      data.email ? `Email: ${data.email}` : null,
      data.message ? `\nMessage:\n${data.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
