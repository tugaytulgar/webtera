import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Çerkezköy Web Sitesi Tasarımı | Tekirdağ | Webtera",
  description:
    "Çerkezköy ve Tekirdağ’da kurumsal web sitesi tasarımı. Mobil uyumlu, hızlı, SEO altyapılı modern siteler. Hızlı teklif alın.",
  alternates: {
    canonical: "/web-sitesi-tasarimi",
  },
};

export default function Page() {
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 md:px-10 pt-28 pb-16">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
        Çerkezköy Web Sitesi Tasarımı
      </h1>

      <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400">
        Tekirdağ / Trakya bölgesinde kurumsal, mobil uyumlu ve SEO altyapılı web
        sitesi tasarımı. Hızlı teklif, net süreç, sorunsuz yayın.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Link
          href="/#contact"
          className="min-h-[44px] min-w-[44px] rounded-xl border border-sky-400 bg-[#0c1929] px-6 py-3.5 text-center font-medium text-sky-300 transition-colors hover:bg-[#0f2744] hover:border-sky-300 active:scale-[0.98]"
        >
          Hızlı Teklif Al
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