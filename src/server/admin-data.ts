import "server-only";
import { prisma, hasDatabase } from "@/lib/prisma";

/**
 * Admin data access. Unlike the public layer, these include unpublished items.
 * They still degrade safely (0 / [] / null) when no database is configured.
 */

async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabase) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.error(`[admin-data] ${label} failed`, err);
    return fallback;
  }
}

export async function getDashboardCounts() {
  return safe(
    "getDashboardCounts",
    async () => {
      const [news, events, stories, albums, newEnquiries] = await Promise.all([
        prisma.news.count(),
        prisma.event.count(),
        prisma.story.count(),
        prisma.galleryAlbum.count(),
        prisma.enquiry.count({ where: { status: "NEW" } }),
      ]);
      return { news, events, stories, albums, newEnquiries };
    },
    { news: 0, events: 0, stories: 0, albums: 0, newEnquiries: 0 },
  );
}

// News
export const listNews = () =>
  safe("listNews", () => prisma.news.findMany({ orderBy: { createdAt: "desc" } }), []);
export const getNews = (id: string) =>
  safe("getNews", () => prisma.news.findUnique({ where: { id } }), null);

// Events
export const listEvents = () =>
  safe("listEvents", () => prisma.event.findMany({ orderBy: { startsAt: "desc" } }), []);
export const getEvent = (id: string) =>
  safe("getEvent", () => prisma.event.findUnique({ where: { id } }), null);

// Stories
export const listStories = () =>
  safe("listStories", () => prisma.story.findMany({ orderBy: { sortOrder: "asc" } }), []);
export const getStory = (id: string) =>
  safe("getStory", () => prisma.story.findUnique({ where: { id } }), null);

// Gallery
export const listAlbums = () =>
  safe(
    "listAlbums",
    () =>
      prisma.galleryAlbum.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { images: true } } },
      }),
    [],
  );
export const getAlbum = (id: string) =>
  safe(
    "getAlbum",
    () =>
      prisma.galleryAlbum.findUnique({
        where: { id },
        include: { images: { orderBy: { sortOrder: "asc" } } },
      }),
    null,
  );

// Enquiries
export const listEnquiries = () =>
  safe("listEnquiries", () => prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } }), []);

// Settings
export const getSettingsRow = () =>
  safe("getSettingsRow", () => prisma.settings.findUnique({ where: { id: "singleton" } }), null);
