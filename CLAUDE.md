@AGENTS.md

# Sri Gujarati Vidhyalaya — project conventions

Premium, production-grade website for a 153-year-old (Est. 1873) English-medium,
co-educational school in Mananchira, Kozhikode, Kerala. The 153-year heritage is
the spine of the design. See `claude-code-prompt.md` for the full build brief.

## Stack

- **Next.js 16** (App Router, Server Components, TypeScript) — note: 16, not 15
  (approved deviation; `create-next-app` ships 16). Read `node_modules/next/dist/docs/`
  before using unfamiliar APIs — this Next has breaking changes (e.g. async `params`).
- **Prisma 7** + `@prisma/adapter-pg` against **Supabase** Postgres.
- **Tailwind CSS v4** — tokens mapped via `@theme` in `src/app/globals.css`.
- Planned: Cloudinary (media), Resend (email), Supabase Auth (Phase 2 admin).

## Working agreement

1. Build in phases; stop for review after each. See `TODO.md`.
2. Ask before consequential decisions (auth, schema changes, new deps).
3. Real, clean copy — **no lorem ipsum**. Unknown facts → clearly-marked
   `TODO(...)` markers, never invented.
4. Accessibility, performance (Lighthouse ≥ 90 mobile) and mobile-first are
   requirements, not polish.

## Conventions

- **Design tokens** are the single source of truth in `globals.css` (`:root` +
  `@theme`). Use semantic Tailwind utilities (`bg-indigo`, `text-gold`,
  `border-line`, `font-display`), never raw hex in components.
- Fonts: **Fraunces** (display/headings) + **Manrope** (body) via `next/font`,
  exposed as `--font-fraunces` / `--font-manrope`.
- **Light parchment design only** — do NOT add a `prefers-color-scheme: dark` invert.
- Public pages live under the `(public)` route group; admin under `(admin)` (Phase 2).
- Prisma access via the **singleton** in `src/lib/prisma.ts` (driver adapter required
  by Prisma 7). Connection URLs: app → `DATABASE_URL` (pooled); migrations →
  `DIRECT_URL`, configured in `prisma.config.ts`.
- Env is validated in `src/lib/env.ts` (zod). Add new vars there + in `.env.example`.
- Motion is restrained and respects `prefers-reduced-motion` (see `Reveal`).

## Design tokens (reference)

```
--ink #0F1B36  --indigo #1A2A4F  --gold #C8A24B  --gold-soft #E3C987
--saffron #E08A2B  --parchment #F4EDE0  --card #FBF8F2
--text #20283A  --muted #5B6478  --line #E4DBCB
```

Signature motif: **jali** lattice (`src/components/patterns/Jali.tsx`) at low
opacity on dark sections.
