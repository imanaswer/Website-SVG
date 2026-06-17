# Homepage Motion Elevation — "Living Heritage"

**Date:** 2026-06-17
**Scope:** Homepage deep + shared elements (Button, motion primitives). Other public pages are a later pass.
**Goal:** Elevate the homepage to award-tier ("$1M") polish while preserving the deliberately
restrained "heritage editorial" design DNA. Premium, not flashy.

## Decisions (locked with stakeholder)

- **Motion level:** Elevated but refined.
- **Scope:** Homepage first, deeply, + shared primitives that lift every page.
- **Library:** `framer-motion` (the `motion` package) — approved new dependency.
- **Workflow:** Vertical slice first (primitives + hero + audience cards) → review on LAN dev
  server → roll out to remaining sections.
- **Signature moment:** Heritage timeline "growing gold line" (scroll-driven) is the centerpiece.

## Non-negotiable guardrails

1. **Server Components stay server-side.** `src/app/(public)/page.tsx` is an async Server
   Component with a `Promise.all` data fetch — do NOT add `"use client"`. Motion lives only in
   small reusable client islands.
2. **Performance (Lighthouse ≥90 mobile).** Use `LazyMotion` + `domAnimation` (lean bundle),
   transform/opacity-only animations, and route all motion through framer-motion's
   `useReducedMotion` for reduced-motion parity.
3. **Tokens only.** All color/glow/shimmer via existing CSS vars in `globals.css`. No raw hex.
4. **Install gate.** Step 1: install `motion`, verify peer deps vs React 19.2 / Next 16.2,
   confirm import path, run `npm run build` BEFORE building components.
5. **Scroll-snap.** Existing `scroll-snap-type: y proximity` fights scroll-linked parallax.
   Scope snap OFF the parallax sections (hero + CTA); keep elsewhere.
6. **Keep existing `Reveal`.** Add new primitives alongside; don't rip out working code.

## Motion primitives (`src/components/motion/`)

- `MotionReveal` — in-view fade+rise, directional variants.
- `Stagger` — parent cascading children with spring stagger.
- `Parallax` — `useScroll`-driven gentle translate for hero media / jali.
- `CountUp` — animated number roll for stats, triggered in-view.
- `MagneticButton` — subtle cursor-follow pull on primary CTAs (reduced-motion → static).
- A shared `LazyMotion` provider wrapper so features load once.

## Section choreography

- **Hero:** staggered line rise on load, gold rule draw-in, slow parallax on media + jali,
  bobbing scroll cue, gold shimmer sweep on bottom hairline.
- **Audience cards:** stagger-in, magnetic arrow, refined lift/glow.
- **Welcome + stats:** `CountUp` stats + stagger.
- **Academics / Facilities grids:** stagger cascade.
- **Stories / News / Events:** in-view reveals + refined hover.
- **Heritage timeline:** scroll-driven growing gold line + sequential entry draw-in (centerpiece).
- **Admissions CTA:** animated jali shimmer, headline reveal, magnetic gold button.

## Shared lifts

- `Button` / `ButtonLink`: magnetic + refined press feel (degrade gracefully without JS where
  needed; magnetic is a client enhancement).

## Build order

gate → primitives → hero + audience slice → **stakeholder review** → roll out remaining sections.
