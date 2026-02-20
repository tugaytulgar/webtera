import Link from "next/link";

export default function NotFound() {
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
      <h1 style={{ marginBottom: 8, fontSize: 36, fontWeight: 700 }}>404</h1>
      <p style={{ marginBottom: 24, color: "#a1a1aa" }}>Bu sayfa bulunamadı.</p>
      <Link
        href="/"
        style={{
          padding: "12px 24px",
          border: "1px solid #3b82f6",
          background: "rgba(59, 130, 246, 0.1)",
          color: "#3b82f6",
          borderRadius: 8,
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
}
