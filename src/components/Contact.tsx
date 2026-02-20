"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const contact = {
  email: "info@webtera.tr",
  linkedin: "https://www.linkedin.com/in/tugay-tulgar-981ab6141/",
  github: "https://github.com/tugaytulgar/",
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-brand-border py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-sky-300 sm:mb-4 sm:text-base">
            İletişim
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #7dd3fc, #6ee7b7, #7dd3fc)",
                backgroundSize: "200% 100%",
                animation: "gradient-breath 4s ease-in-out infinite",
              }}
            >
              Birlikte Çalışalım
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-6 md:gap-8 lg:gap-12"
        >
          <a
            href={`mailto:${contact.email}`}
            className="group flex min-h-[56px] items-center gap-3 rounded-xl border border-brand-border bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm transition-colors hover:border-brand-electric-blue/30 hover:bg-white/[0.07] active:scale-[0.99] sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-4"
          >
            <div className="rounded-lg border border-brand-border bg-brand-electric-blue/10 p-3">
              <Mail
                className="h-5 w-5 text-brand-electric-blue"
                strokeWidth={1.5}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-zinc-500">E-posta</p>
              <p className="break-all text-sm text-white transition-colors group-hover:text-brand-electric-blue sm:text-lg">
                {contact.email}
              </p>
            </div>
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[56px] items-center gap-3 rounded-xl border border-brand-border bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm transition-colors hover:border-brand-electric-blue/30 hover:bg-white/[0.07] active:scale-[0.99] sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-4"
          >
            <div className="rounded-lg border border-brand-border bg-brand-electric-blue/10 p-3">
              <Linkedin
                className="h-5 w-5 text-brand-electric-blue"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500">LinkedIn</p>
              <p className="text-white transition-colors group-hover:text-brand-electric-blue">
                Profil
              </p>
            </div>
          </a>

          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[56px] items-center gap-3 rounded-xl border border-brand-border bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm transition-colors hover:border-brand-emerald-green/30 hover:bg-white/[0.07] active:scale-[0.99] sm:gap-4 sm:rounded-2xl sm:px-6 sm:py-4"
          >
            <div className="rounded-lg border border-brand-border bg-brand-emerald-green/10 p-3">
              <Github
                className="h-5 w-5 text-brand-emerald-green"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500">GitHub</p>
              <p className="text-white transition-colors group-hover:text-brand-emerald-green">
                Repolar
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
