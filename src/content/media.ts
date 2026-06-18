/**
 * Placeholder imagery for the homepage visual pass.
 *
 * TODO(media): these are stock photos (Pexels + Unsplash) used so the site reads
 * as a real, lived-in school for the demo. Replace every `src` here with real Sri
 * Gujarati Vidhyalaya photography before launch. Keep the `alt` text accurate to
 * whatever replaces it.
 *
 * Every URL below has been downloaded and visually verified to depict what its
 * `alt` says. The Pexels + Unsplash hosts are allow-listed in next.config.ts
 * `images.remotePatterns`.
 */

export type Img = { src: string; alt: string };

/** Pexels CDN URL for a specific photo id. */
const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/** Unsplash CDN URL for a specific photo id. */
const un = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Framed photo beside the Welcome copy. */
export const CAMPUS_WELCOME: Img = {
  src: px(8471835),
  alt: "Two children examining a flask during a hands-on science lesson",
};

/** Photo header for each academic-stage card, keyed by stage slug. */
export const STAGE_IMAGES: Record<string, Img> = {
  foundation: {
    src: px(8466776),
    alt: "A young pupil raising her hand eagerly in a colourful classroom",
  },
  primary: {
    src: px(10646411),
    alt: "Primary pupils in uniform seated at their desks in class",
  },
  secondary: {
    src: px(5212700),
    alt: "Secondary students and their teacher gathered around a lesson",
  },
  "higher-secondary": {
    src: un("1509062522246-3755977927d7"),
    alt: "Senior students listening to a teacher in a classroom",
  },
};

/**
 * Photo header for facility preview cards, keyed by facility name. Only the
 * facilities shown with images on the homepage (the first four) are listed;
 * FacilitiesGrid falls back to the icon-only card when a name is absent.
 */
export const FACILITY_IMAGES: Record<string, Img> = {
  "Science Laboratories": {
    src: px(8471944),
    alt: "Two students working with a microscope and glassware in a science lab",
  },
  Library: {
    src: un("1497633762265-9d179a990aa6"),
    alt: "A stack of colourful hardback books",
  },
  "Swimming Pool": {
    src: px(261060),
    alt: "Numbered starting blocks beside the lanes of a swimming pool",
  },
  Transport: {
    src: px(6156582),
    alt: "A yellow school bus parked, ready for its route",
  },
  "Play Courts": {
    src: px(16850890),
    alt: "Children playing together on a colourful school playground",
  },
};

/** Full-bleed parallax band image with an overlaid heritage line. */
export const PHOTO_BAND: Img = {
  src: un("1427504494785-3a9ca7044f45", 2000),
  alt: "A student walking between tall, well-stocked library shelves",
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: Img;
};

/**
 * TODO(content): placeholder testimonials. The quotes and names below are NOT
 * real — do not present them as attributed statements from actual people.
 * Attribution is kept generic on purpose. Replace with real, approved quotes
 * before launch.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "What stayed with us is how well the teachers know each child. Our daughter is challenged, encouraged and genuinely cared for — exactly what a 150-year-old school should feel like.",
    name: "A parent",
    role: "Parent of a Class VIII student",
    avatar: {
      src: un("1494790108377-be9c29b29330", 160),
      alt: "Portrait of a parent",
    },
  },
  {
    quote:
      "The science labs and library gave me room to be curious. I came in shy and left ready for college — the foundation here is real.",
    name: "An alumna",
    role: "Higher Secondary, Science stream",
    avatar: {
      src: un("1438761681033-6461ffad8d80", 160),
      alt: "Portrait of an alumna",
    },
  },
  {
    quote:
      "Generations of our family have studied here. The values stay the same while the classrooms keep getting better. That balance is rare.",
    name: "An alumnus",
    role: "Alumnus & current parent",
    avatar: {
      src: un("1500648767791-00dcc994a43e", 160),
      alt: "Portrait of an alumnus",
    },
  },
];
