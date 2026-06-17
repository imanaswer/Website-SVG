import Link from "next/link";
import { Jali } from "@/components/patterns/Jali";
import { NAV_LINKS, SCHOOL_FULL_NAME, SCHOOL_TAGLINE } from "@/lib/nav";

/** Site footer — dark indigo with a subtle jali overlay. */
export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-indigo text-parchment">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <Jali color="var(--gold)" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold text-gold-soft">{SCHOOL_FULL_NAME}</p>
          <p className="mt-2 text-sm text-parchment/70">{SCHOOL_TAGLINE}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold tracking-wide text-gold uppercase">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-parchment/80 hover:text-gold-soft">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="text-sm font-semibold tracking-wide text-gold uppercase">Contact</h2>
          <address className="mt-4 space-y-2 not-italic text-parchment/80">
            <p>7Q3C+7CR, Beach Road, Mananchira,<br />Kozhikode, Kerala 673032</p>
            <p>
              <a href="tel:+914952365215" className="hover:text-gold-soft">
                0495 236 5215
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="relative border-t border-parchment/15">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-parchment/60 sm:px-6">
          © {new Date().getFullYear()} {SCHOOL_FULL_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
