"use client";

import { motion } from "framer-motion";
import { useContactForm } from "@/contexts/ContactFormContext";

export default function Hero() {
  const { openContact } = useContactForm();
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Technical Grid – yavaş hareket eden arka plan */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-40"
        style={{
          animation: "grid-drift 20s ease-in-out infinite",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-background" />

      {/* Ambient glow – mobilde daha küçük */}
      <div
        className="absolute left-1/2 top-1/2 h-[300px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-electric-blue/10 blur-[80px] sm:h-[400px] sm:w-[480px] sm:blur-[100px] md:h-[500px] md:w-[600px] md:blur-[120px]"
        style={{ animation: "glow-pulse 8s ease-in-out infinite" }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mx-4 max-w-4xl px-2 text-center sm:mx-6 sm:px-4 md:mx-8"
      >
        <p className="mb-3 font-mono text-[10px] uppercase leading-tight tracking-[0.15em] text-brand-electric-blue sm:mb-4 sm:text-xs sm:tracking-[0.25em] md:tracking-[0.3em]">
          NEXT GENERATION WEB EXPERIENCES
        </p>

        <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight text-white sm:mb-6 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #3b82f6, #38bdf8, #10b981, #34d399, #3b82f6)",
              backgroundSize: "300% 100%",
              animation: "gradient-breath 5s ease-in-out infinite",
            }}
          >
            Webtera
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
          Webtera ile web siteniz sadece bir adres değil; merak uyandıran, güven veren
          ve yapay zeka ile yaşayan bir büyüme aracıdır. Tüm süreci biz yönetiyoruz,
          siz sadece sonuca odaklanıyorsunuz.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-4">
          <button
            type="button"
            onClick={openContact}
            className="min-h-[44px] min-w-[44px] rounded-lg border border-brand-electric-blue bg-brand-electric-blue/10 px-6 py-3.5 text-center font-medium text-brand-electric-blue transition-colors hover:bg-brand-electric-blue/20 active:scale-[0.98] sm:py-3"
          >
            Dijital Dünyanı Kur
          </button>
          <a
            href="#services"
            className="min-h-[44px] min-w-[44px] rounded-lg border border-brand-emerald-green bg-brand-emerald-green/10 px-6 py-3.5 text-center font-medium text-brand-emerald-green transition-colors hover:bg-brand-emerald-green/20 hover:border-brand-emerald-green/50 active:scale-[0.98] sm:py-3"
          >
            Ne Yapıyoruz?
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-background to-transparent" />
    </section>
  );
}
