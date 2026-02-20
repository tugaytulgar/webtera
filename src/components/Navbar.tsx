"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "#about", label: "Hakkımızda" },
  { href: "#services", label: "Hizmetler" },
  { href: "#contact", label: "İletişim" },
];

const T_FADE_MS = 600;
const T_GLOW_MS = 3000; // T 3 sn parlıyor (yanıp sönme)
const WEB_FADE_DURATION_MS = 2400; // WEB fade-in süresi (yavaş)
const ERA_FADE_DURATION_MS = 2400; // ERA fade-in süresi
const WEB_PHASE_MS = 3000; // WEB tamamen gelene kadar + ERA'ya geçmeden önce bekleme
const ERA_PHASE_MS = 1600; // ERA gösterildikten sonra static'e geçmeden önce bekleme
const STATIC_DURATION_MS = 5000;

type LogoPhase = "t" | "t_glow" | "web" | "era" | "static";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [phase, setPhase] = useState<LogoPhase>("t");
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const clearAll = () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };

    if (phase === "t") {
      const t = setTimeout(() => setPhase("t_glow"), T_FADE_MS);
      timeoutsRef.current.push(t);
    } else if (phase === "t_glow") {
      const t = setTimeout(() => setPhase("web"), T_GLOW_MS);
      timeoutsRef.current.push(t);
    } else if (phase === "web") {
      const t = setTimeout(() => setPhase("era"), WEB_PHASE_MS);
      timeoutsRef.current.push(t);
    } else if (phase === "era") {
      const t = setTimeout(() => setPhase("static"), ERA_PHASE_MS);
      timeoutsRef.current.push(t);
    } else if (phase === "static") {
      const t = setTimeout(() => setPhase("t"), STATIC_DURATION_MS);
      timeoutsRef.current.push(t);
    }

    return () => clearAll();
  }, [phase]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:px-6 sm:pt-4 md:px-8"
    >
      <motion.nav
        animate={{
          backgroundColor: "#1a1a1a",
          borderColor: "rgba(255, 255, 255, 0.06)",
        }}
        transition={{ duration: 0.25 }}
        className="flex w-full max-w-6xl items-center justify-between rounded-xl border px-4 py-2.5 backdrop-blur-xl xl:max-w-7xl sm:rounded-2xl sm:px-6 sm:py-3 md:px-8"
        style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.2)" }}
      >
        <a
          href="#"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 sm:gap-3"
        >
          <Image
            src="/icon.svg"
            alt=""
            width={28}
            height={28}
            className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
          />
          <span
            className="inline-flex min-w-[5.5rem] text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            {phase === "static" ? (
              <span style={{ color: "#ffffff" }}>WEBTERA</span>
            ) : phase === "t" ? (
              <motion.span
                key="t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: T_FADE_MS / 1000, ease: "easeOut" }}
                className="inline-block"
              >
                T
              </motion.span>
            ) : phase === "t_glow" ? (
              <span
                className="inline-block"
                style={{
                  animation: "nav-t-lightsaber 3s ease-in-out forwards",
                }}
              >
                T
              </span>
            ) : phase === "web" ? (
              <>
                <motion.span
                  key="web"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: WEB_FADE_DURATION_MS / 1000, ease: "easeOut" }}
                  className="inline-block"
                >
                  WEB
                </motion.span>
                <span className="inline-block">T</span>
              </>
            ) : (
              <>
                <span className="inline-block">WEB</span>
                <span className="inline-block">T</span>
                <motion.span
                  key="era"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: ERA_FADE_DURATION_MS / 1000, ease: "easeOut" }}
                  className="inline-block"
                >
                  ERA
                </motion.span>
              </>
            )}
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[#aaaaaa] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="min-h-[44px] min-w-[44px] p-2 text-[#aaaaaa] md:hidden hover:text-white"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        className="fixed inset-x-0 top-[56px] z-40 flex justify-center px-4 sm:top-[64px] sm:px-6 md:px-8 md:hidden"
      >
        <div className="w-full max-w-6xl rounded-xl border border-white/[0.06] bg-[#1a1a1a] px-4 py-4 backdrop-blur-xl xl:max-w-7xl sm:rounded-2xl sm:px-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-[#aaaaaa] transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.header>
  );
}
