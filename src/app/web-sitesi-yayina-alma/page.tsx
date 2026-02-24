import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Sitesi Yayına Alma | Çerkezköy Tekirdağ | Webtera",
  description:
    "Web sitenizi hızlı ve güvenli şekilde yayına alıyoruz: domain, hosting, SSL, performans ve temel SEO ayarları. Çerkezköy/Tekirdağ.",
  alternates: { canonical: "/web-sitesi-yayina-alma" },
};

export default function Page() {
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 md:px-10 pt-28 pb-16">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
        Web Sitesi Yayına Alma
      </h1>

      <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400">
        Çerkezköy ve Tekirdağ’da web sitenizi domain, hosting ve SSL dahil olmak
        üzere uçtan uca yayına alıyoruz. Performans kontrolleri ve temel SEO
        ayarlarını da tamamlayıp sorunsuz teslim ediyoruz.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/#contact"
          className="min-h-[44px] min-w-[44px] rounded-xl border border-sky-400 bg-[#0c1929] px-6 py-3.5 text-center font-medium text-sky-300 transition-colors hover:bg-[#0f2744] hover:border-sky-300 active:scale-[0.98]"
        >
          Yayına Alma Teklifi Al
        </Link>

        <Link
          href="/"
          className="min-h-[44px] min-w-[44px] rounded-xl border border-brand-border bg-white/[0.04] px-6 py-3.5 text-center font-medium text-zinc-200 backdrop-blur-sm transition-colors hover:bg-white/[0.07] active:scale-[0.98]"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  );
}