"use client";

// Last-resort boundary for errors in the root layout itself (where error.tsx
// can't render). It replaces the whole document, so it ships its own <html>
// and plain inline styles — no app CSS or providers are guaranteed here.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#131313",
          color: "#e5e2e1",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <h1 style={{ color: "#f2ca50", margin: 0 }}>Une erreur est survenue</h1>
        <p role="alert" style={{ margin: 0 }}>
          L&apos;application a rencontré un problème. Réessayez dans un instant.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            background: "#f2ca50",
            color: "#131313",
            border: 0,
            borderRadius: 4,
            padding: "12px 24px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
