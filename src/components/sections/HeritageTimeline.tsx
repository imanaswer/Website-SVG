"use client";

import { m, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TIMELINE } from "@/content/timeline";

/**
 * Vertical heritage timeline — the homepage's signature moment. A gold line
 * grows down the rail as you scroll through it (scroll-linked + spring-smoothed).
 * Entries settle in with the lightweight CSS `Reveal`, and the dots pop via CSS
 * (`.timeline-node`) — so the only framer cost here is the single growing line.
 * Used on the home page and (expanded) About page.
 */
export function HeritageTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  return (
    <ol ref={ref} className="relative ml-3">
      {/* Rail: faint static track + the growing gold fill (the one framer bit). */}
      <span aria-hidden className="absolute left-0 top-1 bottom-1 w-px bg-gold/15" />
      {/* Under reduced-motion, show the full rail statically (no scroll-link). */}
      <m.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="absolute left-0 top-1 bottom-1 w-px origin-top bg-gradient-to-b from-gold via-gold to-gold-soft"
      />

      {TIMELINE.map((item, i) => (
        <Reveal as="li" key={item.year + item.title} delay={i * 80} className="group relative mb-11 pl-9 last:mb-0">
          <span
            aria-hidden
            className="timeline-node absolute top-1 -left-[7px] h-3.5 w-3.5 rounded-full border-2 border-gold bg-gold ring-4 ring-parchment"
          />
          <p className="font-display text-2xl font-semibold tracking-tight text-gold-deep">{item.year}</p>
          <h3 className="mt-1.5 font-display text-lg font-semibold text-indigo">{item.title}</h3>
          <p className="mt-1.5 max-w-xl leading-relaxed text-muted">{item.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
