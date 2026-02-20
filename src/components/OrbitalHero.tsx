"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useContactForm } from "@/contexts/ContactFormContext";

// 4 bölge: üst-sol, üst-sağ, alt-sol, alt-sağ — hangi bölgeye gelince o etiket çıkar
const REGION_LABELS = ["WEB TASARIM", "WEBTERA", "SEO", "UI-UX"];

// Her bölgenin etiket konumu (ekranda düz)
const REGION_POSITIONS: Array<{ left: string; top: string }> = [
  { left: "25%", top: "28%" },
  { left: "75%", top: "28%" },
  { left: "25%", top: "72%" },
  { left: "75%", top: "72%" },
];

const NUM_DOTS = 6;
const MAX_TILT_DEG = 10;
const LERP_FACTOR = 0.06;
const LABEL_FADE_MS = 600;
const LABEL_VISIBLE_MS = 3000;
const DOT_SPEED_NORMAL = 0.22;
const DOT_SPEED_SLOW = 0.08;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function OrbitalHero() {
  const { openContact } = useContactForm();
  const containerRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState<number | null>(null);
  const [showingLabelId, setShowingLabelId] = useState<number | null>(null);
  const [zoneHover, setZoneHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [preferTouch, setPreferTouch] = useState(false);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const mouseInZoneRef = useRef(false);
  const labelHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dotsRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const dotElsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqTouch = window.matchMedia("(pointer: coarse)");
    setReducedMotion(mqReduce.matches);
    setPreferTouch(mqTouch.matches);
    const onReduce = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const onTouch = (e: MediaQueryListEvent) => setPreferTouch(e.matches);
    mqReduce.addEventListener("change", onReduce);
    mqTouch.addEventListener("change", onTouch);
    return () => {
      mqReduce.removeEventListener("change", onReduce);
      mqTouch.removeEventListener("change", onTouch);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (preferTouch || reducedMotion) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseTarget.current = { x, y };
    },
    [preferTouch, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mouseTarget.current = { x: 0.5, y: 0.5 };
  }, []);

  useEffect(() => {
    if (preferTouch || reducedMotion) return;
    const tick = () => {
      const tx = (mouseTarget.current.x - 0.5) * 2 * MAX_TILT_DEG;
      const ty = (mouseTarget.current.y - 0.5) * 2 * MAX_TILT_DEG;
      currentTilt.current.x = lerp(currentTilt.current.x, ty, LERP_FACTOR);
      currentTilt.current.y = lerp(currentTilt.current.y, -tx, LERP_FACTOR);
      if (tiltRef.current) {
        tiltRef.current.style.transform = `perspective(800px) rotateX(${currentTilt.current.x}deg) rotateY(${currentTilt.current.y}deg)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, [preferTouch, reducedMotion]);

  const handleZoneMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = zoneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const region = x < 0.5 ? (y < 0.5 ? 0 : 2) : (y < 0.5 ? 1 : 3);
    setActiveRegion(region);
  }, []);

  const handleZoneEnter = useCallback(() => {
    mouseInZoneRef.current = true;
    setZoneHover(true);
  }, []);

  const handleZoneLeave = useCallback(() => {
    mouseInZoneRef.current = false;
    setZoneHover(false);
    setActiveRegion(null);
  }, []);

  const getRegionFromClientCoords = useCallback((clientX: number, clientY: number) => {
    const el = zoneRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    return x < 0.5 ? (y < 0.5 ? 0 : 2) : (y < 0.5 ? 1 : 3);
  }, []);

  const handleZoneTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!e.touches.length) return;
      mouseInZoneRef.current = true;
      setZoneHover(true);
      const region = getRegionFromClientCoords(e.touches[0].clientX, e.touches[0].clientY);
      setActiveRegion(region);
    },
    [getRegionFromClientCoords]
  );

  const handleZoneTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!e.touches.length) return;
      const region = getRegionFromClientCoords(e.touches[0].clientX, e.touches[0].clientY);
      setActiveRegion(region);
    },
    [getRegionFromClientCoords]
  );

  const handleZoneTouchEnd = useCallback(() => {
    mouseInZoneRef.current = false;
    setZoneHover(false);
    setActiveRegion(null);
  }, []);

  useEffect(() => {
    if (activeRegion === null) return;
    setShowingLabelId(activeRegion);
    if (labelHideTimeoutRef.current) clearTimeout(labelHideTimeoutRef.current);
    labelHideTimeoutRef.current = setTimeout(() => {
      setShowingLabelId(null);
      labelHideTimeoutRef.current = null;
    }, LABEL_VISIBLE_MS);
  }, [activeRegion]);

  useEffect(() => () => {
    if (labelHideTimeoutRef.current) clearTimeout(labelHideTimeoutRef.current);
  }, []);

  if (dotsRef.current.length < NUM_DOTS) {
    for (let i = dotsRef.current.length; i < NUM_DOTS; i++) {
      const seed = (i * 17 + 7) % 100 / 100;
      const seed2 = (i * 13 + 11) % 100 / 100;
      dotsRef.current.push({
        x: 15 + seed * 70,
        y: 15 + seed2 * 70,
        vx: (seed - 0.5) * DOT_SPEED_NORMAL,
        vy: (seed2 - 0.5) * DOT_SPEED_NORMAL,
      });
    }
  }

  useEffect(() => {
    const dots = dotsRef.current;
    if (dots.length === 0 || reducedMotion) return;
    let raf: number;
    const tick = () => {
      const slow = mouseInZoneRef.current ? 0.45 : 1;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx * slow;
        d.y += d.vy * slow;
        if (d.x < 5 || d.x > 95) d.vx *= -1;
        if (d.y < 5 || d.y > 95) d.vy *= -1;
        d.x = Math.max(5, Math.min(95, d.x));
        d.y = Math.max(5, Math.min(95, d.y));
        if (Math.random() < 0.008) {
          d.vx = (Math.random() - 0.5) * DOT_SPEED_NORMAL;
          d.vy = (Math.random() - 0.5) * DOT_SPEED_NORMAL;
        }
        const el = dotElsRef.current[i];
        if (el) {
          el.style.left = `${d.x}%`;
          el.style.top = `${d.y}%`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#1a1a1e] lg:flex-row lg:items-center"
      aria-label="Webtera — Ana sayfa hero"
    >
      {/* Subtle starfield */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 60% 70%, rgba(255,255,255,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.25) 0%, transparent 100%)`,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Ortalanmış hero bloğu: max-width + mx-auto */}
      <div className="relative z-10 flex w-full max-w-6xl flex-1 flex-col lg:mx-auto lg:flex-row lg:items-center lg:px-6 xl:max-w-7xl xl:px-8">
      {/* —— LEFT: Copy + CTAs + Stats —— */}
      <div className="relative flex flex-1 flex-col justify-center px-6 py-16 sm:px-8 md:px-10 lg:max-w-[52%] lg:py-24 lg:pr-10">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-electric-blue sm:text-sm">
          NEXT GENERATION WEB EXPERIENCES
        </p>
        <h1 className="mb-4 text-7xl font-bold leading-tight tracking-tight text-white sm:mb-5 sm:text-7xl md:text-7xl lg:text-7xl xl:text-8xl">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #3b82f6, #38bdf8, #10b981)",
              backgroundSize: "200% 100%",
              animation: "gradient-breath 5s ease-in-out infinite",
            }}
          >
            webtera
          </span>
        </h1>
        <p
          className="mb-8 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          style={{
            animation: reducedMotion ? undefined : "body-text-breath 4s ease-in-out infinite",
          }}
        >
          Webtera ile web siteniz sadece bir adres değil; merak uyandıran, güven veren
          ve yapay zeka ile yaşayan bir büyüme aracıdır. Tüm süreci biz yönetiyoruz,
          siz sadece sonuca odaklanıyorsunuz.
        </p>
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={openContact}
            className="min-h-[44px] min-w-[44px] rounded-xl border border-sky-400 bg-[#0c1929] px-6 py-3.5 text-center font-medium text-sky-300 transition-colors hover:bg-[#0f2744] hover:border-sky-300 active:scale-[0.98] sm:py-3"
          >
            Dijital Dünyanı Kur
          </button>
          <a
            href="#services"
            className="min-h-[44px] min-w-[44px] rounded-xl border border-emerald-400 bg-[#0a1f17] px-6 py-3.5 text-center font-medium text-emerald-300 transition-colors hover:bg-[#0d2a1f] hover:border-emerald-300 active:scale-[0.98] sm:py-3"
          >
            Ne Yapıyoruz?
          </a>
        </div>
      </div>

      {/* —— RIGHT: Dönen bölge değil — mouse gelince 4 etiket + rastgele hareket eden noktalar —— */}
      <div
        ref={tiltRef}
        className="relative flex flex-1 items-center justify-center py-12 lg:py-24"
        style={{
          transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={zoneRef}
          className="relative h-[320px] w-full max-w-[380px] sm:h-[360px] sm:max-w-[420px]"
          onMouseEnter={handleZoneEnter}
          onMouseLeave={handleZoneLeave}
          onMouseMove={handleZoneMove}
          onTouchStart={handleZoneTouchStart}
          onTouchMove={handleZoneTouchMove}
          onTouchEnd={handleZoneTouchEnd}
          onTouchCancel={handleZoneTouchEnd}
          aria-label="Hizmetler bölgesi — mouse veya dokunma ile etiketleri gösterir"
        >
          {/* Ortada icon: transparan, hover ile parlar */}
          <div
            className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
            style={{
              opacity: zoneHover ? 0.85 : 0.28,
              filter: zoneHover ? "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))" : "none",
            }}
            aria-hidden
          >
            <img
              src="/icon.svg"
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12"
            />
          </div>

          {/* Noktalar: farklı büyüklüklerde, küçük→büyük→kaybol ışıldama; deterministik süre/delay (hydration uyumu) */}
          {Array.from({ length: NUM_DOTS }, (_, i) => {
            const duration = 2 + ((i * 7 + 3) % 10) * 0.2;
            const delay = ((i * 11 + 5) % 30) * 0.1;
            const sizePx = 6 + (i % 3) * 2;
            return (
              <span
                key={i}
                ref={(el) => { dotElsRef.current[i] = el; }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ${reducedMotion ? "" : "dot-twinkle"}`}
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${sizePx}px`,
                  height: `${sizePx}px`,
                  boxShadow: "0 0 12px rgba(255,255,255,0.7), 0 0 6px rgba(59, 130, 246, 0.4)",
                  animation: reducedMotion ? undefined : `dot-twinkle ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  animationFillMode: "both",
                }}
                aria-hidden
              />
            );
          })}

          {/* Bölgeye gelince tek etiket: fade in ile açılır, 3sn sonra fade out ile kapanır */}
          {REGION_POSITIONS.map((pos, i) => (
            <span
              key={i}
              className="absolute z-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] sm:text-lg sm:tracking-[0.3em]"
              style={{
                left: pos.left,
                top: pos.top,
                transform: "translate(-50%, -50%)",
                color: "rgba(34, 211, 238, 0.95)",
                textShadow: "0 0 10px rgba(34, 211, 238, 0.5), 0 0 1px rgba(255,255,255,0.3)",
                opacity: showingLabelId === i ? 1 : 0,
                transition: `opacity ${LABEL_FADE_MS}ms ease-out`,
                pointerEvents: "none",
                animation: showingLabelId === i && !reducedMotion ? "label-glow-breath 2.5s ease-in-out infinite" : undefined,
              }}
            >
              {REGION_LABELS[i]}
            </span>
          ))}

          <a
            href="#services"
            className="absolute inset-0 z-[1] flex items-center justify-center text-sm text-white/40 transition-colors hover:text-white/60"
          >
            <span className="sr-only">Hizmetlere git</span>
          </a>
        </div>
      </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1a1e] to-transparent pointer-events-none" />
    </section>
  );
}
