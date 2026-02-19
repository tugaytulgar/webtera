"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="tr">
      <body style={{ background: "#0a0a0a", color: "#fafafa", margin: 0 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: 16,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: "system-ui", marginBottom: 8 }}>
            Kritik hata
          </h2>
          <p style={{ color: "#a1a1aa", marginBottom: 24, maxWidth: 400 }}>
            {error.message}
          </p>
          <button
            onClick={reset}
            style={{
              padding: "12px 24px",
              border: "1px solid #3b82f6",
              background: "rgba(59, 130, 246, 0.1)",
              color: "#3b82f6",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Tekrar dene
          </button>
        </div>
      </body>
    </html>
  );
}
