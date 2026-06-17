import { Jali } from "@/components/patterns/Jali";
import { Container } from "@/components/ui/layout";

/** Compact heritage banner used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-indigo text-parchment">
      {/* Heritage depth: gradient wash + jali lattice. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink via-indigo to-ink" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <Jali color="var(--gold)" />
      </div>
      {/* Hairline of gold light along the bottom edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
      <Container className="relative pt-32 pb-20 sm:pt-36 sm:pb-24">
        <span aria-hidden className="gold-rule mb-6" data-inverted="true" />
        {eyebrow && (
          <p className="text-[0.8125rem] font-semibold tracking-[0.2em] text-gold-soft uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl font-display text-[2.5rem] leading-[1.05] font-semibold sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-parchment/80">{intro}</p>
        )}
      </Container>
    </section>
  );
}
