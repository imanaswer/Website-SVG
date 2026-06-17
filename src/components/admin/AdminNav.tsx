"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/actions/admin/auth";

const LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/news", label: "News" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/stories", label: "Stories" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav({ email }: { email?: string | null }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="flex h-full flex-col" aria-label="Admin">
      <div className="px-5 py-5">
        <span className="flex items-center gap-2 font-display text-lg font-semibold text-parchment">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/20 text-sm text-gold-soft">
            SGV
          </span>
          Admin
        </span>
      </div>
      <ul className="flex-1 space-y-1 px-3">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive(link.href, link.exact) ? "page" : undefined}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href, link.exact)
                  ? "bg-parchment/15 text-parchment"
                  : "text-parchment/70 hover:bg-parchment/10 hover:text-parchment"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-t border-parchment/15 px-5 py-4">
        {email && <p className="truncate text-xs text-parchment/60">{email}</p>}
        <div className="mt-2 flex flex-col gap-2">
          <Link href="/" className="text-xs text-parchment/70 hover:text-parchment">
            ← View website
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-parchment/25 px-3 py-1.5 text-xs font-semibold text-parchment hover:bg-parchment/10"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
