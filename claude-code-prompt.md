# Claude Code — Build Brief: Sri Gujarati Vidhyalaya School Website

> Paste this whole file as your opening message to Claude Code. The "Working agreement"
> and "Design system" sections are also good candidates to copy into a `CLAUDE.md` so
> they persist across sessions.

---

## Mission

Build a fresh, premium, production-grade website for **Sri Gujarati Vidhyalaya Higher
Secondary School** — a 153-year-old (Est. 1873), Kerala Government–recognised, English-medium
co-educational school in Mananchira, Kozhikode, Kerala. The current site
(srigujaratividhyalaya.com) is a dated WordPress theme with typos, broken links, corrupted
text, and no real identity. We are rebuilding from scratch.

The single biggest asset is the **153-year heritage** — it should be the spine of the design,
not a footnote.

## Tech stack (use exactly this)

- **Next.js 15** (App Router, Server Components, TypeScript)
- **Supabase** (Postgres + Auth + Storage) as the content backend
- **Prisma** as the ORM (singleton client pattern)
- **Cloudinary** for the hero video loop and image galleries (adaptive delivery)
- **Resend** for transactional email (enquiry notifications)
- **Vercel** for hosting, with on-demand revalidation
- **Tailwind CSS v4** for styling, with our design tokens mapped to CSS variables
  *(if you'd rather use CSS Modules + a global tokens file, that's fine — but keep the
  exact tokens below as the single source of truth)*

## Working agreement

1. **Start with a plan.** Before writing code, produce a short build plan and a repo
   structure, and confirm the Supabase schema with me. Don't scaffold everything at once.
2. **Build in the phases defined at the bottom.** Finish and let me review each phase before
   moving on. Phase 1 first.
3. **Ask before any consequential decision** (auth approach, schema changes, adding deps).
4. Keep a running `CLAUDE.md` with conventions, and a `TODO.md` tracking the phase checklist.
5. Accessibility, performance, and mobile-first are requirements, not polish — see standards.
6. Write real, clean copy. **No lorem ipsum, no placeholder typos.** Where real data is
   missing (faculty names, exact fees), use clearly-labelled `TODO:` markers, never fake facts.

---

## Design system (source of truth)

**Concept:** heritage Indian institution — regal, warm, literary. Deliberately *not* startup
dark-mode or generic cream-and-terracotta.

**Palette (CSS variables):**
```
--ink:       #0F1B36   /* midnight indigo — deepest surfaces */
--indigo:    #1A2A4F   /* heritage indigo — brand dominant */
--gold:      #C8A24B   /* brass/gold — primary accent */
--gold-soft: #E3C987
--saffron:   #E08A2B   /* marigold — used sparingly */
--parchment: #F4EDE0   /* warm page background */
--card:      #FBF8F2
--text:      #20283A
--muted:     #5B6478
--line:      #E4DBCB
```

**Type:** Display = **Fraunces** (literary serif, weights 400–700). Body = **Manrope**
(400–800). Load via `next/font`.

**Signature motif:** a **jali** (Gujarati perforated-lattice) SVG pattern used as a subtle
overlay on dark sections and as section texture. A repeating interlocking-octagon tile at
low opacity (~0.1–0.18).

**Motion:** restrained. Scroll-reveal (IntersectionObserver, fade + 22px rise), hover lifts
on cards, slow Ken-Burns on the hero. Always respect `prefers-reduced-motion`.

