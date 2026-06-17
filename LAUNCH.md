# Launch checklist

Go-live runbook for **srigujaratividhyalaya.com**. Detailed guides live in
[`docs/launch/`](./docs/launch/).

## Pre-launch
- [ ] Crawl the **old WordPress site**; record every live URL
  ([domain-cutover.md](./docs/launch/domain-cutover.md) §0)
- [ ] Add real old→new mappings to `redirects()` in [`next.config.ts`](./next.config.ts)
- [ ] Supabase project created; **`prisma migrate deploy`** run against it
- [ ] Supabase **email/SMTP enabled** (magic links must deliver)
- [ ] `ADMIN_ALLOWLIST` set to real staff emails
- [ ] Cloudinary cloud name + media uploaded; real **hero video URL** set in Settings
- [ ] Resend API key + verified sender domain; `ENQUIRY_NOTIFY_EMAIL` = office inbox
- [ ] All env vars set in **Vercel** (Production), incl. `NEXT_PUBLIC_SITE_URL`
- [ ] Lower old domain **DNS TTL** to 300s, 24–48h ahead
- [ ] Replace remaining `TODO(...)` content (principal name/photo, fees, dates,
      faculty, Association details, timeline years)

## Quality gates (on a Vercel preview)
- [ ] `npm run build` and `npm run lint` pass
- [ ] **Lighthouse mobile ≥ 90** (Performance, Accessibility, Best Practices, SEO)
- [ ] Responsive check 360px → 1440px; reduced-motion; keyboard nav + visible focus
- [ ] JSON-LD validates ([Rich Results Test](https://search.google.com/test/rich-results))

## Cutover
- [ ] Add domain in Vercel; point registrar DNS to Vercel; SSL issued
- [ ] Home + all 8 pages load over HTTPS on the real domain
- [ ] 5–10 **old URLs redirect** correctly (308) to new pages
- [ ] `/sitemap.xml` + `/robots.txt` resolve with the real domain

## Post-launch verification
- [ ] **Magic-link sign-in** works → lands on `/admin` (not back to login)
- [ ] Unauthenticated `/admin/news` redirects to login; non-allow-listed email rejected
- [ ] Enquiry form **stores a row AND emails** the office
- [ ] Posting news in `/admin` appears on `/news` (revalidation)
- [ ] Google **Search Console** verified + sitemap submitted
      ([google-business.md](./docs/launch/google-business.md))
- [ ] Google **Business Profile** claimed/created + verified; NAP consistent
- [ ] Hand the office [how-to-post-a-notice.md](./docs/launch/how-to-post-a-notice.md)

## Safety
- [ ] **Keep the old WordPress site live for ≥ 30 days** (rollback path)
- [ ] Confirm rollback = repoint DNS to old host (TTL is low)
