/**
 * Stable site content + the fallback used when no `Settings` row is available
 * (e.g. before the database is connected). Real values from the brief; unknowns
 * are clearly marked TODO and never invented.
 */
export const SITE = {
  name: "Sri Gujarati Vidhyalaya Higher Secondary School",
  shortName: "Sri Gujarati Vidhyalaya",
  established: 1873,
  tagline: "Established 1873 · Mananchira, Kozhikode",
  // Canonical site URL (override with NEXT_PUBLIC_SITE_URL).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://srigujaratividhyalaya.com",
  // Approximate geo for Mananchira, Kozhikode (JSON-LD / local SEO).
  geo: { lat: 11.2530, lng: 75.7806 },
  locality: "Kozhikode",
  region: "Kerala",
  postalCode: "673032",
  country: "IN",
  phone: "0495 236 5215",
  phoneHref: "+914952365215",
  email: "office@srigujaratividhyalaya.com", // TODO(office): confirm real inbox
  address: {
    line1: "7Q3C+7CR, Beach Road, Mananchira",
    line2: "Kozhikode, Kerala 673032",
    full: "7Q3C+7CR, Beach Road, Mananchira, Kozhikode, Kerala 673032",
  },
  // Google Maps embed for Mananchira, Kozhikode (place query).
  mapEmbedSrc:
    "https://www.google.com/maps?q=Sri+Gujarati+Vidhyalaya+Mananchira+Kozhikode&output=embed",
} as const;

/** Settings shape shared by the DB row and the fallback. */
export type SiteSettings = {
  phone: string;
  email: string;
  address: string;
  admissionsOpen: boolean;
  heroVideoUrl: string | null;
  prospectusPdfUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
};

export const SETTINGS_FALLBACK: SiteSettings = {
  phone: SITE.phone,
  email: SITE.email,
  address: SITE.address.full,
  admissionsOpen: true,
  heroVideoUrl: null,
  prospectusPdfUrl: null,
  facebookUrl: null,
  instagramUrl: null,
  youtubeUrl: null,
};

/** Audience quick-entry cards on the home page. */
export const AUDIENCE_CARDS = [
  {
    title: "Prospective Families",
    description: "Admissions process, key dates and how to enquire.",
    href: "/admissions",
    cta: "Explore admissions",
  },
  {
    title: "Current Students & Parents",
    description: "News, events and everyday life across the campus.",
    href: "/news",
    cta: "Latest news",
  },
  {
    title: "Our Academics",
    description: "Streams from Foundation through Higher Secondary.",
    href: "/academics",
    cta: "View programmes",
  },
  {
    title: "Visit the Campus",
    description: "Facilities, galleries and where to find us.",
    href: "/facilities",
    cta: "See facilities",
  },
] as const;