**Reference:** I have a working single-file React mockup of the homepage with the exact look,
the video-hero pattern, audience cards, and a stories carousel. I'll paste it into the repo as
`/reference/homepage-mockup.jsx` — match its visual language, but re-architect it properly into
components, Server Components, and real data (don't just copy the file).

---

## Sitemap & page specs

1. **Home** — video hero → audience quick-entry cards → welcome/about teaser → principal's
   message → academics overview → facilities grid → stories carousel → news & events →
   heritage timeline → admissions CTA → footer.
2. **About** — heritage story, the 153-year timeline (expanded), vision/ethos, the Sri Gujarati
   Vidhyalaya Association, principal's full message.
3. **Academics** — the streams (Foundation → Primary → Secondary → Higher Secondary), with
   Plus One/Plus Two streams (Science / Commerce / Humanities).
4. **Admissions** — process, eligibility, key dates, fee overview, **enquiry form**,
   **downloadable prospectus PDF**.
5. **Facilities** — labs, library, swimming pool, transport, medical, play courts, auditorium.
6. **Campus Life** — photo galleries (albums) + video stories + sports & arts.
7. **News & Events** — list + detail pages, dated, with an events view.
8. **Contact** — address, phone, email, embedded map, contact form.

Phone: `0495 236 5215` · Address: `7Q3C+7CR, Beach Road, Mananchira, Kozhikode, Kerala 673032`

---

## Content model (Supabase / Prisma)

Editable by non-technical office staff via a custom admin, so model these as tables:

- `news` — id, title, slug, excerpt, body (rich text), cover_image, published_at, is_published
- `events` — id, title, slug, description, starts_at, ends_at, location, cover_image
- `gallery_albums` — id, title, slug, cover_image, created_at
- `gallery_images` — id, album_id (fk), cloudinary_id, caption, sort_order
- `stories` — id, title, caption, youtube_url (or cloudinary_id), thumbnail, sort_order
- `enquiries` — id, parent_name, child_name, grade_interest, phone, email, message,
  created_at, status (new/contacted/closed)
- `settings` — single row: phone, email, address, admissions_open (bool), hero_video_url,
  prospectus_pdf_url, social links

Stable content (facilities list, academic streams, principal bio) can be hardcoded in config
for v1. Optionally add a `pages` table later if staff need to edit About/principal copy.

---

## Architecture

- **Public pages** are Server Components fetching from Supabase via Prisma at request/build
  time. Use **on-demand revalidation** (`revalidatePath`/`revalidateTag`) triggered from the
  admin so new posts appear without a redeploy.
- **Admin** under a route group `/admin`, protected by **Supabase Auth** (email allow-list for
  staff). CRUD for news, events, gallery, stories, settings + an **enquiry inbox**.
- **Enquiry form:** validate (zod), insert into `enquiries`, then fire a **Resend**
  notification to the office inbox. Server Action, with success/error states and spam honeypot.
- **Media:** hero loop + gallery images through **Cloudinary** (`next-cloudinary`); longer
  story videos as **YouTube embeds** (lite-youtube-embed for performance).
- Prisma **singleton** client. A consistent API/Server-Action response helper. Typed env vars.

### Video hero (important — this is the look the client asked for)

A full-bleed UniTrento-style hero:
```
<section> 
  <video autoPlay muted loop playsInline poster={posterUrl}>   // object-fit: cover
    <source src={heroVideoUrl} type="video/mp4" />
  </video>
  <div className="scrim" />        // dark left-to-right + bottom gradient for legibility
  <div className="content">…headline, sub, CTAs, scroll cue…</div>
</section>
```
Requirements: muted+loop+playsInline so it autoplays on mobile; a `poster` image to avoid
flash; serve a compressed H.264 MP4 (~5–8 MB) via Cloudinary with a WebM fallback; lazy-init
and pause when offscreen; **graceful fallback** to a static gradient + jali layer if the video
fails or reduced-motion is set. The video URL comes from `settings.hero_video_url`.

---

## Standards (non-negotiable for v1)

- **SEO:** per-page metadata, Open Graph, `sitemap.xml`, `robots.txt`, and **JSON-LD**
  (`School` / `EducationalOrganization`) with name, founding date 1873, address, phone, geo.
  Optimise for local search ("school in Kozhikode / Calicut / Mananchira").
- **Performance:** Lighthouse ≥ 90 on mobile. Optimised images (`next/image` + Cloudinary),
  font-display swap, minimal JS on public pages, lazy media.
- **Accessibility:** semantic HTML, keyboard nav, visible focus, alt text, colour-contrast AA,
  reduced-motion support.
- **Responsive:** mobile-first; test 360px → 1440px.

---

## Assumptions & flags (confirm before/early — don't block Phase 1)

- **Board/affiliation:** treating this as **Kerala state syllabus** (current site says
  "Government recognised, English medium"). If it's **CBSE**, flag it — CBSE requires
  mandatory-disclosure pages, which adds to the sitemap.
- **Language:** **English-only** for v1. Architect so Malayalam can be added later (next-intl
  ready) without a rewrite.
- **Domain/email:** existing domain `srigujaratividhyalaya.com`; assume we'll get DNS access
  and a real office inbox to forward enquiries to. Use a placeholder env var until confirmed.

---

## Build phases (stop for review after each)

**Phase 0 — Foundations**
Repo init, TypeScript/Next 15/Tailwind v4, fonts, design tokens, `next/font`, lint/format,
`CLAUDE.md` + `TODO.md`, Supabase project, Prisma schema + migrations + seed data, env setup,
shared layout (nav, mobile drawer, footer), jali component, Reveal component.

**Phase 1 — Public site**
All 8 pages built against Supabase, including the **video hero**, **audience cards**,
**stories carousel**, **news/events list+detail**, **galleries**, and the **admissions enquiry
form** (Server Action + Resend). Match the design reference.

**Phase 2 — Admin**
Supabase Auth (staff allow-list), `/admin` dashboard, CRUD for all content types, settings
editor, enquiry inbox with status, on-demand revalidation hooks.

**Phase 3 — Polish**
SEO/JSON-LD/sitemap, performance + accessibility passes, analytics (Vercel/Plausible),
404/500 pages, load in real content, full device QA.

**Phase 4 — Launch**
Domain cutover plan, redirects from old WordPress URLs, Google Business profile notes, and a
one-page "How to post a notice" guide for the office so they're self-sufficient.

## Definition of done (v1)

Eight responsive pages live on the domain; office staff can post news/events, manage galleries
and stories, edit settings, and read enquiries without touching code; enquiry form emails the
office and stores submissions; Lighthouse ≥ 90 mobile; valid JSON-LD; the hero plays the
school's campus loop with a clean fallback.

---

### First task for Claude Code
Read this brief, then propose: (1) the repo/folder structure, (2) the final Prisma schema, and
(3) your Phase 0 plan. Wait for my go-ahead before scaffolding.
