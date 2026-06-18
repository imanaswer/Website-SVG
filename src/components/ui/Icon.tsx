/**
 * Inline SVG icons (Lucide-style, 1.75 stroke). SVG, not emoji, so they theme
 * and scale cleanly. Decorative by default (aria-hidden); pass a `title` for
 * meaningful standalone use.
 */
export type IconName =
  | "flask"
  | "book"
  | "waves"
  | "bus"
  | "heart"
  | "trophy"
  | "stage"
  | "wifi"
  | "arrow-right"
  | "calendar"
  | "map-pin"
  | "phone"
  | "mail"
  | "chevron-left"
  | "chevron-right"
  | "play"
  | "quote";

const paths: Record<IconName, React.ReactNode> = {
  flask: (
    <>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3" />
      <path d="M7 14h10" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19a2 2 0 0 0 2 2h13" />
    </>
  ),
  waves: (
    <>
      <path d="M2 6c2 0 2 1.5 4 1.5S8 6 10 6s2 1.5 4 1.5S16 6 18 6s2 1.5 4 1.5" />
      <path d="M2 12c2 0 2 1.5 4 1.5S8 12 10 12s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5" />
      <path d="M2 18c2 0 2 1.5 4 1.5S8 18 10 18s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5" />
    </>
  ),
  bus: (
    <>
      <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9H4z" />
      <path d="M4 11h16M8 16v2M16 16v2" />
      <circle cx="8" cy="16" r="1.5" />
      <circle cx="16" cy="16" r="1.5" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-9.5-9A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9z" />,
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 0 1-10 0z" />
      <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M9 20h6M10 16h4v4h-4z" />
    </>
  ),
  stage: (
    <>
      <path d="M3 8l9-4 9 4-9 4z" />
      <path d="M7 10v5a5 5 0 0 0 10 0v-5M12 20v-2" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 12.5a10 10 0 0 1 14 0M8 16a5 5 0 0 1 8 0" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l1 4v2a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  "chevron-left": <path d="M15 6l-6 6 6 6" />,
  "chevron-right": <path d="M9 6l6 6-6 6" />,
  play: <path d="M8 5v14l11-7z" />,
  quote: (
    <path d="M7 7H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v2a2 2 0 0 1-2 2M17 7h-3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v2a2 2 0 0 1-2 2" />
  ),
};

export function Icon({
  name,
  className = "h-6 w-6",
  title,
}: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={name === "play" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}
