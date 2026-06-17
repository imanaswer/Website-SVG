import "server-only";
import type {
  News,
  Event,
  Story,
  GalleryAlbum,
  GalleryImage,
} from "@prisma/client";
import { prisma, hasDatabase } from "@/lib/prisma";
import { SETTINGS_FALLBACK, type SiteSettings } from "@/content/site";

/**
 * Public data access. Every function is resilient: when no database is
 * configured (pre-credentials build) or a query fails, it returns a safe
 * fallback ([] or sensible defaults) instead of throwing, so public pages
 * always render. Once Supabase creds land, real data flows with no code change.
 */

async function safe<T>(label: string, fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabase) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.error(`[data] ${label} failed; using fallback.`, err);
    return fallback;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  return safe(
    "getSettings",
    async () => {
      const row = await prisma.settings.findUnique({ where: { id: "singleton" } });
      if (!row) return SETTINGS_FALLBACK;
      return {
        phone: row.phone,
        email: row.email,
        address: row.address,
        admissionsOpen: row.admissionsOpen,
        heroVideoUrl: row.heroVideoUrl,
        prospectusPdfUrl: row.prospectusPdfUrl,
        facebookUrl: row.facebookUrl,
        instagramUrl: row.instagramUrl,
        youtubeUrl: row.youtubeUrl,
      };
    },
    SETTINGS_FALLBACK,
  );
}

export async function getPublishedNews(limit?: number): Promise<News[]> {
  return safe(
    "getPublishedNews",
    () =>
      prisma.news.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
        ...(limit ? { take: limit } : {}),
      }),
    [],
  );
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  return safe(
    "getNewsBySlug",
    () => prisma.news.findFirst({ where: { slug, isPublished: true } }),
    null,
  );
}

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  return safe(
    "getUpcomingEvents",
    () =>
      prisma.event.findMany({
        where: { isPublished: true, startsAt: { gte: startOfToday() } },
        orderBy: { startsAt: "asc" },
        ...(limit ? { take: limit } : {}),
      }),
    [],
  );
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return safe(
    "getEventBySlug",
    () => prisma.event.findFirst({ where: { slug, isPublished: true } }),
    null,
  );
}

export async function getStories(): Promise<Story[]> {
  return safe(
    "getStories",
    () =>
      prisma.story.findMany({
        where: { isPublished: true },
        orderBy: { sortOrder: "asc" },
      }),
    [],
  );
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  return safe(
    "getGalleryAlbums",
    () => prisma.galleryAlbum.findMany({ orderBy: { createdAt: "desc" } }),
    [],
  );
}

export type AlbumWithImages = GalleryAlbum & { images: GalleryImage[] };

export async function getAlbumBySlug(slug: string): Promise<AlbumWithImages | null> {
  return safe(
    "getAlbumBySlug",
    () =>
      prisma.galleryAlbum.findUnique({
        where: { slug },
        include: { images: { orderBy: { sortOrder: "asc" } } },
      }),
    null,
  );
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
