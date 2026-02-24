export const metadata = {
    title: "Web Sitesi Bakım | Çerkezköy Tekirdağ | Webtera",
    description:
      "Web sitesi bakım, içerik güncelleme, hız/SEO iyileştirme ve güvenlik kontrolleri. Çerkezköy ve Tekirdağ’da düzenli destek.",
    alternates: { canonical: "/web-sitesi-bakim" },
  };
  
  export default function Page() {
    return (
      <main className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 md:px-10 pt-28 pb-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Web Sitesi Bakım
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400">
          İçerik güncellemeleri, hız optimizasyonu, temel SEO kontrolleri ve güvenlik
          bakımı ile siteniz güncel ve sorunsuz kalsın.
        </p>
      </main>
    );
  }