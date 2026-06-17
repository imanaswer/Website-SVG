"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const supabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";
  const errorParam = params.get("error");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const supabase = createSupabaseBrowserClient();
      const redirectTo = `${window.location.origin}/admin/auth/callback?next=${encodeURIComponent(next)}`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage("Could not send the sign-in link. Please try again.");
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-parchment px-4">
      <div className="w-full max-w-md rounded-2xl border border-line bg-card p-8 shadow-sm">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-indigo font-display text-lg font-semibold text-gold-soft">
          SGV
        </span>
        <h1 className="mt-5 font-display text-2xl font-semibold text-indigo">Staff sign-in</h1>
        <p className="mt-2 text-sm text-muted">
          Enter your staff email and we&rsquo;ll send you a secure sign-in link.
        </p>

        {!supabaseConfigured && (
          <p className="mt-4 rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text">
            Supabase is not configured yet. Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable sign-in.
          </p>
        )}

        {errorParam === "not-allowed" && (
          <p className="mt-4 rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text" role="alert">
            That email is not authorised for the admin area.
          </p>
        )}

        {status === "sent" ? (
          <div className="mt-6 rounded-lg border border-gold/40 bg-parchment p-4" role="status">
            <p className="font-medium text-indigo">Check your email</p>
            <p className="mt-1 text-sm text-muted">
              We&rsquo;ve sent a sign-in link to <strong>{email}</strong>. Open it on this device.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-text">
                Staff email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!supabaseConfigured || status === "sending"}
                className="mt-1.5 w-full rounded-lg border border-line bg-parchment px-3.5 py-2.5 text-text outline-none focus:border-indigo"
              />
            </div>
            {status === "error" && (
              <p className="text-sm text-danger" role="alert">
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={!supabaseConfigured || status === "sending"}
              className="w-full rounded-full bg-indigo px-5 py-2.5 font-semibold text-parchment transition-colors hover:bg-ink disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send sign-in link"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
