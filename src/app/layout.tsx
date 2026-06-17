import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SITE } from "@/content/site";
import "./globals.css";

// Display serif — literary, regal.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body sans.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | School in Kozhikode`,
    template: `%s · ${SITE.shortName}`,
  },
  description:
    "A 153-year-old (Est. 1873) Government-recognised, English-medium, co-educational school in Mananchira, Kozhikode (Calicut), Kerala. Foundation to Higher Secondary.",
  keywords: [
    "school in Kozhikode",
    "school in Calicut",
    "school in Mananchira",
    "English medium school Kozhikode",
    "Sri Gujarati Vidhyalaya",
    "higher secondary school Kerala",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    url: SITE.url,
    title: SITE.name,
    description:
      "A 153-year heritage of learning in the heart of Kozhikode. English-medium, co-educational. Established 1873.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: "A 153-year heritage of learning in Kozhikode. Established 1873.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
