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
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <Jali color="var(--gold)" />
      </div>
      <Container className="relative pb-16 pt-28 sm:pb-20 sm:pt-32">
        {eyebrow && (
          <p className="text-sm font-semibold tracking-widest text-gold-soft uppercase">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-parchment/80">{intro}</p>}
      </Container>
    </section>
  );
}
