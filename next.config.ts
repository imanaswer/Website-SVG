import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server's /_next resources (incl. HMR/Fast Refresh) to be
  // requested when the site is opened via the LAN IP instead of localhost —
  // e.g. testing on a phone on the same network. Without this, Next 16 blocks
  // the HMR connection cross-origin and a page loaded mid-restart can get stuck
  // on a stale bundle. Update the IP if your LAN address changes.
  allowedDevOrigins: ["192.168.18.175"],

  images: {
    // Allow future next/image usage with Cloudinary + YouTube thumbnails.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // Placeholder demo imagery (src/content/media.ts) — remove once real
      // school photography replaces the Pexels/Unsplash placeholders.
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },

  async redirects() {
    // Redirects from the old WordPress site to the new structure.
    //
    // These are the high-confidence equivalents. The OLD site's exact URL
    // inventory must be crawled before launch (see docs/launch/domain-cutover.md)
    // and any additional old paths added here as `permanent: true` (308).
    return [
      // Common WordPress page slugs → new pages.
      { source: "/home", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/aboutus", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contactus", destination: "/contact", permanent: true },
      { source: "/admission", destination: "/admissions", permanent: true },
      { source: "/gallery", destination: "/campus-life", permanent: true },
      { source: "/photo-gallery", destination: "/campus-life", permanent: true },
      { source: "/photos", destination: "/campus-life", permanent: true },
      { source: "/notice", destination: "/news", permanent: true },
      { source: "/notices", destination: "/news", permanent: true },
      { source: "/events", destination: "/news", permanent: true },

      // WordPress blog taxonomy → news.
      { source: "/category/:slug*", destination: "/news", permanent: true },
      { source: "/tag/:slug*", destination: "/news", permanent: true },

      // WordPress feeds (no equivalent) → home.
      { source: "/feed", destination: "/", permanent: true },
      { source: "/comments/feed", destination: "/", permanent: true },

      // Old WordPress admin → new staff sign-in.
      { source: "/wp-login.php", destination: "/admin/login", permanent: false },
      { source: "/wp-admin", destination: "/admin/login", permanent: false },
      { source: "/wp-admin/:path*", destination: "/admin/login", permanent: false },
    ];
  },
};

export default nextConfig;
