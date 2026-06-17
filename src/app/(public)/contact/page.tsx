import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getSettings } from "@/server/data";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sri Gujarati Vidhyalaya Higher Secondary School — Beach Road, Mananchira, Kozhikode, Kerala 673032. Phone 0495 236 5215.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="We're in the heart of Mananchira, Kozhikode. Reach us by phone, email or the form below."
      />

      <Section tone="parchment">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Details + map */}
            <Reveal>
              <SectionHeading eyebrow="Find us" title="School office" />
              <ul className="mt-6 space-y-4 text-text">
                <li className="flex gap-3">
                  <Icon name="map-pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span>
                    {SITE.address.line1}
                    <br />
                    {SITE.address.line2}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <a href={`tel:${SITE.phoneHref}`} className="hover:text-indigo">
                    {settings.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <a href={`mailto:${settings.email}`} className="hover:text-indigo">
                    {settings.email}
                  </a>
                </li>
              </ul>

              <div className="mt-8 overflow-hidden rounded-xl border border-line">
                <iframe
                  title="Map to Sri Gujarati Vidhyalaya"
                  src={SITE.mapEmbedSrc}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
                <SectionHeading eyebrow="Message us" title="Send an enquiry" />
                <div className="mt-6">
                  <EnquiryForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
