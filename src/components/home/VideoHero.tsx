"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Jali } from "@/components/patterns/Jali";

/** SSR-safe read of the prefers-reduced-motion media query. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Full-bleed hero (UniTrento-style). Autoplays a muted, looping campus video
 * behind a legibility scrim and the headline/CTAs.
 *
 * Graceful by design: with no `videoUrl`, or when prefers-reduced-motion is
 * set, or if the video errors, it shows a heritage gradient + jali layer
 * instead — never a blank flash. The video also pauses when scrolled offscreen
 * (and an extra webm source can be supplied for smaller payloads).
 */
export function VideoHero({
  videoUrl,
  webmUrl,
  posterUrl,
  children,
}: {
  videoUrl?: string | null;
  webmUrl?: string | null;
  posterUrl?: string | null;
  children: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const showVideo = Boolean(videoUrl) && !reducedMotion && !videoFailed;

  // Pause when offscreen to save battery / CPU.
  useEffect(() => {
    if (!showVideo) return;
    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [showVideo]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-dvh items-end overflow-hidden bg-ink"
    >
      {/* Media layer */}
      <div className="absolute inset-0 -z-10">
        {/* Always-present heritage gradient + jali (also the no-video fallback). */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-indigo to-ink" />
        <div className="absolute inset-0 opacity-[0.16]">
          <Jali color="var(--gold)" />
        </div>
        {showVideo && videoUrl && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl ?? undefined}
            onError={() => setVideoFailed(true)}
          >
            {webmUrl && <source src={webmUrl} type="video/webm" />}
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        {/* Scrim: darken left→right and bottom for headline legibility. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      </div>

      {/* Hairline of gold light along the bottom edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
        {children}
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
        <span className="flex flex-col items-center gap-1 text-parchment/70">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </section>
  );
}
