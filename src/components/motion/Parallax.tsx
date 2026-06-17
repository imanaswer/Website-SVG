"use client";

import { m, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, type ReactNode, type ComponentProps } from "react";

/**
 * Gentle scroll-linked parallax. Translates its child on the Y axis as the
 * element travels through the viewport. `speed` is the total px drift across
 * the full pass (positive = moves down/slower than scroll). Disabled under
 * reduced-motion. Use sparingly — one focal layer per section.
 */
export function Parallax({
  children,
  className = "",
  speed = 60,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
} & Omit<ComponentProps<"div">, "ref" | "children" | "className">) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-speed / 2, speed / 2],
  );

  return (
    <div ref={ref} className={className} {...rest}>
      <m.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </m.div>
    </div>
  );
}
