import { z } from "zod";

export const enquirySchema = z.object({
  parentName: z.string().trim().min(2, "Please enter your name."),
  childName: z.string().trim().max(120).optional().or(z.literal("")),
  gradeInterest: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20, "Please enter a valid phone number."),
  email: z.string().trim().email("Please enter a valid email address.").optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — must stay empty. Bots tend to fill every field.
  company: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
