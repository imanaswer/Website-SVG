import type { ReactNode } from "react";

/** Consistent max-width content container. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Vertical section rhythm. `tone` sets the surface. */
export function Section({
  children,
  className = "",
  tone = "parchment",
  id,
  noSnap = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "parchment" | "card" | "indigo" | "ink";
  id?: string;
  /** Opt out of scroll-snap — use on sections with scroll-linked parallax. */
  noSnap?: boolean;
}) {
  const tones: Record<string, string> = {
    parchment: "bg-parchment text-text",
    card: "bg-card text-text",
    indigo: "bg-indigo text-parchment",
    ink: "bg-ink text-parchment",
  };
  return (
    <section
      id={id}
      data-no-snap={noSnap ? "" : undefined}
      className={`py-20 sm:py-24 lg:py-28 ${tones[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

/** Eyebrow + heading + optional intro, used at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <span
        aria-hidden
        className="gold-rule mb-5"
        data-inverted={inverted ? "true" : undefined}
        data-align={align === "center" ? "center" : undefined}
      />
      {eyebrow && (
        <p
          className={`text-[0.8125rem] font-semibold tracking-[0.2em] uppercase ${
            inverted ? "text-gold-soft" : "text-gold-deep"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-display text-[1.95rem] font-semibold sm:text-4xl lg:text-[2.6rem] lg:leading-[1.08] ${
          inverted ? "text-parchment" : "text-indigo"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            inverted ? "text-parchment/80" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
