"use client";

import { motion } from "framer-motion";

const highlights = [
  "Web deneyiminde öne çıkın",
  "Yapay zeka ile büyüyün",
  "Süreçleri bize bırakın",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-brand-border py-16 sm:py-20 md:py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 sm:gap-12 md:grid-cols-2 md:gap-16"
        >
          <div>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-3 font-mono text-sm uppercase tracking-widest text-sky-300 sm:mb-4 sm:text-lg"
            >
              Hakkımızda
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mb-5 text-2xl font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #7dd3fc, #6ee7b7, #7dd3fc)",
                  backgroundSize: "200% 100%",
                  animation: "gradient-breath 4s ease-in-out infinite",
                }}
              >
                Webtera
                <br />
                Olarak Biz
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-l-2 border-sky-400/40 pl-4 font-mono text-sm text-sky-300/90 sm:pl-6 md:block md:flex-none md:gap-0 md:border-l-2 md:pl-6"
            >
              {highlights.map((text) => (
                <div key={text} className="mb-2 last:mb-0 md:mb-2">
                  <span className="text-sky-200/90">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="space-y-4 sm:space-y-5">
            {[
              "On yılı aşkın altyapı tecrübesini estetik web tasarımıyla birleştiren, uçtan uca dijital süreç yönetimi sunan bir teknoloji ofisiyiz.",
              "Web sitelerini yalnızca görsel bir ürün olarak değil, işletmenizin dijital dünyadaki en stratejik varlığı olarak konumlandırıyoruz. Kodlamadan tasarıma, bulut altyapısından SEO'ya kadar tüm süreçleri bütünleşik bir sistem olarak yönetiyoruz.",
              "Projelerimizin arka planındaki güvenlik, hız ve sürdürülebilirliği sistem mühendisi titizliğiyle inşa ediyoruz. Yapay zeka entegrasyonları, periyodik bakım ve dijital reklam yönetimiyle büyüme sürecinizi uçtan uca sahipleniyoruz.",
              "Karmaşık teknolojik süreçleri biz üstleniyoruz; siz dijital dünyada sorunsuz ve kârlı bir varlık gösterin diye.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-sm text-zinc-400 leading-relaxed sm:text-base"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
