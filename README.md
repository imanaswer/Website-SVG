# Sri Gujarati Vidhyalaya — School Website

A fresh, production-grade website for **Sri Gujarati Vidhyalaya Higher Secondary
School** — a 153-year-old (Est. 1873), Kerala-state-syllabus, English-medium,
co-educational school in Mananchira, Kozhikode, Kerala.

The 153-year heritage is the spine of the design: a regal, warm, literary
identity (heritage indigo + brass gold + parchment), a full-bleed video hero,
and a jali (Gujarati lattice) motif. Content (news, events, galleries, stories,
settings, enquiries) is managed by office staff through a custom admin — no code
required.

> Full product brief: [`claude-code-prompt.md`](./claude-code-prompt.md).
> Working conventions: [`CLAUDE.md`](./CLAUDE.md). Build checklist: [`TODO.md`](./TODO.md).

---

## Tech stack

| Concern        | Choice                                                        |
| -------------- | ------------------------------------------------------------- |
| Framework      | **Next.js 16** (App Router, Server Components, TypeScript)    |
| Styling        | **Tailwind CSS v4** — design tokens via `@theme` in `globals.css` |
| Fonts          | **Fraunces** (display) + **Manrope** (body) via `next/font`   |
| Database / ORM | **Supabase** Postgres + **Prisma 7** (`@prisma/adapter-pg`)   |
| Auth           | **Supabase Auth** (staff email allow-list) — Phase 2 admin     |
| Media          | **Cloudinary** (images/video), YouTube facade for stories      |
| Email          | **Resend** (enquiry notifications)                            |
| Validation     | **Zod**                                                       |
| Hosting        | **Vercel** (on-demand revalidation)                           |

> Note: the brief specified Next.js 15; `create-next-app` ships **16**, which we
> kept (approved). App Router / Server Components / Server Actions / revalidation
> all behave the same.

---

## Prerequisites

- **Node.js ≥ 20** (developed on Node 25; Prisma 7 config + seed rely on Node's
  native `.env` loader / TypeScript type-stripping).
- A **Supabase** project (Postgres + Auth).
- Optional for full functionality: **Cloudinary** cloud name, **Resend** API key.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
#   then fill in DATABASE_URL, DIRECT_URL, Supabase, Cloudinary, Resend values

# 3. Generate the Prisma client (also runs automatically as needed)
npm run db:generate

# 4. Create the schema and seed sample content (needs DATABASE_URL/DIRECT_URL)
npm run db:migrate      # prisma migrate dev — creates tables
npm run db:seed         # loads the Settings singleton + sample news/events/etc.

# 5. Run the dev server
npm run dev             # http://localhost:3000
```

The site is built to **run before credentials exist**: every data fetch falls
back to safe defaults / empty states, so `npm run build` and `npm run dev` work
with no database. Real content appears automatically once `DATABASE_URL` is set
and migrations are run.

### Environment variables

See [`.env.example`](./.env.example). Summary:

| Variable                            | Used for                                  | Required |
| ----------------------------------- | ----------------------------------------- | -------- |
| `DATABASE_URL`                      | App runtime (pooled / pgbouncer, :6543)   | Prod     |
| `DIRECT_URL`                        | Migrations (direct, :5432)                | Prod     |
| `NEXT_PUBLIC_SUPABASE_URL`          | Supabase Auth (admin)                     | Phase 2  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`     | Supabase Auth (admin)                     | Phase 2  |
| `ADMIN_ALLOWLIST`                   | Comma-separated staff emails allowed in admin | Phase 2 |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Image/video delivery                      | Media    |
| `RESEND_API_KEY`                    | Enquiry email notifications               | Enquiries |
| `ENQUIRY_NOTIFY_EMAIL`              | Office inbox for enquiry notifications    | Enquiries |

Env is validated by [`src/lib/env.ts`](./src/lib/env.ts) (Zod). Add new vars
there **and** in `.env.example`.

---

## Scripts

