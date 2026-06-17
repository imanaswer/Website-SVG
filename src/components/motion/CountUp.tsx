"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Counts a number up from 0 to `value` once when scrolled into view. Writes to
 * the node's textContent via the animation frame (no per-frame re-render), so
 * it's cheap. Under reduced-motion it renders the final value immediately.
 *
 * `grouping` off by default so years (1873) don't get a thousands separator;
 * turn it on for large quantities.
 */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  grouping = false,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  grouping?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const format = (n: number) =>
    `${prefix}${Math.round(n).toLocaleString(grouping ? "en-IN" : "en-US", {
      useGrouping: grouping,
    })}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce || !inView) {
      if (reduce) node.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  // SSR / pre-trigger fallback shows the final value for no-JS + crawlers.
  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
