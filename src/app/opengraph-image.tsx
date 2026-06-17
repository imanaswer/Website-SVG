import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share image, generated at build/request (no asset file needed).
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0F1B36 0%, #1A2A4F 60%, #0F1B36 100%)",
          color: "#F4EDE0",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, color: "#E3C987", fontSize: 30 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#C8A24B",
              color: "#0F1B36",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 28,
            }}
          >
            SGV
          </div>
          Established {SITE.established}
        </div>
        <div style={{ marginTop: 36, fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Sri Gujarati Vidhyalaya Higher Secondary School
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#E3C987" }}>
          A 153-year heritage of learning · Mananchira, Kozhikode
        </div>
      </div>
    ),
    size,
  );
}
