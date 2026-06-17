import { SITE } from "@/content/site";
import { getSettings } from "@/server/data";

/**
 * School / EducationalOrganization structured data for rich results and local
 * SEO (Kozhikode / Calicut / Mananchira). Rendered once site-wide.
 */
export async function SchoolJsonLd() {
  const settings = await getSettings();

  const data = {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": `${SITE.url}#school`,
    name: SITE.name,
    alternateName: SITE.shortName,
    foundingDate: String(SITE.established),
    url: SITE.url,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: ["Kozhikode", "Calicut", "Mananchira", "Kerala"],
    sameAs: [settings.facebookUrl, settings.instagramUrl, settings.youtubeUrl].filter(
      Boolean,
    ),
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, structured content built from our own data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