| Script               | Description                                |
| -------------------- | ------------------------------------------ |
| `npm run dev`        | Start the dev server                       |
| `npm run build`      | Production build                           |
| `npm run start`      | Serve the production build                 |
| `npm run lint`       | ESLint                                     |
| `npm run db:generate`| Generate the Prisma client                 |
| `npm run db:migrate` | Create/apply a migration (dev)             |
| `npm run db:seed`    | Seed sample content                        |
| `npm run db:studio`  | Open Prisma Studio                         |

---

## Project structure

```
prisma/
  schema.prisma          # content models (News, Event, Gallery*, Story, Enquiry, Settings)
  seed.ts                # sample data (real copy; TODO markers for unknowns)
prisma.config.ts         # Prisma 7 migration connection + seed config
src/
  app/
    (public)/            # public site (header + footer layout)
      page.tsx           #   home
      about/ academics/ admissions/ facilities/ contact/
      campus-life/[albumSlug]/
      news/[slug]/  events/[slug]/
    (admin)/admin/       # staff admin (Phase 2, Supabase-Auth gated)
    layout.tsx           # root: fonts, metadata
  components/
    layout/              # SiteHeader (hero-overlay), SiteFooter
    home/                # VideoHero, StoriesCarousel
    sections/            # PageHero, FacilitiesGrid, HeritageTimeline, cards, …
    ui/                  # Container, Section, Button, Icon, …
    forms/               # EnquiryForm
    motion/Reveal.tsx    # scroll reveal (respects reduced-motion)
    patterns/Jali.tsx    # jali lattice motif
  content/               # stable copy (site, academics, facilities, timeline, …)
  server/data.ts         # resilient public data access (safe fallbacks)
  actions/               # Server Actions (enquiry, + admin CRUD in Phase 2)
  lib/                   # prisma (lazy singleton), env, cloudinary, format, …
```

---

## Design system

Tokens are the single source of truth in [`src/app/globals.css`](./src/app/globals.css)
(`:root` + Tailwind `@theme`). Use semantic utilities (`bg-indigo`, `text-gold`,
`border-line`, `font-display`), never raw hex in components. **Light parchment
design only** — do not add a `prefers-color-scheme: dark` invert.

```
--ink #0F1B36   --indigo #1A2A4F   --gold #C8A24B   --gold-soft #E3C987
--saffron #E08A2B   --parchment #F4EDE0   --card #FBF8F2
--text #20283A   --muted #5B6478   --line #E4DBCB
```

---

## Content model

Editable by office staff via the admin. Tables: `News`, `Event`, `GalleryAlbum`
+ `GalleryImage`, `Story`, `Enquiry` (status `NEW`/`CONTACTED`/`CLOSED`), and a
single-row `Settings` (phone, email, address, admissions flag, hero video URL,
prospectus URL, socials). Stable content (facilities, academic streams,
principal bio, timeline) lives in `src/content/*` for v1.

---

## Deployment (Vercel)

1. Push to a Git repo and import into Vercel.
2. Set the environment variables above in the Vercel project.
3. Use the Supabase **pooled** URL for `DATABASE_URL` and the **direct** URL for
   `DIRECT_URL`. Run `prisma migrate deploy` as part of the build/release.
4. Public pages use on-demand revalidation; the admin triggers
   `revalidatePath`/`revalidateTag` so new posts appear without a redeploy.

---

## Build phases

- **Phase 0 — Foundations** ✅ scaffold, tokens, fonts, Prisma, layout, components.
- **Phase 1 — Public site** ✅ all 8 pages, video hero, enquiry form, galleries, news/events.
- **Phase 2 — Admin** ✅ Supabase Auth (magic link), `/admin` CRUD, enquiry inbox, revalidation.
- **Phase 3 — Polish** ✅ SEO/JSON-LD/sitemap/OG, a11y contrast + skip-link + error pages.
- **Phase 4 — Launch** ✅ WordPress redirects + launch docs (cutover, GBP, office guide, `LAUNCH.md`).

See [`TODO.md`](./TODO.md) for the detailed checklist and [`LAUNCH.md`](./LAUNCH.md)
for the go-live runbook. Credential-gated verification (real sign-in, DB persistence,
Resend, Lighthouse on a preview) remains for the owner — see each phase's notes.
