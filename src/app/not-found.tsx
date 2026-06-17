import Link from "next/link";
import { Jali } from "@/components/patterns/Jali";

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-indigo px-4 text-parchment">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <Jali color="var(--gold)" />
      </div>
      <div className="relative text-center">
        <p className="font-display text-6xl font-semibold text-gold-soft">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-parchment/80">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-gold px-6 py-3 font-semibold text-ink transition-colors hover:bg-gold-soft"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-parchment/30 px-6 py-3 font-semibold text-parchment hover:bg-parchment/10"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
