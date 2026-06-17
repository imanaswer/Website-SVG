import Link from "next/link";
import type { ReactNode } from "react";

export function AdminHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold text-indigo">{title}</h1>
        {description && <p className="mt-1 text-muted">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="rounded-full bg-indigo px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-ink"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-line bg-card p-6 ${className}`}>{children}</div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-card px-6 py-12 text-center text-muted">
      {message}
    </div>
  );
}

export function Badge({ tone, children }: { tone: "green" | "amber" | "gray" | "indigo"; children: ReactNode }) {
  const tones = {
    green: "bg-green-100 text-green-800",
    amber: "bg-amber-100 text-amber-900",
    gray: "bg-black/5 text-muted",
    indigo: "bg-indigo/10 text-indigo",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ---- form fields ---- */

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-parchment px-3.5 py-2.5 text-text outline-none focus:border-indigo focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold";

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
  help,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
  placeholder?: string;
  help?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-text">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        className={inputClass}
      />
      {help && <p className="mt-1 text-xs text-muted">{help}</p>}
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  rows = 5,
  required,
  help,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
  help?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-text">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? undefined}
        className={inputClass}
      />
      {help && <p className="mt-1 text-xs text-muted">{help}</p>}
    </div>
  );
}

export function Checkbox({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-medium text-text">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-line text-indigo focus:ring-gold"
      />
      {label}
    </label>
  );
}
