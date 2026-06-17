import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { getPublishedNews, getUpcomingEvents, getGalleryAlbums } from "@/server/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url.replace(/\/$/, "");

  const staticPaths = [
    "",
    "/about",
    "/academics",
    "/admissions",
    "/facilities",
    "/campus-life",
    "/news",
    "/contact",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: p === "" || p === "/news" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  // Dynamic content (safe: returns [] when no DB is connected).
  const [news, events, albums] = await Promise.all([
    getPublishedNews(),
    getUpcomingEvents(),
    getGalleryAlbums(),
  ]);

  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${base}/news/${n.slug}`,
    lastModified: n.updatedAt ?? n.publishedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: e.updatedAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const albumEntries: MetadataRoute.Sitemap = albums.map((a) => ({
    url: `${base}/campus-life/${a.slug}`,
    lastModified: a.createdAt ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...newsEntries, ...eventEntries, ...albumEntries];
}
