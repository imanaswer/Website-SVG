/**
 * Self-contained admin session token — a minimal signed token (HS256-style).
 *
 * Works in BOTH the Edge runtime (middleware) and Node (server actions / RSC)
 * because it uses only Web Crypto (`crypto.subtle`) and `btoa`/`atob` /
 * `TextEncoder`, all of which are global in both runtimes. No `next/headers`,
 * no `server-only` — so middleware can import it.
 *
 * Token = `base64url(payload) "." base64url(hmacSHA256(payload, secret))`.
 * There is no algorithm field, so there is no alg-confusion surface; the
 * signature is verified with `subtle.verify` (constant-time).
 */

export const SESSION_COOKIE = "sgv_admin_session";
export const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

type Payload = { sub: string; iat: number; exp: number };

const decoder = new TextDecoder();

/** UTF-8 encode into a fresh ArrayBuffer-backed view (satisfies BufferSource). */
function enc(s: string): Uint8Array<ArrayBuffer> {
  const src = new TextEncoder().encode(s);
  const out = new Uint8Array(new ArrayBuffer(src.length));
  out.set(src);
  return out;
}

function bytesToB64url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlToBytes(b64url: string): Uint8Array<ArrayBuffer> {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    b64url.length + ((4 - (b64url.length % 4)) % 4),
    "=",
  );
  const binary = atob(b64);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** Sign a session token for `email`, valid for `maxAgeSec` seconds. */
export async function createSessionToken(
  email: string,
  secret: string,
  maxAgeSec: number = DEFAULT_MAX_AGE,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: Payload = { sub: email, iat: now, exp: now + maxAgeSec };
  const payloadB64 = bytesToB64url(enc(JSON.stringify(payload)));
  const key = await hmacKey(secret);
  const sig = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, enc(payloadB64)),
  );
  return `${payloadB64}.${bytesToB64url(sig)}`;
}

/**
 * Verify a token's signature and expiry. Returns the admin email on success,
 * or `null` for any malformed / tampered / expired token.
 */
export async function verifySessionToken(
  token: string | undefined | null,
  secret: string,
): Promise<{ email: string } | null> {
  if (!token || !secret) return null;
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);

  let valid = false;
  try {
    const key = await hmacKey(secret);
    valid = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlToBytes(sigB64),
      enc(payloadB64),
    );
  } catch {
    return null;
  }
  if (!valid) return null;

  try {
    const payload = JSON.parse(decoder.decode(b64urlToBytes(payloadB64))) as Payload;
    if (!payload.sub || typeof payload.exp !== "number") return null;
    if (Math.floor(Date.now() / 1000) >= payload.exp) return null;
    return { email: payload.sub };
  } catch {
    return null;
  }
}
