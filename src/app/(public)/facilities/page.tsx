import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/layout";
import { FacilitiesGrid } from "@/components/sections/FacilitiesGrid";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Campus facilities at Sri Gujarati Vidhyalaya — laboratories, library, swimming pool, transport, medical care, play courts, auditorium and smart classrooms.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title="A campus built for learning and life"
        intro="Spaces and services that support every part of a child's day — from the laboratory to the playing field."
      />
      <Section tone="parchment">
        <Container>
          <FacilitiesGrid />
        </Container>
      </Section>
    </>
  );
}
