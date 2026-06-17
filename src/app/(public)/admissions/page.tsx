import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getSettings } from "@/server/data";
import {
  ADMISSION_STEPS,
  ELIGIBILITY,
  DOCUMENTS,
  KEY_DATES,
  FEE_NOTE,
} from "@/content/admissions";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Admissions at Sri Gujarati Vidhyalaya, Kozhikode — process, eligibility, key dates, fee overview, prospectus and enquiry form.",
};

export default async function AdmissionsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow="Admissions"
        title="Join the Sri Gujarati Vidhyalaya family"
        intro={
          settings.admissionsOpen
            ? "Admissions are open. Here's how the process works — and an enquiry form to get started."
            : "Here's how admissions work. Submit an enquiry and we'll be in touch when applications open."
        }
      />

      {/* Process */}
      <Section tone="parchment">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="The admissions process" />
          </Reveal>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ADMISSION_STEPS.map((s, i) => (
              <Reveal as="li" key={s.step} delay={i * 60}>
                <div className="h-full rounded-xl border border-line bg-card p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-indigo font-display font-semibold text-parchment">
                    {s.step}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-indigo">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Eligibility + documents + dates */}
      <Section tone="card">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <SectionHeading eyebrow="Eligibility" title="Who can apply" />
              <ul className="mt-6 space-y-3">
                {ELIGIBILITY.map((e) => (
                  <li key={e} className="flex gap-3 text-text">
                    <Icon name="arrow-right" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 font-display text-lg font-semibold text-indigo">Documents required</h3>
              <ul className="mt-3 space-y-2">
                {DOCUMENTS.map((d) => (
                  <li key={d} className="flex gap-3 text-muted">
                    <Icon name="arrow-right" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-parchment p-6">
                <SectionHeading eyebrow="Key dates" title="Important dates" />
                <dl className="mt-6 divide-y divide-line">
                  {KEY_DATES.map((d) => (
                    <div key={d.label} className="flex items-center justify-between py-3">
                      <dt className="text-text">{d.label}</dt>
                      <dd className="font-medium text-indigo">{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <h3 className="mt-8 font-display text-lg font-semibold text-indigo">Fees</h3>
                <p className="mt-2 text-muted">{FEE_NOTE}</p>
                {settings.prospectusPdfUrl ? (
                  <div className="mt-6">
                    <ButtonLink href={settings.prospectusPdfUrl} variant="secondary">
                      Download prospectus
                    </ButtonLink>
                  </div>
                ) : (
                  <p className="mt-6 text-sm text-muted">
                    {/* TODO(media): upload prospectus PDF and set settings.prospectusPdfUrl */}
                    The prospectus will be available to download here soon.
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Enquiry form */}
      <Section tone="parchment" id="enquire">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Get in touch"
                title="Submit an enquiry"
                intro="Tell us a little about your child and we'll guide you through the next steps."
              />
              <div className="mt-6 space-y-2 text-muted">
                <p className="flex items-center gap-2">
                  <Icon name="phone" className="h-5 w-5 text-gold" />
                  <a href={`tel:${SITE.phoneHref}`} className="hover:text-indigo">
                    {settings.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="mail" className="h-5 w-5 text-gold" />
                  <a href={`mailto:${settings.email}`} className="hover:text-indigo">
                    {settings.email}
                  </a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
