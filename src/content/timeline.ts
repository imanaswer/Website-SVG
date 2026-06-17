/**
 * Heritage timeline. 1873 founding is from the brief; the intermediate
 * milestones are framed honestly and generally. Specific dated events should be
 * confirmed with the school archive before being presented as fact.
 * TODO(archive): confirm exact years for intermediate milestones.
 */
export type Milestone = {
  year: string;
  title: string;
  description: string;
};

export const TIMELINE: Milestone[] = [
  {
    year: "1873",
    title: "The school is founded",
    description:
      "Sri Gujarati Vidhyalaya is established by the Gujarati community in Kozhikode, beginning a tradition of education that endures to this day.",
  },
  {
    year: "Early years",
    title: "A community institution takes root", // TODO(archive): confirm year
    description:
      "The school grows from its founding vision into a trusted institution serving generations of families in Mananchira.",
  },
  {
    year: "Growth",
    title: "Expansion to higher secondary", // TODO(archive): confirm year
    description:
      "The school broadens its offering through to Higher Secondary, with streams in Science, Commerce and Humanities.",
  },
  {
    year: "Today",
    title: "153 years of learning",
    description:
      "An English-medium, co-educational, Kerala state-syllabus school carrying its heritage forward with modern facilities.",
  },
];
