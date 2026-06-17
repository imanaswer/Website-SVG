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
}: {
  children: ReactNode;
  className?: string;
  tone?: "parchment" | "card" | "indigo" | "ink";
  id?: string;
}) {
  const tones: Record<string, string> = {
    parchment: "bg-parchment text-text",
    card: "bg-card text-text",
    indigo: "bg-indigo text-parchment",
    ink: "bg-ink text-parchment",
  };
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${tones[tone]} ${className}`}>
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
      {eyebrow && (
        <p
          className={`text-sm font-semibold tracking-widest uppercase ${
            inverted ? "text-gold-soft" : "text-gold-deep"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-display text-3xl font-semibold sm:text-4xl ${
          inverted ? "text-parchment" : "text-indigo"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg ${inverted ? "text-parchment/80" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
