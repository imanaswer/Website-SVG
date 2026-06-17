import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { Icon } from "@/components/ui/Icon";
import { getNewsBySlug, getPublishedNews } from "@/server/data";
import { formatDate } from "@/lib/format";

type Params = Promise<{ slug: string }>;

// No params pre-generated before creds; real slugs render on-demand (dynamicParams
// stays at its default `true`), and missing slugs hit notFound().
export async function generateStaticParams() {
  const news = await getPublishedNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return { title: "News" };
  return {
    title: item.title,
    description: item.excerpt ?? undefined,
  };
}

export default async function NewsArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
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

        <header className="mt-6">
          {item.publishedAt && (
            <time
              className="text-sm font-semibold tracking-wide text-gold-deep uppercase"
              dateTime={new Date(item.publishedAt).toISOString()}
            >
              {formatDate(item.publishedAt)}
            </time>
          )}
          <h1 className="mt-3 font-display text-3xl font-semibold text-indigo sm:text-4xl">
            {item.title}
          </h1>
          {item.excerpt && <p className="mt-4 text-lg text-muted">{item.excerpt}</p>}
        </header>

        {item.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element -- cover may be an external/Cloudinary URL
          <img
            src={item.coverImage}
            alt=""
            className="mt-8 w-full rounded-xl border border-line object-cover"
          />
        )}

        {/* Body is admin-authored rich text (HTML). */}
        <div
          className="prose-content mt-8 space-y-4 text-lg leading-relaxed text-text"
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      </Container>
    </article>
  );
}
