import { Reveal } from "@/components/motion/Reveal";
import { TIMELINE } from "@/content/timeline";

/** Vertical heritage timeline. Used on the home page and (expanded) About page. */
export function HeritageTimeline() {
  return (
    <ol className="relative ml-3 border-l border-gold/30">
      {TIMELINE.map((m, i) => (
        <Reveal as="li" key={m.year + m.title} delay={i * 80} className="group relative mb-11 pl-9 last:mb-0">
          <span
            aria-hidden
            className="absolute top-1 -left-[7px] h-3.5 w-3.5 rounded-full border-2 border-gold bg-parchment ring-4 ring-parchment transition-colors group-hover:bg-gold"
          />
          <p className="font-display text-2xl font-semibold tracking-tight text-gold-deep">{m.year}</p>
          <h3 className="mt-1.5 font-display text-lg font-semibold text-indigo">{m.title}</h3>
          <p className="mt-1.5 max-w-xl leading-relaxed text-muted">{m.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
