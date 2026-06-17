/** Academic structure — stable content, editable here for v1. */

export type Stage = {
  slug: string;
  name: string;
  grades: string;
  summary: string;
};

export const STAGES: Stage[] = [
  {
    slug: "foundation",
    name: "Foundation",
    grades: "Pre-Primary · LKG–UKG",
    summary:
      "A gentle, play-led start where young children build confidence, curiosity and the early habits of learning.",
  },
  {
    slug: "primary",
    name: "Primary",
    grades: "Classes I–IV",
    summary:
      "Strong foundations in language, mathematics and the world around us, with activity-based learning at the core.",
  },
  {
    slug: "secondary",
    name: "Secondary",
    grades: "Classes V–X",
    summary:
      "A broad, rigorous curriculum that prepares students for board examinations and for thinking independently.",
  },
  {
    slug: "higher-secondary",
    name: "Higher Secondary",
    grades: "Plus One & Plus Two",
    summary:
      "Specialised streams that open clear pathways to higher education and professional courses.",
  },
];

export type Stream = {
  name: string;
  subjects: string;
  description: string;
};

/** Plus One / Plus Two streams. */
export const HSS_STREAMS: Stream[] = [
  {
    name: "Science",
    subjects: "Physics · Chemistry · Biology / Mathematics",
    description:
      "For students aiming at engineering, medicine and the pure and applied sciences.",
  },
  {
    name: "Commerce",
    subjects: "Accountancy · Business Studies · Economics",
    description:
      "For students pursuing commerce, management, finance and professional accounting.",
  },
  {
    name: "Humanities",
    subjects: "History · Economics · Political Science · Sociology",
    description:
      "For students drawn to the social sciences, law, civil services and the liberal arts.",
  },
];

/**
 * Affiliation note. Confirmed as Kerala state syllabus for v1.
 * TODO(admin): confirm exact recognition wording with the office.
 */
export const AFFILIATION =
  "Government-recognised, English-medium, co-educational. Kerala state syllabus.";
