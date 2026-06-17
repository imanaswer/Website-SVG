"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Single motion runtime for the whole public tree.
 *
 * - `LazyMotion` + `domAnimation` loads only the DOM animation feature set
 *   (transform/opacity/layout) instead of the full bundle — keeps the
 *   Lighthouse budget. `strict` forbids the heavy `motion.*` components, so
 *   every island uses the light `m.*` ones.
 * - `MotionConfig reducedMotion="user"` makes framer-motion honour
 *   prefers-reduced-motion globally, matching the CSS parity already in
 *   globals.css. No island needs to re-implement that opt-out.
 *
 * Server children pass straight through this client boundary, so wrapping the
 * layout does NOT turn pages into client components.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
