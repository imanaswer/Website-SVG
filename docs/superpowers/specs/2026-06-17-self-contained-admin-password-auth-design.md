# Self-Contained Admin Password Auth — Design

**Date:** 2026-06-17
**Goal:** Replace the Supabase magic-link admin login with a self-contained, single-admin
email + password login. No Supabase, no SMTP/email dependency.

## Decisions (locked with stakeholder)

- **Method:** self-contained password (drop Supabase for admin auth entirely).
- **Accounts:** single admin.
- **Password storage:** plaintext in `.env` (gitignored, server-only) — simplest for one admin.

## Environment

```
ADMIN_EMAIL=<admin email>
ADMIN_PASSWORD=<plaintext password>
AUTH_SECRET=<random 32+ char secret for signing the session cookie>
```

`adminAuthConfigured = Boolean(ADMIN_EMAIL && ADMIN_PASSWORD && AUTH_SECRET)`. When false,
the admin area shows a "not configured" notice and middleware no-ops (mirrors current
behavior so builds/dev run without creds).

## Session token

A minimal signed token (HS256-style), verifiable in both Edge (middleware) and Node:

- Payload: `{ sub: <email>, iat, exp }` (exp ≈ 7 days).
- Signature: HMAC-SHA256 over `base64url(payload)` using `AUTH_SECRET`, via Web Crypto
  `crypto.subtle.sign`/`verify` (constant-time verify, no alg field → no alg-confusion).
- Token string: `base64url(payload).base64url(sig)`.
- Cookie: name `sgv_admin_session`, **httpOnly + secure(prod) + sameSite=lax + path=/**,
  `maxAge` matching exp.

## Flow

1. `/admin/login` — server-component page rendering a password form (email + password),
   posting to the `login` server action. Errors surfaced via `useActionState`.
2. `login` action (Node): lower-case email equality + `crypto.timingSafeEqual` password
   compare against env. On success → sign token, set cookie, `redirect(next)` (next is
   sanitized to internal `/admin` paths only — no open redirect). On failure → return an
   error state ("Incorrect email or password").
3. **Middleware** (Edge, matcher `/admin/:path*`): verify cookie signature + exp; redirect
   unauthenticated users to `/admin/login?next=…`; bounce already-authed users off the
   login page to `/admin`. No-op when not configured.
4. **`requireAdmin()`** (server-only, Node): re-verify the cookie; `redirect('/admin/login')`
   if invalid; return `{ email }`. Same call sites/signature as today (~10 actions + panel
   layout), so those files are untouched apart from the import path.
5. **`signOut`** action: delete the cookie, `redirect('/admin/login')`.

## Files

- **New:** `src/lib/admin/token.ts` (sign/verify/createToken — Edge-safe, no next/headers,
  no server-only), `src/lib/admin/session.ts` (`requireAdmin`, `getAdminSession` — server-only,
  reads cookies).
- **Rewrite:** `src/app/(admin)/admin/login/page.tsx`, `src/actions/admin/auth.ts`
  (`login` + `signOut`), `middleware.ts`, `src/lib/env.ts`, `src/app/(admin)/admin/(panel)/layout.tsx`
  (config notice + `requireAdmin` import), `.env`, `.env.example`.
- **Update imports:** all `requireAdmin` importers move from `@/lib/supabase/server` to
  `@/lib/admin/session`.
- **Delete:** `src/lib/supabase/` (client/server/middleware), `src/app/(admin)/admin/auth/callback/route.ts`,
  `src/lib/auth.ts` (allow-list); remove `@supabase/ssr` + `@supabase/supabase-js` deps.
  (Prisma/DB untouched — it uses `DATABASE_URL`, not Supabase-js.)

## Security & scope notes

- Single admin → no rate-limiting/lockout this pass (low threat surface); note as future option.
- Password is plaintext in `.env`; `.env` stays gitignored. The cookie stores no password,
  only a signed token.
- `AUTH_SECRET` is required for auth to function; rotating it invalidates all sessions.
- No visual QA of the admin beyond build/lint + the login happy/sad path.
