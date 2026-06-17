import { PRINCIPAL } from "@/content/principal";

/** Principal's message. `variant="full"` renders the complete letter. */
export function PrincipalMessage({ variant = "short" }: { variant?: "short" | "full" }) {
  return (
    <div className="grid items-start gap-8 md:grid-cols-[auto_1fr]">
      <div className="flex items-center gap-4 md:flex-col md:items-start">
        <span
          aria-hidden
          className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-indigo/10 font-display text-2xl font-semibold text-indigo"
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
      <div className="space-y-4 text-lg leading-relaxed text-text">
        {variant === "short" ? (
          <p>“{PRINCIPAL.short}”</p>
        ) : (
          PRINCIPAL.full.map((para, i) => <p key={i}>{para}</p>)
        )}
      </div>
    </div>
  );
}
