"use client";

import { useId } from "react";

/**
 * Jali — a Gujarati perforated-lattice motif rendered as a tiling SVG pattern.
 * The signature texture of the site. Use as a subtle overlay on dark sections
 * (low opacity ~0.1–0.18). Decorative only, so it is aria-hidden.
 *
 * Renders an interlocking-octagon tile via an SVG <pattern>. `color` controls
 * the stroke; `className` controls placement/opacity (e.g. "opacity-[0.12]").
 * Uses a unique pattern id (useId) so multiple instances on one page don't
 * collide on `url(#…)` references.
 */
export function Jali({
  className = "",
  color = "var(--gold)",
}: {
  className?: string;
  color?: string;
}) {
  const patternId = useId();
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          {/* interlocking octagons */}
          <g fill="none" stroke={color} strokeWidth="1.25">
            <polygon points="28,4 44,12 52,28 44,44 28,52 12,44 4,28 12,12" />
            <polygon points="28,16 36,20 40,28 36,36 28,40 20,36 16,28 20,20" />
            {/* connecting diamonds at the corners stitch tiles together */}
            <path d="M0 28 L8 24 L8 32 Z" />
            <path d="M56 28 L48 24 L48 32 Z" />
            <path d="M28 0 L24 8 L32 8 Z" />
            <path d="M28 56 L24 48 L32 48 Z" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
