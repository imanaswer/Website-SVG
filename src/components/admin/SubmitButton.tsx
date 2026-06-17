"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children = "Save",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`rounded-full bg-indigo px-6 py-2.5 text-sm font-semibold text-parchment transition-colors hover:bg-ink disabled:opacity-60 ${className}`}
    >
      {pending ? "Saving…" : children}
    </button>
  );
}

export function DeleteButton({ children = "Delete" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full border border-danger/50 px-4 py-2 text-sm font-semibold text-danger transition-colors hover:bg-danger/10 disabled:opacity-60"
      // Browser-native confirm before destructive submit.
      onClick={(e) => {
        if (!confirm("Delete this item? This cannot be undone.")) e.preventDefault();
      }}
    >
      {pending ? "Deleting…" : children}
    </button>
  );
}
