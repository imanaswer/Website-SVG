"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NAV_LINKS, SCHOOL_NAME } from "@/lib/nav";

/**
 * Site header. Overlays the hero like the design reference: transparent with
 * light text at the top of the page, transitioning to a solid parchment bar
 * once scrolled. Slim wordmark + primary nav on desktop; a MENU button opens a
 * full-height drawer on mobile with Escape-to-close and a focus trap.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Solid background once the user scrolls past the hero edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Drawer keyboard: Escape closes; Tab is trapped within the panel.
  useEffect(() => {
    if (!open) return;
    const panel = drawerRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  // Light (over-hero) vs solid (scrolled) treatment.
  const solid = scrolled || open;
  const headerClass = solid
    ? "border-line bg-parchment/90 shadow-[0_1px_24px_-12px_rgba(15,27,54,0.5)] backdrop-blur-md"
    : "border-transparent bg-transparent";
  const wordmarkText = solid ? "text-indigo" : "text-parchment";
  // Full literal class strings (Tailwind only generates classes it sees verbatim).
  const navIdle = solid ? "text-muted hover:text-indigo" : "text-parchment/85 hover:text-parchment";
  const navActive = solid
    ? "text-indigo underline decoration-gold decoration-2 underline-offset-8"
    : "text-parchment underline decoration-gold decoration-2 underline-offset-8";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${headerClass}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3" aria-label={`${SCHOOL_NAME} — home`}>
          <span
            aria-hidden
            className="grid h-10 w-10 place-items-center rounded-full bg-indigo font-display text-lg font-semibold text-gold-soft ring-1 ring-gold/40"
          >
            SGV
          </span>
          <span className={`hidden font-display text-lg leading-tight font-semibold sm:block ${wordmarkText}`}>
            {SCHOOL_NAME}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href) ? navActive : navIdle
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admissions"
                className="ml-2 rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-lg hover:shadow-gold/30 motion-reduce:transform-none"
              >
                Enquire
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold lg:hidden ${
            solid ? "bg-indigo text-parchment" : "border border-parchment/40 text-parchment"
          }`}
          aria-expanded={open}
          aria-controls="mobile-drawer"
        >
          Menu
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer — portaled to <body> so the header's backdrop-blur
          (backdrop-filter makes the header a containing block for fixed
          descendants) can't trap this fixed overlay to the header's height. */}
      {open && createPortal(
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu" id="mobile-drawer">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/60"
            onClick={close}
            tabIndex={-1}
          />
          <div
            ref={drawerRef}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-parchment p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-indigo">{SCHOOL_NAME}</span>
              <button
                type="button"
                data-autofocus
                onClick={close}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full text-indigo hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-6">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`block border-b border-line py-3 font-display text-xl ${
                        isActive(link.href) ? "text-indigo" : "text-text"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/admissions"
              onClick={close}
              className="mt-6 rounded-full bg-indigo px-5 py-3 text-center font-semibold text-parchment"
            >
              Enquire about admissions
            </Link>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
