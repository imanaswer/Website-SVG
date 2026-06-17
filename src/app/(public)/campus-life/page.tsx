import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/motion/Reveal";
import { StoriesCarousel } from "@/components/home/StoriesCarousel";
import { getGalleryAlbums, getStories } from "@/server/data";
import { cloudinaryImageUrl } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "Campus Life",
  description:
    "Photo galleries, video stories, sports and arts at Sri Gujarati Vidhyalaya, Kozhikode.",
};

export default async function CampusLifePage() {
  const [albums, stories] = await Promise.all([getGalleryAlbums(), getStories()]);

  return (
    <>
      <PageHero
        eyebrow="Campus Life"
        title="Life beyond the classroom"
        intro="Photo albums, video stories, and the sports and arts that shape everyday life on campus."
      />

      {/* Photo albums */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Galleries" title="Photo albums" />
          </Reveal>
          {albums.length > 0 ? (
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album, i) => {
                const cover = cloudinaryImageUrl(album.coverImage, { width: 600, height: 400 });
                return (
                  <Reveal as="li" key={album.id} delay={i * 60}>
                    <Link
                      href={`/campus-life/${album.slug}`}
                      className="group relative block overflow-hidden rounded-xl border border-line bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <div className="aspect-[3/2] overflow-hidden">
                        {cover ? (
                          // eslint-disable-next-line @next/next/no-img-element -- Cloudinary delivery URL
                          <img
                            src={cover}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-indigo/20 to-gold/20" />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg font-semibold text-indigo">{album.title}</h3>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          ) : (
            <p className="mt-8 rounded-lg border border-line bg-card px-4 py-6 text-muted">
              Photo albums from around the school will appear here soon.
            </p>
          )}
        </Container>
      </Section>

      {/* Video stories */}
      <Section tone="card">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Stories" title="Video stories" />
          </Reveal>
          <div className="mt-8">
            <StoriesCarousel
              stories={stories.map((s) => ({
                id: s.id,
                title: s.title,
                caption: s.caption,
                youtubeUrl: s.youtubeUrl,
                thumbnail: s.thumbnail,
              }))}
            />
          </div>
        </Container>
      </Section>

      {/* Sports & arts */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <SectionHeading eyebrow="Sports & Arts" title="Room to grow, on every stage" />
              <p className="mt-5 text-lg leading-relaxed text-text">
                From the swimming pool and play courts to music, drama and the arts, students
                find many ways to discover their talents and represent the school.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
