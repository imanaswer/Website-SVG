"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/actions/admin/auth";

const initial: LoginState = {};

/** Email + password sign-in form for the single admin. */
export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(login, initial);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="email" className="text-sm font-medium text-text">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1.5 w-full rounded-lg border border-line bg-parchment px-3.5 py-2.5 text-text outline-none focus:border-indigo"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-text">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-lg border border-line bg-parchment px-3.5 py-2.5 text-text outline-none focus:border-indigo"
        />
      </div>
      {state.error && (
        <p className="text-sm text-danger" role="alert">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-indigo px-5 py-2.5 font-semibold text-parchment transition-colors hover:bg-ink disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
