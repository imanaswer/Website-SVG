import Link from "next/link";
import { VideoHero } from "@/components/home/VideoHero";
import { StoriesCarousel } from "@/components/home/StoriesCarousel";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Jali } from "@/components/patterns/Jali";
import { Reveal } from "@/components/motion/Reveal";
import { FacilitiesGrid } from "@/components/sections/FacilitiesGrid";
import { HeritageTimeline } from "@/components/sections/HeritageTimeline";
import { PrincipalMessage } from "@/components/sections/PrincipalMessage";
import { NewsCard } from "@/components/sections/NewsCard";
import { EventCard } from "@/components/sections/EventCard";
import { getSettings, getPublishedNews, getUpcomingEvents, getStories } from "@/server/data";
import { AUDIENCE_CARDS, SITE } from "@/content/site";
import { STAGES } from "@/content/academics";

export default async function HomePage() {
  const [settings, news, events, stories] = await Promise.all([
    getSettings(),
    getPublishedNews(3),
    getUpcomingEvents(3),
    getStories(),
  ]);

  return (
    <>
      {/* Hero */}
      <VideoHero videoUrl={settings.heroVideoUrl ?? "/media/hero-campus.mp4"}>
        <div className="max-w-2xl">
          <span aria-hidden className="gold-rule mb-6" data-inverted="true" />
          <p className="text-[0.8125rem] font-semibold tracking-[0.22em] text-gold-soft uppercase">
            Established {SITE.established}
          </p>
          <h1 className="mt-4 font-display text-[2.75rem] font-semibold leading-[1.04] text-parchment sm:text-6xl lg:text-[4.25rem]">
            A 153-year heritage of learning in the heart of Kozhikode
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-parchment/85">
            Sri Gujarati Vidhyalaya Higher Secondary School — English-medium, co-educational,
            in Mananchira. Known, challenged and cared for, generation after generation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/admissions" variant="gold" size="lg">
              Enquire about admissions
            </ButtonLink>
            <ButtonLink
              href="/about"
              size="lg"
              className="border border-parchment/30 text-parchment hover:bg-parchment/10"
            >
              Our story
            </ButtonLink>
          </div>
        </div>
      </VideoHero>

      {/* Audience quick-entry cards */}
      <Section tone="parchment" className="!py-12 lg:!py-16">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE_CARDS.map((card, i) => (
              <Reveal as="li" key={card.title} delay={i * 60}>
                <Link
                  href={card.href}
                  className="card-rise group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  <h2 className="font-display text-xl font-semibold text-indigo">{card.title}</h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{card.description}</p>
                  <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
                    {card.cta}
                    <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Welcome / about teaser */}
      <Section tone="card">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Welcome"
                title="A school shaped by 153 years of purpose"
              />
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-text">
                <p>
                  Founded in 1873 by the Gujarati community of Kozhikode, our school has
                  educated generation after generation of children in Mananchira — building
                  strong foundations in language, reasoning, character and curiosity.
                </p>
                <p>
                  Today we carry that heritage forward as a Government-recognised,
                  English-medium, co-educational school, pairing time-honoured values with
                  modern facilities and teaching.
                </p>
              </div>
              <div className="mt-7">
                <ButtonLink href="/about" variant="secondary">
                  Read our story
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <dl className="grid grid-cols-2 gap-4">
                {[
                  { k: "1873", v: "Year established" },
                  { k: "153 years", v: "Of continuous learning" },
                  { k: "LKG–XII", v: "Foundation to Higher Secondary" },
                  { k: "3 streams", v: "Science · Commerce · Humanities" },
                ].map((stat) => (
                  <div key={stat.k} className="card-rise overflow-hidden rounded-2xl border border-line bg-parchment p-6">
                    <dt className="font-display text-[1.75rem] font-semibold text-indigo">{stat.k}</dt>
                    <dd className="mt-1 text-sm text-muted">{stat.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Principal's message */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="From the Principal" title="A word of welcome" />
            <div className="mt-8">
              <PrincipalMessage variant="short" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Academics overview */}
      <Section tone="card">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Academics"
              title="A clear path from first steps to Plus Two"
              intro="A continuous journey across four stages, ending in specialised Higher Secondary streams."
            />
          </Reveal>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STAGES.map((stage, i) => (
              <Reveal as="li" key={stage.slug} delay={i * 60}>
                <div className="card-rise h-full overflow-hidden rounded-2xl border border-line bg-parchment p-7">
                  <p className="text-xs font-semibold tracking-[0.18em] text-gold-deep uppercase">{stage.grades}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-indigo">{stage.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{stage.summary}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/academics" variant="secondary">
              Explore academics
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Facilities preview */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Facilities"
              title="A campus built for learning and life"
            />
          </Reveal>
          <div className="mt-10">
            <FacilitiesGrid limit={4} />
          </div>
          <div className="mt-8">
            <ButtonLink href="/facilities" variant="secondary">
              See all facilities
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Stories carousel */}
      <Section tone="card">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Stories" title="Life at Sri Gujarati Vidhyalaya" />
          </Reveal>
          <div className="mt-10">
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

      {/* News & events */}
      <Section tone="parchment">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <Reveal>
                <SectionHeading eyebrow="News" title="Latest from the school" />
              </Reveal>
              {news.length > 0 ? (
                <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                  {news.map((item, i) => (
                    <Reveal as="li" key={item.id} delay={i * 60}>
                      <NewsCard item={item} />
                    </Reveal>
                  ))}
                </ul>
              ) : (
                <p className="mt-8 rounded-lg border border-line bg-card px-4 py-6 text-muted">
                  School news will appear here soon.
                </p>
              )}
              <div className="mt-8">
                <ButtonLink href="/news" variant="secondary">
                  All news & events
                </ButtonLink>
              </div>
            </div>
            <div>
              <Reveal>
                <SectionHeading eyebrow="Events" title="What's coming up" />
              </Reveal>
              {events.length > 0 ? (
                <ul className="mt-8 space-y-4">
                  {events.map((item, i) => (
                    <Reveal as="li" key={item.id} delay={i * 60}>
                      <EventCard item={item} />
                    </Reveal>
                  ))}
                </ul>
              ) : (
                <p className="mt-8 rounded-lg border border-line bg-card px-4 py-6 text-muted">
                  Upcoming events will be listed here.
                </p>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Heritage timeline */}
      <Section tone="card">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our heritage"
              title="153 years, briefly"
              intro="A short history of a long-standing institution."
            />
          </Reveal>
          <div className="mt-10 max-w-3xl">
            <HeritageTimeline />
          </div>
        </Container>
      </Section>

      {/* Admissions CTA */}
      <Section tone="indigo" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink via-indigo to-ink" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]">
          <Jali color="var(--gold)" />
        </div>
        <Container>
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Admissions"
                title="Join the Sri Gujarati Vidhyalaya family"
                intro={
                  settings.admissionsOpen
                    ? "Admissions are open. Submit an enquiry and our office will guide you through the process."
                    : "Enquire about admissions and our office will be in touch when applications open."
                }
                inverted
              />
            </Reveal>
            <Reveal delay={120} className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/admissions" variant="gold" size="lg">
                Start an enquiry
              </ButtonLink>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="inline-flex items-center gap-2 rounded-full border border-parchment/30 px-6 py-3 font-semibold text-parchment hover:bg-parchment/10"
              >
                <Icon name="phone" className="h-5 w-5" />
                {settings.phone}
              </a>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
