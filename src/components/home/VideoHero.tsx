"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  m,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
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
 * Full-bleed hero. Autoplays a muted, looping campus video behind a legibility
 * scrim and the headline/CTAs.
 *
 * Motion: the media + jali drift on a gentle scroll-linked parallax, a gold
 * shimmer sweeps the bottom hairline once on load, and the scroll cue bobs.
 * All of it is suppressed under reduced-motion.
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
  const reduce = useReducedMotion();
  const showVideo = Boolean(videoUrl) && !reducedMotion && !videoFailed;

  // Scroll-linked parallax: media drifts down a touch as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "14%"]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

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
      data-no-snap
      className="relative isolate flex min-h-dvh items-end overflow-hidden bg-ink"
    >
      {/* Media layer */}
      <div className="absolute inset-0 -z-10">
        {/* Parallax group: gradient + jali + video drift together (overscanned
            so the drift never exposes an edge). */}
        <m.div style={{ y: mediaY }} className="absolute -inset-y-[12%] inset-x-0">
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
        </m.div>
        {/* Scrim: darken left→right and bottom for headline legibility. Kept
            outside the parallax group so legibility never drifts. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      </div>

      {/* Hairline of gold light along the bottom edge + a one-time shimmer sweep. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px overflow-hidden bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      >
        {!reduce && (
          <m.span
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-gold-soft to-transparent"
            initial={{ x: "0%" }}
            animate={{ x: "450%" }}
            transition={{ duration: 2.4, ease: "easeInOut", delay: 1.1 }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
        {children}
      </div>

      {/* Scroll cue */}
      <m.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center"
      >
        <span className="flex flex-col items-center gap-1 text-parchment/70">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <m.svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </m.svg>
        </span>
      </m.div>
    </section>
  );
}
