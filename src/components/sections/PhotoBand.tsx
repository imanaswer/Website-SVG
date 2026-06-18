import Image from "next/image";
import { Container } from "@/components/ui/layout";
import { Parallax } from "@/components/motion/Parallax";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { PHOTO_BAND } from "@/content/media";

/**
 * Full-bleed photographic band with a short overlaid line. Breaks up the
 * text-heavy sections with a single strong image. Uses gentle parallax (opted
 * out of scroll-snap by the caller) and an ink scrim so the text stays legible.
 */
export function PhotoBand({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div data-no-snap className="relative h-[60vh] min-h-[26rem] overflow-hidden bg-ink">
      <Parallax aria-hidden className="absolute inset-x-0 -inset-y-[12%]" speed={70}>
        <Image
          src={PHOTO_BAND.src}
          alt={PHOTO_BAND.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/30"
      />
      <Container className="relative flex h-full items-end pb-14 lg:pb-20">
        <MotionReveal className="max-w-2xl">
          <p className="text-[0.8125rem] font-semibold tracking-[0.2em] text-gold-soft uppercase">
            {eyebrow}
          </p>
          <p className="mt-3 font-display text-[1.75rem] font-semibold leading-tight text-parchment sm:text-4xl lg:text-[2.4rem] lg:leading-[1.12]">
            {title}
          </p>
        </MotionReveal>
      </Container>
    </div>
  );
}
