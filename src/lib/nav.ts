/** Primary site navigation — single source for header and footer links. */
export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/facilities", label: "Facilities" },
  { href: "/campus-life", label: "Campus Life" },
  { href: "/news", label: "News & Events" },
  { href: "/contact", label: "Contact" },
];

export const SCHOOL_NAME = "Sri Gujarati Vidhyalaya";
export const SCHOOL_FULL_NAME =
  "Sri Gujarati Vidhyalaya Higher Secondary School";
export const SCHOOL_TAGLINE = "Established 1873 · Mananchira, Kozhikode";
