"use client";

import { useEffect } from "react";

export default function Error({
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#1a1a1e",
        color: "#fafafa",
        padding: 16,
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: 8, fontSize: 18, fontWeight: 600 }}>
        Bir hata oluştu
      </h2>
      <p style={{ marginBottom: 24, maxWidth: 400, color: "#a1a1aa", fontSize: 14 }}>
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
  );
}
