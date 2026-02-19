import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Web Tasarım & Web Sitesi | SEO Uyumlu Kurumsal Çözümler | Webtera",
  description:
    "Webtera ile modern web tasarım ve kurumsal web sitesi çözümleri. Mobil uyumlu, hızlı, SEO altyapılı ve dönüşüm odaklı tasarım. Teklif alın, hızlı başlayın.",
  openGraph: {
    title: "Web Tasarım & Web Sitesi | SEO Uyumlu Kurumsal Çözümler | Webtera",
    description:
      "Webtera ile modern web tasarım ve kurumsal web sitesi çözümleri. Mobil uyumlu, hızlı, SEO altyapılı ve dönüşüm odaklı tasarım. Teklif alın, hızlı başlayın.",
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
