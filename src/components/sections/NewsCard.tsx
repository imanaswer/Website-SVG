import Link from "next/link";
import type { News } from "@prisma/client";
import { formatDate } from "@/lib/format";

/** News summary card linking to the detail page. */
export function NewsCard({ item }: { item: News }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition-shadow hover:shadow-md">
      <div className="aspect-[16/9] overflow-hidden bg-indigo/10">
        {item.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- cover may be an external/Cloudinary URL
          <img
            src={item.coverImage}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo/15 to-gold/15" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {item.publishedAt && (
          <time className="text-xs font-semibold tracking-wide text-gold-deep uppercase" dateTime={new Date(item.publishedAt).toISOString()}>
            {formatDate(item.publishedAt)}
          </time>
        )}
        <h3 className="mt-2 font-display text-lg font-semibold text-indigo">
          <Link href={`/news/${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        {item.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted">{item.excerpt}</p>}
      </div>
    </article>
  );
}
