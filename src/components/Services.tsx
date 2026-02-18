"use client";

import { motion } from "framer-motion";
import { Globe, Bot, Cloud } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Tasarım & SEO",
    description:
      "Kullanıcı odaklı, performanslı web siteleri ve organik trafik optimizasyonu.",
    accent: "electric-blue",
    tags: ["UX", "SEO", "Performans"],
  },
  {
    icon: Cloud,
    title: "Bulut Altyapısı & Yayın",
    description:
      "Web sitenizi hızlı, güvenli ve ölçeklenebilir bulut altyapısında yayına alıyoruz. Hosting, domain ve SSL süreçlerini biz yönetiyoruz.",
    accent: "electric-blue",
    tags: ["Hosting", "SSL", "Bulut"],
  },
  {
    icon: Bot,
    title: "AI & Otomasyon Çözümleri",
    description:
      "AI Agentlar ve iş akış otomasyonu ile süreçlerinizi hızlandırın.",
    accent: "emerald-green",
    tags: ["n8n", "Agentlar", "İş Akışı"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
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
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-brand-electric-blue sm:mb-4">
            Hizmetler
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Neler Sunuyoruz
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-xl border border-brand-border bg-white/[0.04] p-4 backdrop-blur-sm transition-colors hover:bg-white/[0.07] sm:rounded-2xl sm:p-6 ${
                service.accent === "emerald-green"
                  ? "hover:border-brand-emerald-green/25"
                  : "hover:border-brand-electric-blue/25"
              }`}
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              }}
            >
              <motion.div
                className="mb-4 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <service.icon
                  className={`h-10 w-10 ${
                    service.accent === "emerald-green"
                      ? "text-brand-emerald-green"
                      : "text-brand-electric-blue"
                  }`}
                  strokeWidth={1.5}
                />
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
                {service.title}
              </h3>
              <p className="mb-3 text-sm leading-relaxed text-zinc-400 sm:mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-brand-border bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
