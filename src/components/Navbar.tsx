"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", label: "Hakkımızda" },
  { href: "#services", label: "Hizmetler" },
  { href: "#contact", label: "İletişim" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.nav
        animate={{
          backgroundColor: scrolled ? "rgba(10, 10, 10, 0.85)" : "rgba(255, 255, 255, 0.05)",
          borderColor: scrolled ? "rgba(59, 130, 246, 0.15)" : "rgba(255, 255, 255, 0.08)",
        }}
        transition={{ duration: 0.25 }}
        className="mx-3 mt-3 flex items-center justify-between rounded-xl border px-4 py-2.5 backdrop-blur-xl sm:mx-4 sm:mt-4 sm:rounded-2xl sm:px-6 sm:py-3 md:mx-8 md:px-8"
        style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.15)" }}
      >
        <a
          href="#"
          className="font-mono text-sm font-medium tracking-wider text-white transition-colors hover:text-brand-electric-blue"
        >
          WEBTERA
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="min-h-[44px] min-w-[44px] p-2 text-zinc-400 md:hidden"
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
        className="fixed inset-x-0 top-[56px] z-40 px-3 sm:top-[64px] sm:px-4 md:hidden"
      >
        <div className="mx-3 rounded-xl border border-brand-border bg-brand-background/95 px-4 py-4 backdrop-blur-xl sm:mx-4 sm:rounded-2xl sm:px-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-zinc-400 transition-colors hover:text-white"
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
