import { Reveal } from "@/components/motion/Reveal";
import { TIMELINE } from "@/content/timeline";

/** Vertical heritage timeline. Used on the home page and (expanded) About page. */
export function HeritageTimeline() {
  return (
    <ol className="relative ml-3 border-l-2 border-gold/40">
      {TIMELINE.map((m, i) => (
        <Reveal as="li" key={m.year + m.title} delay={i * 80} className="relative mb-10 pl-8 last:mb-0">
          <span
            aria-hidden
            className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-gold bg-parchment"
          />
          <p className="font-display text-xl font-semibold text-gold-deep">{m.year}</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-indigo">{m.title}</h3>
          <p className="mt-1 max-w-xl text-muted">{m.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
