# Homepage visual enrichment — design

**Date:** 2026-06-18
**Goal:** The homepage reads as blank for a demo because it is text + icons + one
hero video, with zero photographs. Add curated imagery and two photo-forward
sections so the page feels alive, mirroring the photo-rich feel of the Ascend
reference — without breaking project conventions (tokens only, light parchment,
restrained motion, no invented facts).

## Decisions (from brainstorming)

- **Image source:** stock placeholders via remote URLs (Unsplash), swappable for
  real school photos later. Hero video is already a stock placeholder, so this is
  an established pattern.
- **Scope:** enrich existing sections + add a full-bleed photo band and a
  testimonials section. No section-order redesign.

## Components

### 1. Centralized media module — `src/content/media.ts`
Single source of truth for placeholder imagery. Exports typed objects with
`{ src, alt, width?, height? }`, grouped: `CAMPUS_WELCOME`, `STAGE_IMAGES`
(keyed by stage slug), `FACILITY_IMAGES` (keyed by facility name), `PHOTO_BAND`,
`TESTIMONIALS`. All `src` are stable Unsplash photo URLs (specific photo IDs, not
random). All `alt` is real, descriptive text. File header comments that these are
demo placeholders to swap.

`next.config.ts`: add `{ protocol: "https", hostname: "images.unsplash.com" }`
to `images.remotePatterns`.

### 2. Enriched existing sections (`src/app/(public)/page.tsx`)
- **Welcome** — framed campus photo in the right column (rounded-2xl, gold
  hairline ring, low-opacity Jali corner accent); stats grid moves beneath it.
- **Academics** — each stage card gets a rounded photo header above the existing
  text. Image keyed by `stage.slug` from `STAGE_IMAGES`.
- **Facilities** — `FacilitiesGrid` gains a `withImages` variant: photo header
  with the icon chip overlapping the image's bottom edge, text below. Image keyed
  by facility name. Home preview uses `withImages`; the standalone Facilities page
  keeps the existing icon-only layout (unchanged) unless trivial.

### 3. New sections
- **PhotoBand** — `src/components/sections/PhotoBand.tsx`. Full-bleed
  `next/image` (fill) with a dark gradient scrim and one short overlaid heritage
  line. Subtle parallax via existing `Parallax`; section uses `noSnap`. Placed
  between Academics and Facilities.
- **Testimonials** — `src/components/sections/Testimonials.tsx`. 2–3 quote cards
  with small round avatar photos, name + role attribution. Placed after Stories.
  **Content caveat:** quotes are placeholder copy marked `TODO(content)` in
  `media.ts` with neutral attribution (e.g. "Parent of a Class VIII student") —
  no fabricated named people. Replace with real, approved quotes before launch.

## Conventions honoured
- Semantic Tailwind utilities + design tokens only (no raw hex).
- Light parchment only; dark scrim only where text sits on photos.
- Motion via existing `Reveal` / `MotionReveal` / `Parallax`; respects reduced
  motion. `next/image` everywhere with correct `sizes`.

## Risks
- Remote Unsplash images need network at demo time (accepted per image-source
  choice).
- Verify `next build` / lint pass before declaring done.
