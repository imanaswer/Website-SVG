import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/motion/Reveal";
import { HeritageTimeline } from "@/components/sections/HeritageTimeline";
import { PrincipalMessage } from "@/components/sections/PrincipalMessage";

export const metadata: Metadata = {
  title: "About",
  description:
    "The heritage, vision and ethos of Sri Gujarati Vidhyalaya — a 153-year-old school in Mananchira, Kozhikode, established 1873.",
};

const ETHOS = [
  {
    title: "Strong foundations",
    body: "We build genuine understanding in language, reasoning and the core disciplines — the groundwork for everything that follows.",
  },
  {
    title: "Character & curiosity",
    body: "We nurture integrity, respect and a lifelong appetite for learning alongside academic achievement.",
  },
  {
    title: "Known and cared for",
    body: "Every child is known by their teachers, challenged to grow, and supported through the journey.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the school"
        title="A 153-year heritage of learning"
        intro="Founded in 1873 in the heart of Kozhikode, Sri Gujarati Vidhyalaya has educated generation after generation of children in Mananchira."
      />

      {/* Heritage story */}
      <Section tone="parchment">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <SectionHeading eyebrow="Our story" title="From 1873 to today" />
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-text">
                <p>
                  Sri Gujarati Vidhyalaya was established in 1873 by the Gujarati community of
                  Kozhikode, born of a simple conviction: that a good education changes the
                  course of a child&rsquo;s life. From those beginnings, the school grew into a
                  trusted institution at the centre of Mananchira.
                </p>
                <p>
                  Over more than a century and a half, the school has broadened from its early
                  years through to Higher Secondary, offering streams in Science, Commerce and
                  Humanities while remaining English-medium and co-educational.
                </p>
                <p>
                  Today, Sri Gujarati Vidhyalaya carries its heritage forward — pairing the
                  values that have always defined it with modern facilities and teaching.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-card p-8">
                <p className="font-display text-5xl font-semibold text-indigo">1873</p>
                <p className="mt-2 text-muted">The year our school was founded.</p>
                <hr className="my-6 border-line" />
                <p className="font-display text-5xl font-semibold text-indigo">153</p>
                <p className="mt-2 text-muted">Years of continuous learning in Kozhikode.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Timeline (expanded) */}
      <Section tone="card">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Heritage timeline" title="Milestones along the way" />
          </Reveal>
          <div className="mt-10 max-w-3xl">
            <HeritageTimeline />
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted">
            {/* Honest framing — exact intermediate years to be confirmed with the school archive. */}
            Dates for intermediate milestones are being confirmed with the school archive.
          </p>
        </Container>
      </Section>

      {/* Vision & ethos */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Vision & ethos"
              title="What we hold to"
              intro="Our purpose is simple and unchanging: to know every child, to challenge them to grow, and to care for them as they do."
            />
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {ETHOS.map((e, i) => (
              <Reveal as="li" key={e.title} delay={i * 70}>
                <div className="h-full rounded-xl border border-line bg-card p-6">
                  <h3 className="font-display text-xl font-semibold text-indigo">{e.title}</h3>
                  <p className="mt-2 text-muted">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Association */}
      <Section tone="card">
        <Container>
          <Reveal>
            <div className="max-w-3xl">
              <SectionHeading
                eyebrow="Governance"
                title="The Sri Gujarati Vidhyalaya Association"
              />
              <p className="mt-5 text-lg leading-relaxed text-text">
                The school is run by the Sri Gujarati Vidhyalaya Association, which has stewarded
                the institution and its values across generations.
              </p>
              <p className="mt-3 text-sm text-muted">
                {/* TODO(office): add the Association's history, office-bearers and governance details. */}
                Full details of the Association&rsquo;s history and members will be added here.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Principal's full message */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="From the Principal" title="A message to our community" />
            <div className="mt-8 max-w-4xl">
              <PrincipalMessage variant="full" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
