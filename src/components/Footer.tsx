"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-brand-border py-8 sm:py-10 md:py-12"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:gap-5 md:flex-row md:text-left">
          <p className="font-mono text-xs text-zinc-500">© Webtera</p>
          <p className="text-xs text-zinc-500 sm:text-sm">
            Geleceğin iş kartı—minimal metin, maksimum etki.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
