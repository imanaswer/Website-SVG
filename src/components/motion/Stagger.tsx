"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "ul" | "ol" | "dl";
type ItemTag = "div" | "li" | "article" | "span";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE } },
};

/**
 * Container that cascades its `StaggerItem` children into view. Triggers once
 * when scrolled into view; children inherit the `hidden`/`visible` states from
 * here, so each item only declares `variants`, never its own trigger.
 */
export function Stagger({
  children,
  className = "",
  as = "div",
  stagger = 0.08,
  delayChildren = 0.05,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** seconds between each child */
  stagger?: number;
  delayChildren?: number;
  amount?: number;
}) {
  const MTag = m[as];
  return (
    <MTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </MTag>
  );
}

/** Child of `Stagger`. Inherits the cascade timing from its parent. */
export function StaggerItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ItemTag;
}) {
  const MTag = m[as];
  return (
    <MTag className={className} variants={itemVariants}>
      {children}
    </MTag>
  );
}
