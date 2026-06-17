import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { FACILITIES } from "@/content/facilities";

/** Grid of campus facilities. Used on the home page (preview) and Facilities page. */
export function FacilitiesGrid({ limit }: { limit?: number }) {
  const items = limit ? FACILITIES.slice(0, limit) : FACILITIES;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((f, i) => (
        <Reveal as="li" key={f.name} delay={i * 60}>
          <div className="h-full rounded-xl border border-line bg-card p-6 transition-shadow hover:shadow-md">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-indigo/5 text-indigo">
              <Icon name={f.icon} />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-indigo">{f.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
