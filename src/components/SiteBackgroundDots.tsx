"use client";

const NUM_DOTS = 24;

export default function SiteBackgroundDots() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: NUM_DOTS }, (_, i) => {
        const left = 5 + ((i * 17 + 7) % 90);
        const top = 5 + ((i * 13 + 11) % 90);
        const duration = 8 + (i % 5) * 2;
        const delay = (i * 3) % 20;
        return (
          <span
            key={i}
            className="site-bg-dot absolute h-1 w-1 rounded-full bg-white/20"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              boxShadow: "0 0 6px rgba(255,255,255,0.15)",
              animation: "site-bg-dot-float ease-in-out infinite",
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              animationFillMode: "both",
            }}
          />
        );
      })}
    </div>
  );
}
