import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { Icon } from "@/components/ui/Icon";
import { getEventBySlug, getUpcomingEvents } from "@/server/data";
import { formatDateTime } from "@/lib/format";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const events = await getUpcomingEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getEventBySlug(slug);
  if (!item) return { title: "Event" };
  return { title: item.title, description: item.description };
}

export default async function EventPage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = await getEventBySlug(slug);
  if (!item) notFound();

  return (
    <article className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-indigo"
        >
          <Icon name="chevron-left" className="h-4 w-4" />
          Back to News & Events
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold text-indigo sm:text-4xl">
          {item.title}
        </h1>

        <dl className="mt-6 space-y-2 text-muted">
          <div className="flex items-center gap-2">
            <Icon name="calendar" className="h-5 w-5 shrink-0 text-gold" />
            <dd>
              {formatDateTime(item.startsAt)}
              {item.endsAt ? ` – ${formatDateTime(item.endsAt)}` : ""}
            </dd>
          </div>
          {item.location && (
            <div className="flex items-center gap-2">
              <Icon name="map-pin" className="h-5 w-5 shrink-0 text-gold" />
              <dd>{item.location}</dd>
            </div>
          )}
        </dl>

        {item.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element -- cover may be an external/Cloudinary URL
          <img
            src={item.coverImage}
            alt=""
            className="mt-8 w-full rounded-xl border border-line object-cover"
          />
        )}

        <div className="mt-8 text-lg leading-relaxed text-text">
          <p>{item.description}</p>
        </div>
      </Container>
    </article>
  );
}
