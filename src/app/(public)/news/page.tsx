import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/motion/Reveal";
import { NewsCard } from "@/components/sections/NewsCard";
import { EventCard } from "@/components/sections/EventCard";
import { getPublishedNews, getUpcomingEvents } from "@/server/data";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Latest news and upcoming events from Sri Gujarati Vidhyalaya, Mananchira, Kozhikode.",
};

export default async function NewsPage() {
  const [news, events] = await Promise.all([getPublishedNews(), getUpcomingEvents()]);

  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="What's happening at the school"
        intro="Announcements, achievements and upcoming events from across the campus."
      />

      {/* Upcoming events */}
      <Section tone="card">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Events" title="Upcoming events" />
          </Reveal>
          {events.length > 0 ? (
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 60}>
                  <EventCard item={item} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="mt-8 rounded-lg border border-line bg-parchment px-4 py-6 text-muted">
              There are no upcoming events scheduled right now. Please check back soon.
            </p>
          )}
        </Container>
      </Section>

      {/* News list */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="News" title="Latest news" />
          </Reveal>
          {news.length > 0 ? (
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 60}>
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="mt-8 rounded-lg border border-line bg-card px-4 py-6 text-muted">
              School news will be published here. Please check back soon.
            </p>
          )}
        </Container>
      </Section>
    </>
  );
}
