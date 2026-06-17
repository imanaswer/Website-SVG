import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { STAGES, HSS_STREAMS, AFFILIATION } from "@/content/academics";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Academic programmes at Sri Gujarati Vidhyalaya — Foundation, Primary, Secondary and Higher Secondary, with Plus One/Plus Two streams in Science, Commerce and Humanities.",
};

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Academics"
        title="A continuous path from first steps to Plus Two"
        intro={AFFILIATION}
      />

      {/* Stages */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The journey"
              title="Four stages of learning"
              intro="Each stage builds on the last, so children progress with confidence."
            />
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {STAGES.map((stage, i) => (
              <Reveal as="li" key={stage.slug} delay={i * 70}>
                <div className="flex h-full gap-5 rounded-xl border border-line bg-card p-6">
                  <span className="font-display text-3xl font-semibold text-gold-deep">{i + 1}</span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-gold-deep uppercase">{stage.grades}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-indigo">{stage.name}</h3>
                    <p className="mt-2 text-muted">{stage.summary}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* HSS streams */}
      <Section tone="card">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Higher Secondary"
              title="Plus One & Plus Two streams"
              intro="Specialised streams that open clear pathways to higher education and professional courses."
            />
          </Reveal>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {HSS_STREAMS.map((stream, i) => (
              <Reveal as="li" key={stream.name} delay={i * 70}>
                <div className="h-full rounded-xl border border-line bg-parchment p-6">
                  <h3 className="font-display text-xl font-semibold text-indigo">{stream.name}</h3>
                  <p className="mt-2 text-sm font-medium text-gold-deep">{stream.subjects}</p>
                  <p className="mt-3 text-muted">{stream.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            {/* TODO(office): confirm exact subject combinations offered in each stream. */}
            Exact subject combinations within each stream are confirmed at admission.
          </p>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="indigo">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <SectionHeading
              eyebrow="Next step"
              title="Find the right starting point for your child"
              inverted
            />
            <ButtonLink href="/admissions" variant="gold" size="lg" className="shrink-0">
              Enquire about admissions
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
