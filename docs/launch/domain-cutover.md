# Domain cutover plan

How to take the new site live on **srigujaratividhyalaya.com** with minimal
downtime and no lost search rankings. Do the steps in order.

> Roles: **Dev** = whoever deploys. **Office** = school staff. Most steps are Dev.

---

## 0. Before you touch DNS (do these first, days ahead)

1. **Crawl the OLD WordPress site** and save every live URL. This is the single
   most important pre-launch task — it drives the redirect map.
   - Use a free crawler (e.g. Screaming Frog free tier, or
     `https://www.xml-sitemaps.com`), or export the old site's `sitemap.xml`
     (often at `srigujaratividhyalaya.com/sitemap.xml` or `/wp-sitemap.xml`).
   - For each old URL, decide its new equivalent and add it to `redirects()` in
     [`next.config.ts`](../../next.config.ts) as `{ permanent: true }` (308).
     The common ones are already there; add the real ones you find.
   - Query-string URLs (e.g. `/?p=123`, `/?page_id=45`) can't be matched by path
     alone — map them with a `has` query matcher, e.g.:
     ```ts
     { source: "/", has: [{ type: "query", key: "page_id", value: "45" }],
       destination: "/about", permanent: true }
     ```

2. **Lower the DNS TTL** on the current domain's records to 300s (5 min) at least
   24–48h before cutover, so the switch propagates fast.

3. **Gather credentials** and set them in Vercel (see step 2 below).

---

## 1. Deploy to Vercel (on a temporary URL first)

1. Push the repo to GitHub and **Import Project** in Vercel.
2. Set **Environment Variables** (Production + Preview) — see `.env.example`:
   - `DATABASE_URL` (Supabase **pooled**, port 6543, `?pgbouncer=true`)
   - `DIRECT_URL` (Supabase **direct**, port 5432)
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_ALLOWLIST` (staff emails, comma-separated)
   - `NEXT_PUBLIC_SITE_URL=https://srigujaratividhyalaya.com`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (when media is ready)
   - `RESEND_API_KEY`, `ENQUIRY_NOTIFY_EMAIL`
3. **Run migrations against Supabase** (once): `npx prisma migrate deploy`
   (run locally with prod `DIRECT_URL`, or as a Vercel build/release step).
4. **Seed** initial content if desired: `npm run db:seed`.
5. Confirm the temporary `*.vercel.app` URL works end-to-end (see checklist below).

---

## 2. Connect the domain

1. In Vercel → Project → **Domains**, add `srigujaratividhyalaya.com` and
   `www.srigujaratividhyalaya.com`.
2. Update DNS at the domain registrar to Vercel's records (Vercel shows the exact
   A / CNAME values). Decide whether `www` or the apex is primary; redirect the
   other (Vercel does this automatically).
3. Wait for DNS propagation + automatic SSL issuance (usually minutes).

---

## 3. Verify immediately after cutover

Run the **Launch checklist** in [`../../LAUNCH.md`](../../LAUNCH.md). Critically:

- [ ] Home + all 8 pages load over HTTPS on the real domain.
- [ ] A handful of **old WordPress URLs 301/308-redirect** to the right new pages
      (test 5–10 from your crawl).
- [ ] `/sitemap.xml` and `/robots.txt` resolve and show the real domain.
- [ ] **Magic-link sign-in works** for a staff email and lands on `/admin`
      (not back on the login page — confirms the auth-cookie path).
- [ ] Submitting the enquiry form stores a row **and** emails the office (Resend).
- [ ] Posting a news item in `/admin` makes it appear on `/news` (revalidation).

---

## 4. Tell Google (see [`google-business.md`](./google-business.md))

- Add the property in **Google Search Console**, verify, and **submit the sitemap**.
- Use the **URL Inspection / Removals** tools if any old URLs need re-crawling.
- Keep the redirects in place **permanently** — they pass old ranking signal to
  the new pages.

---

## Rollback

If something is badly wrong, repoint DNS back to the old host (TTL is low, so this
is fast). The old WordPress site stays untouched until you're confident — **do not
delete it for at least 30 days** after cutover.
