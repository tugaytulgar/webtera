"use client";

import { motion } from "framer-motion";

export default function Hero() {
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
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-4 max-w-4xl px-2 text-center sm:mx-6 sm:px-4 md:mx-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-3 font-mono text-[10px] uppercase leading-tight tracking-[0.15em] text-brand-electric-blue sm:mb-4 sm:text-xs sm:tracking-[0.25em] md:tracking-[0.3em]"
        >
          NEXT GENERATION WEB EXPERIENCES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 text-3xl font-bold leading-tight tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          {" "}
          <span className="bg-gradient-to-r from-brand-electric-blue to-brand-emerald-green bg-clip-text text-transparent">
            Webtera
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl"
        >
          Webtera ile web siteniz sadece bir adres değil; merak uyandıran, güven veren
          ve yapay zeka ile yaşayan bir büyüme aracıdır. Tüm süreci biz yönetiyoruz,
          siz sadece sonuca odaklanıyorsunuz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-4"
        >
          <a
            href="#services"
            className="min-h-[44px] min-w-[44px] rounded-lg border border-brand-electric-blue bg-brand-electric-blue/10 px-6 py-3.5 text-center font-medium text-brand-electric-blue transition-colors hover:bg-brand-electric-blue/20 active:scale-[0.98] sm:py-3"
          >
            Dijital Dünyanı Kur
          </a>
          <a
            href="#services"
            className="min-h-[44px] min-w-[44px] rounded-lg border border-zinc-600 px-6 py-3.5 text-center font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white active:scale-[0.98] sm:py-3"
          >
            Neleri Yönetiyoruz?
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-background to-transparent" />
    </section>
  );
}
