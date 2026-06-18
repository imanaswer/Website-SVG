import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TESTIMONIALS } from "@/content/media";

/**
 * Quote cards from the school community, each with a small avatar.
 *
 * NOTE: the quotes/names are placeholders (see TESTIMONIALS in content/media.ts)
 * and must be replaced with real, approved statements before launch.
 */
export function Testimonials() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <Reveal as="li" key={t.quote} delay={i * 70}>
          <figure className="card-rise flex h-full flex-col rounded-2xl border border-line bg-card p-7">
            <Icon name="quote" className="h-7 w-7 text-gold/60" />
            <blockquote className="mt-4 flex-1 text-[0.975rem] leading-relaxed text-text">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <Image
                src={t.avatar.src}
                alt={t.avatar.alt}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover ring-1 ring-gold/20"
              />
              <span>
                <span className="block font-display text-sm font-semibold text-indigo">
                  {t.name}
                </span>
                <span className="block text-xs text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
