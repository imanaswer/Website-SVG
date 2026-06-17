"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Transform-only entrance (opacity stays 1). Deliberate for LCP: the hero text
// is the largest paint, so keeping opacity at 1 means it renders at first paint
// from SSR instead of waiting on hydration to fade in — the headline/lede paint
// early even while they settle into place.
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { y: 20 },
  visible: { y: 0, transition: { duration: 0.7, ease: EASE } },
};
const rule = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
};
const headline = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const lineRise = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
};

/**
 * Hero headline + lede + CTA choreography. Animates on load (above the fold):
 * the gold rule draws across, eyebrow + body settle up, and each headline line
 * rises out of an overflow mask for the editorial reveal. reduced-motion is
 * honoured globally via MotionConfig, so everything still simply appears.
 */
export function HeroContent({
  established,
  lines,
  lead,
  actions,
}: {
  established: string | number;
  /** headline split into display lines for the masked rise */
  lines: string[];
  lead: string;
  actions: ReactNode;
}) {
  return (
    <m.div
      className="max-w-2xl"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <m.span
        aria-hidden
        className="hero-rule gold-rule mb-6 origin-left"
        data-inverted="true"
        variants={rule}
      />
      <m.p
        className="hero-fade text-[0.8125rem] font-semibold tracking-[0.22em] text-gold-soft uppercase"
        variants={fadeUp}
      >
        Established {established}
      </m.p>

      <m.h1
        className="mt-4 font-display text-[2.75rem] font-semibold leading-[1.04] text-parchment sm:text-6xl lg:text-[4.25rem]"
        variants={headline}
      >
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.12em]">
            <m.span className="hero-line block" variants={lineRise}>
              {line}
            </m.span>
          </span>
        ))}
      </m.h1>

      <m.p
        className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-parchment/85"
        variants={fadeUp}
      >
        {lead}
      </m.p>

      <m.div className="hero-fade mt-8 flex flex-wrap gap-3" variants={fadeUp}>
        {actions}
      </m.div>
    </m.div>
  );
}
