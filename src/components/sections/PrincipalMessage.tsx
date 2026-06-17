import { PRINCIPAL } from "@/content/principal";

/** Principal's message. `variant="full"` renders the complete letter. */
export function PrincipalMessage({ variant = "short" }: { variant?: "short" | "full" }) {
  return (
    <div className="grid items-start gap-10 md:grid-cols-[auto_1fr]">
      <div className="flex items-center gap-4 md:flex-col md:items-start">
        <span
          aria-hidden
          className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-indigo/10 font-display text-2xl font-semibold text-indigo ring-1 ring-gold/30 ring-offset-4 ring-offset-[var(--card)]"
        >
          {/* TODO(media): principal photo */}
          {PRINCIPAL.name
            .split(" ")
            .map((w) => w[0])
            .slice(0, 2)
            .join("")}
        </span>
        <div>
          <p className="font-display text-lg font-semibold text-indigo">{PRINCIPAL.name}</p>
          <p className="text-sm text-muted">{PRINCIPAL.designation}</p>
        </div>
      </div>
      {variant === "short" ? (
        <figure className="relative">
          <span
            aria-hidden
            className="absolute -top-6 -left-2 font-display text-7xl leading-none text-gold/35 select-none"
          >
            &ldquo;
          </span>
          <blockquote className="relative font-display text-2xl leading-snug font-medium text-indigo sm:text-[1.75rem]">
            {PRINCIPAL.short}
          </blockquote>
        </figure>
      ) : (
        <div className="space-y-4 text-lg leading-relaxed text-text">
          {PRINCIPAL.full.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}
    </div>
  );
}
