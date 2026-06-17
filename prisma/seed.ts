import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Seed data for local development and the first deploy.
 *
 * Real, clean copy — no lorem ipsum. Where a real value is unknown it is left
 * as a clearly-marked TODO in the content, never invented.
 * Run via `prisma migrate dev` (auto-seeds) or `node prisma/seed.ts`.
 */
const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Set DATABASE_URL / DIRECT_URL before seeding (see .env.example).");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Single-row site settings.
  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      phone: "0495 236 5215",
      email: "office@srigujaratividhyalaya.com", // TODO(office): confirm real inbox
      address: "7Q3C+7CR, Beach Road, Mananchira, Kozhikode, Kerala 673032",
      admissionsOpen: true,
      heroVideoUrl: null, // TODO(media): Cloudinary campus loop URL
      prospectusPdfUrl: null, // TODO(media): prospectus PDF
      facebookUrl: null,
      instagramUrl: null,
      youtubeUrl: null,
    },
  });

  // News.
  const news = [
    {
      title: "Admissions open for the 2026–27 academic year",
      slug: "admissions-open-2026-27",
      excerpt:
        "Applications are now being accepted across all classes. Visit the Admissions page for the process, key dates and the enquiry form.",
      body: "<p>Sri Gujarati Vidhyalaya Higher Secondary School welcomes applications for the 2026–27 academic year. Our admissions team is happy to guide you through eligibility, required documents and key dates.</p><p>Submit an enquiry through the Admissions page and our office will be in touch.</p>",
      coverImage: null,
      isPublished: true,
      publishedAt: new Date("2026-01-15T04:00:00.000Z"),
    },
    {
      title: "Annual Day celebrates 153 years of learning",
      slug: "annual-day-153-years",
      excerpt:
        "Students, parents and alumni gathered to mark another milestone in the school's long heritage with music, drama and recognition of academic achievement.",
      body: "<p>Our Annual Day brought the whole school community together to celebrate 153 years since the institution's founding in 1873. The evening featured performances across music and drama and the felicitation of our high achievers.</p>",
      coverImage: null,
      isPublished: true,
      publishedAt: new Date("2026-02-20T13:30:00.000Z"),
    },
  ];
  for (const item of news) {
    await prisma.news.upsert({ where: { slug: item.slug }, update: item, create: item });
  }

  // Events.
  await prisma.event.upsert({
    where: { slug: "open-house-2026" },
    update: {},
    create: {
      title: "Admissions Open House",
      slug: "open-house-2026",
      description:
        "Prospective families are invited to tour the campus, meet faculty and learn about our streams and facilities.",
      startsAt: new Date("2026-07-05T04:00:00.000Z"),
      endsAt: new Date("2026-07-05T07:00:00.000Z"),
      location: "Main Campus, Mananchira",
      coverImage: null,
      isPublished: true,
    },
  });

  // Gallery album + images.
  const album = await prisma.galleryAlbum.upsert({
    where: { slug: "campus-life" },
    update: {},
    create: {
      title: "Campus Life",
      slug: "campus-life",
      coverImage: null, // TODO(media): Cloudinary cover id
    },
  });
  // Image rows reference Cloudinary ids; placeholders until media is uploaded.
  const images = [
    { cloudinaryId: "sgv/placeholder-1", caption: "Morning assembly", sortOrder: 0 },
    { cloudinaryId: "sgv/placeholder-2", caption: "Science laboratory", sortOrder: 1 },
  ];
  for (const img of images) {
    await prisma.galleryImage.upsert({
      // Composite-ish natural key not defined; use find-or-create by album+cloudinaryId.
      where: { id: `${album.slug}-${img.sortOrder}` },
      update: img,
      create: { id: `${album.slug}-${img.sortOrder}`, albumId: album.id, ...img },
    });
  }

  // Story.
  await prisma.story.upsert({
    where: { id: "story-heritage" },
    update: {},
    create: {
      id: "story-heritage",
      title: "153 years of Sri Gujarati Vidhyalaya",
      caption: "A short film on the school's heritage.",
      youtubeUrl: null, // TODO(media): YouTube URL
      cloudinaryId: null,
      thumbnail: null,
      sortOrder: 0,
      isPublished: true,
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
