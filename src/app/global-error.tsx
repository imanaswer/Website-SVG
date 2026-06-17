"use client";

// Global error boundary. Replaces the root layout when an unhandled error
// occurs, so it must render its own <html>/<body>. Kept dependency-free and
// inline-styled (the app's CSS/fonts may not be available here).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#1A2A4F",
          color: "#F4EDE0",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", margin: 0 }}>Something went wrong</h1>
          <p style={{ marginTop: "0.75rem", opacity: 0.85, maxWidth: "32rem" }}>
            We hit an unexpected error. Please try again, or return to the home page.
          </p>
          {error?.digest && (
            <p style={{ marginTop: "0.5rem", fontSize: "0.8rem", opacity: 0.6 }}>
              Reference: {error.digest}
            </p>
          )}
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button
              onClick={() => reset()}
              style={{
                background: "#C8A24B",
                color: "#0F1B36",
                border: "none",
                borderRadius: "999px",
                padding: "0.75rem 1.5rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- hard navigation intentionally fully resets the app after a crash */}
            <a
              href="/"
              style={{
                border: "1px solid rgba(244,237,224,0.3)",
                color: "#F4EDE0",
                borderRadius: "999px",
                padding: "0.75rem 1.5rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
