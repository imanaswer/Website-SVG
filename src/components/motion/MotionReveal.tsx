"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right";
type Tag = "div" | "li" | "section" | "article" | "span";

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
  }
}

/**
 * framer-motion successor to the CSS `Reveal`: an editorial fade + settle that
 * fires once when scrolled into view. reduced-motion is handled globally by
 * MotionConfig, so the content still appears — it just stops translating.
 */
export function MotionReveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  distance = 26,
  direction = "up",
  duration = 0.76,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** seconds */
  delay?: number;
  distance?: number;
  direction?: Direction;
  duration?: number;
  /** fraction of the element visible before triggering */
  amount?: number;
}) {
  const MTag = m[as];
  return (
    <MTag
      className={className}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount, margin: "0px 0px -40px 0px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </MTag>
  );
}
