import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { Icon } from "@/components/ui/Icon";
import { getAlbumBySlug, getGalleryAlbums } from "@/server/data";
import { cloudinaryImageUrl } from "@/lib/cloudinary";

type Params = Promise<{ albumSlug: string }>;

export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((a) => ({ albumSlug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { albumSlug } = await params;
  const album = await getAlbumBySlug(albumSlug);
  if (!album) return { title: "Gallery" };
  return { title: album.title, description: `Photo album: ${album.title}` };
}

export default async function AlbumPage({ params }: { params: Params }) {
  const { albumSlug } = await params;
  const album = await getAlbumBySlug(albumSlug);
  if (!album) notFound();

  return (
    <article className="py-14 sm:py-20">
      <Container>
        <Link
          href="/campus-life"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-indigo"
        >
          <Icon name="chevron-left" className="h-4 w-4" />
          Back to Campus Life
        </Link>

        <h1 className="mt-6 font-display text-3xl font-semibold text-indigo sm:text-4xl">
          {album.title}
        </h1>

        {album.images.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {album.images.map((img) => {
              const src = cloudinaryImageUrl(img.cloudinaryId, { width: 600, height: 600 });
              return (
                <li key={img.id} className="overflow-hidden rounded-lg border border-line bg-card">
                  <figure>
                    <div className="aspect-square overflow-hidden">
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element -- Cloudinary delivery URL
                        <img
                          src={src}
                          alt={img.caption ?? ""}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-indigo/15 to-gold/15" />
                      )}
                    </div>
                    {img.caption && (
                      <figcaption className="px-3 py-2 text-xs text-muted">{img.caption}</figcaption>
                    )}
                  </figure>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-8 rounded-lg border border-line bg-card px-4 py-6 text-muted">
            Photos for this album will be added soon.
          </p>
        )}
      </Container>
    </article>
  );
}
