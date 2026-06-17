/** Campus facilities — stable content for v1. */

export type Facility = {
  name: string;
  description: string;
  /** Lucide-style icon key, rendered by the Icon component. */
  icon:
    | "flask"
    | "book"
    | "waves"
    | "bus"
    | "heart"
    | "trophy"
    | "stage"
    | "wifi";
};

export const FACILITIES: Facility[] = [
  {
    name: "Science Laboratories",
    description:
      "Well-equipped physics, chemistry and biology labs for hands-on, enquiry-led learning.",
    icon: "flask",
  },
  {
    name: "Library",
    description:
      "A quiet, well-stocked library supporting reading, research and reference across subjects.",
    icon: "book",
  },
  {
    name: "Swimming Pool",
    description:
      "A supervised pool for swimming instruction, fitness and inter-school competition.",
    icon: "waves",
  },
  {
    name: "Transport",
    description:
      "School bus routes serving Kozhikode and surrounding areas with trained staff.",
    icon: "bus",
  },
  {
    name: "Medical Care",
    description:
      "An on-campus medical room and trained first-aid support for day-to-day care.",
    icon: "heart",
  },
  {
    name: "Play Courts",
    description:
      "Courts and grounds for athletics and team sports, from the everyday to the competitive.",
    icon: "trophy",
  },
  {
    name: "Auditorium",
    description:
      "A spacious auditorium for assemblies, performances and school-wide events.",
    icon: "stage",
  },
  {
    name: "Smart Classrooms",
    description:
      "Digitally-enabled classrooms that bring lessons to life alongside traditional teaching.",
    icon: "wifi",
  },
];
