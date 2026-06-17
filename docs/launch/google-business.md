# Google Business Profile & search setup

Getting the school found for searches like *"school in Kozhikode"*,
*"English medium school Calicut"*, and *"Sri Gujarati Vidhyalaya"*.

---

## 1. Google Search Console (do at launch)

1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Add a **Domain property** for `srigujaratividhyalaya.com` (verify via the DNS
   TXT record — the registrar where you set the Vercel records).
3. **Submit the sitemap**: `https://srigujaratividhyalaya.com/sitemap.xml`.
4. After a few days, check **Coverage / Pages** for indexing and the
   **Performance** report for search queries.
5. If old URLs are still indexed, that's fine — the 308 redirects pass their
   ranking to the new pages. Use **URL Inspection** to request indexing of key
   new pages (home, admissions, about).

The JSON-LD `School` structured data (already on every page) helps Google
understand the school's name, founding year, address and contact details.

---

## 2. Google Business Profile (Maps & local pack)

This is what shows the school in Google Maps and the local "3-pack".

1. Go to [business.google.com](https://business.google.com).
2. Search for "Sri Gujarati Vidhyalaya" — if a listing already exists, **claim**
   it; otherwise **create** it.
3. Category: **School** (add "Higher secondary school" if available).
4. Enter details **exactly** as on the website (this NAP consistency matters):
   - **Name:** Sri Gujarati Vidhyalaya Higher Secondary School
   - **Address:** 7Q3C+7CR, Beach Road, Mananchira, Kozhikode, Kerala 673032
   - **Phone:** 0495 236 5215
   - **Website:** https://srigujaratividhyalaya.com
5. Verify ownership (postcard, phone, or email — Google chooses).
6. Add photos (campus, building, classrooms), hours, and a short description.
7. Keep it updated; ask happy parents for reviews.

---

## 3. NAP consistency (important for local SEO)

The **N**ame, **A**ddress, **P**hone must be **identical** everywhere they appear:
the website footer, Contact page, Google Business Profile, and any directories.
The site reads these from a single source (the `Settings` row / config), so update
them in **Admin → Settings** and they change site-wide.

---

## 4. Other local directories (optional, helps ranking)

List the school (same NAP) on:
- JustDial, Sulekha (popular in India)
- Local Kozhikode / Kerala school directories
- The school's social profiles (link them in Admin → Settings so they appear in
  the JSON-LD `sameAs`).

---

## 5. Quick wins checklist

- [ ] Search Console verified + sitemap submitted
- [ ] Google Business Profile claimed/created + verified
- [ ] NAP identical on site, Maps, and directories
- [ ] Social links added in Admin → Settings
- [ ] A few genuine parent reviews requested
