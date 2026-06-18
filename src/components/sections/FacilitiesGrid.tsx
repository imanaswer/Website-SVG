import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { FACILITIES } from "@/content/facilities";
import { FACILITY_IMAGES } from "@/content/media";

/**
 * Grid of campus facilities. Used on the home page (preview) and Facilities page.
 * Pass `withImages` for the photo-topped card variant (home preview); omit it for
 * the compact icon-only cards.
 */
export function FacilitiesGrid({
  limit,
  withImages = false,
}: {
  limit?: number;
  withImages?: boolean;
}) {
  const items = limit ? FACILITIES.slice(0, limit) : FACILITIES;

  if (withImages) {
    return (
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((f, i) => {
          const img = FACILITY_IMAGES[f.name];
          return (
            <Reveal as="li" key={f.name} delay={i * 60}>
              <div className="card-rise group h-full overflow-hidden rounded-2xl border border-line bg-card">
                <div className="relative aspect-[4/3] overflow-hidden bg-parchment">
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                {/* Icon chip overlaps the image/text seam — kept outside the
                    image's overflow-hidden box so it isn't clipped. */}
                <div className="px-7 pb-7">
                  <span className="-mt-6 mb-3 grid h-12 w-12 place-items-center rounded-full bg-card text-indigo shadow-sm ring-1 ring-gold/25">
                    <Icon name={f.icon} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-indigo">{f.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((f, i) => (
        <Reveal as="li" key={f.name} delay={i * 60}>
          <div className="card-rise group h-full overflow-hidden rounded-2xl border border-line bg-card p-7">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-indigo/[0.06] text-indigo ring-1 ring-gold/20 transition-colors group-hover:bg-gold/10 group-hover:text-gold-deep">
              <Icon name={f.icon} />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold text-indigo">{f.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
