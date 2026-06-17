import type { Event } from "@prisma/client";
import { Icon } from "@/components/ui/Icon";
import { formatDateTime } from "@/lib/format";

/** Event summary card. */
export function EventCard({ item }: { item: Event }) {
  return (
    <article className="card-rise flex h-full gap-4 overflow-hidden rounded-2xl border border-line bg-card p-6">
      <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-indigo to-ink px-4 py-3 text-center text-parchment ring-1 ring-gold/25">
        <span className="font-display text-[1.75rem] font-semibold leading-none text-gold-soft">
          {new Date(item.startsAt).getDate()}
        </span>
        <span className="mt-1 text-xs tracking-[0.15em] uppercase">
          {new Date(item.startsAt).toLocaleString("en-IN", { month: "short" })}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-lg font-semibold text-indigo">{item.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <Icon name="calendar" className="h-4 w-4 shrink-0" />
          {formatDateTime(item.startsAt)}
        </p>
        {item.location && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <Icon name="map-pin" className="h-4 w-4 shrink-0" />
            {item.location}
          </p>
        )}
        {item.description && <p className="mt-2 line-clamp-2 text-sm text-muted">{item.description}</p>}
      </div>
    </article>
  );
}
