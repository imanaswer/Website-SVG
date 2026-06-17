"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnquiry } from "@/actions/enquiry";
import { Button } from "@/components/ui/Button";
import type { ActionResult } from "@/lib/response";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-parchment px-3.5 py-2.5 text-text outline-none focus:border-indigo focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold";

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p className="mt-1 text-sm text-danger" role="alert">
      {errors[0]}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="gold" size="lg" disabled={pending} aria-busy={pending}>
      {pending ? "Sending…" : "Submit enquiry"}
    </Button>
  );
}

export function EnquiryForm() {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    submitEnquiry,
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-gold/40 bg-card p-6" role="status" aria-live="polite">
        <h3 className="font-display text-xl font-semibold text-indigo">Enquiry received</h3>
        <p className="mt-2 text-muted">{state.message}</p>
      </div>
    );
  }

  const fe = state && !state.ok ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {state && !state.ok && !state.fieldErrors && (
        <p className="rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text" role="alert">
          {state.message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="parentName" className="text-sm font-medium text-text">
            Parent / guardian name <span className="text-danger">*</span>
          </label>
          <input id="parentName" name="parentName" required autoComplete="name" className={inputClass} />
          <FieldError errors={fe?.parentName} />
        </div>
        <div>
          <label htmlFor="childName" className="text-sm font-medium text-text">
            Child&rsquo;s name
          </label>
          <input id="childName" name="childName" className={inputClass} />
          <FieldError errors={fe?.childName} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-text">
            Phone <span className="text-danger">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={inputClass} />
          <FieldError errors={fe?.phone} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-text">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className={inputClass} />
          <FieldError errors={fe?.email} />
        </div>
      </div>

      <div>
        <label htmlFor="gradeInterest" className="text-sm font-medium text-text">
          Class of interest
        </label>
        <input
          id="gradeInterest"
          name="gradeInterest"
          placeholder="e.g. LKG, Class V, Plus One Science"
          className={inputClass}
        />
        <FieldError errors={fe?.gradeInterest} />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-text">
          Message
        </label>
        <textarea id="message" name="message" rows={4} className={inputClass} />
        <FieldError errors={fe?.message} />
      </div>

      {/* Honeypot — visually hidden, not announced, off the tab order. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <SubmitButton />
    </form>
  );
}
