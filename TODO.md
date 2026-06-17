# Build checklist

Stop for review after each phase.

## Phase 0 — Foundations
- [x] Scaffold Next.js 16 + TS + Tailwind v4 + ESLint
- [x] Design tokens (`globals.css` `:root` + `@theme`)
- [x] Fonts: Fraunces + Manrope via `next/font`
- [x] `CLAUDE.md` (conventions) + `TODO.md`
- [x] Prisma 7 schema + `prisma.config.ts` + singleton client (`@prisma/adapter-pg`)
- [x] Typed env (`src/lib/env.ts`) + `.env.example`
- [x] Seed script (`prisma/seed.ts`)
- [x] Shared public layout: `SiteHeader` (+ mobile drawer), `SiteFooter`
- [x] `Jali` pattern + `Reveal` motion components
- [x] Route stubs for all 8 pages
- [ ] **Awaiting creds:** run `prisma migrate dev` + `prisma db seed` against Supabase
- [ ] Review with stakeholder, then start Phase 1

## Phase 1 — Public site
- [x] Video hero (plain `<video>` from settings.heroVideoUrl; poster, webm slot,
      offscreen-pause, gradient+jali fallback for reduced-motion/no-video)
- [x] Audience quick-entry cards
- [x] Welcome/about teaser, principal's message, academics overview
- [x] Facilities grid (shared component)
- [x] Stories carousel (click-to-load YouTube facade, no heavy dep)
- [x] News & events list + `/news/[slug]` + `/events/[slug]` detail (notFound on miss)
- [x] Gallery albums + `/campus-life/[albumSlug]` images (Cloudinary URL helper)
- [x] Heritage timeline (shared component)
- [x] Admissions enquiry form (Server Action + zod + Resend + honeypot; useActionState)
- [x] Contact page (details + map iframe + form)
- [x] Hero-overlay header (transparent→solid on scroll) + drawer Escape/focus-trap
- [x] All 8 pages build, lint clean, serve 200; safe empty states pre-DB
- [ ] **Awaiting creds:** run migrate+seed, then verify real data + Resend send + DB insert
- [ ] **Not done here:** pixel/visual QA (no browser driver) — review via `npm run dev`
- [ ] next-cloudinary + real hero video (deferred until media/cloud name lands)

## Phase 2 — Admin
- [x] Supabase Auth — magic-link (passwordless), `ADMIN_ALLOWLIST` env allow-list
- [x] Middleware guard on `/admin` (+ `requireAdmin()` defense-in-depth in actions)
- [x] Login page + PKCE callback + sign-out
- [x] `/admin` dashboard (counts + quick links)
- [x] CRUD: news, events, stories (list/new/edit/delete, publish toggles)
- [x] CRUD: gallery albums + per-album image management
- [x] Settings single-row editor
- [x] Enquiry inbox with status (NEW/CONTACTED/CLOSED)
- [x] On-demand revalidation (`revalidatePath`) on every mutation
- [x] Graceful "not configured" notice when Supabase env absent; build + lint clean
- [ ] **Awaiting creds:** real sign-in, CRUD persistence, middleware redirect — verify with Supabase + DB
- [ ] Supabase email (SMTP) must be enabled for magic links to deliver
- [ ] **Not done here:** visual QA of admin (no browser driver) — review via `npm run dev`

## Phase 3 — Polish
- [x] SEO: metadataBase, per-page metadata, OG/Twitter defaults, keywords (local SEO)
- [x] Generated OG image (`opengraph-image.tsx`, branded, no asset file)
- [x] `sitemap.xml` (static + dynamic news/events/albums) + `robots.txt` (disallow /admin)
- [x] JSON-LD `School`/`EducationalOrganization` (founded 1873, address, geo, areaServed)
- [x] Accessibility: skip link, AA contrast fixes (gold-deep + danger text tokens),
      focus-visible states, heading hierarchy, reduced-motion
- [x] Branded 404 (`not-found.tsx`) + 500 (`global-error.tsx`)
- [x] Performance: CLS-safe image containers, font swap, minimal client JS
- [~] Analytics: skipped per request (add @vercel/analytics or Plausible later)
- [ ] **Needs runtime tools (not available here):** Lighthouse ≥ 90 mobile run,
      real on-device QA, visual review — run via `npm run dev` / deploy preview
- [ ] Load real content (after creds + office content)

## Phase 4 — Launch
- [x] WordPress → new URL redirects in `next.config.ts` (308/307, verified firing)
- [x] Cloudinary/YouTube `images.remotePatterns` for future next/image
- [x] Domain cutover plan (`docs/launch/domain-cutover.md`)
- [x] Google Business + Search Console notes (`docs/launch/google-business.md`)
- [x] Office "how to post a notice" guide (`docs/launch/how-to-post-a-notice.md`)
- [x] Launch runbook checklist (`LAUNCH.md`)
- [ ] **Owner actions (need real data/access):** crawl old site for the full
      redirect map; run cutover; verify Lighthouse ≥ 90 on preview; claim GBP

## Open flags
- Affiliation: **Kerala state syllabus** (confirmed). Revisit if it turns out CBSE
  (would add mandatory-disclosure pages).
- Confirm real office inbox for enquiry notifications.
- Malayalam (next-intl) deferred; architecture should stay i18n-ready.
