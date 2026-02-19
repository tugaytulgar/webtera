import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ContactFormButton from "@/components/ContactFormButton";
import { ContactFormProvider } from "@/contexts/ContactFormContext";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const GA_MEASUREMENT_ID = "G-YK3PHEPTQV";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://webtera.tr/#organization",
      name: "Webtera",
      url: "https://webtera.tr/",
      logo: "https://webtera.tr/icon.svg",
      email: "tulgartugay@gmail.com",
      sameAs: [
        "https://www.linkedin.com/in/tugay-tulgar-981ab6141/",
        "https://github.com/tugaytulgar/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://webtera.tr/#website",
      url: "https://webtera.tr/",
      name: "Webtera",
      publisher: { "@id": "https://webtera.tr/#organization" },
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": "https://webtera.tr/#localbusiness",
      name: "Webtera",
      url: "https://webtera.tr/",
      logo: "https://webtera.tr/icon.svg",
      email: "tulgartugay@gmail.com",
      sameAs: [
        "https://www.linkedin.com/in/tugay-tulgar-981ab6141/",
        "https://github.com/tugaytulgar/",
      ],
      areaServed: [
        { "@type": "Country", name: "TR" },
        { "@type": "City", name: "Tekirdağ" },
        { "@type": "City", name: "Çerkezköy" },
        { "@type": "City", name: "İstanbul" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Hizmetler",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Web tasarım" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Web sitesi" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "SEO" },
          },
        ],
      },
    },
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Webtera",
  metadataBase: new URL("https://webtera.tr"),
  alternates: {
    canonical: "/",
  },
  icons: { icon: "/icon.svg" },
  description:
    "On yılı aşkın altyapı tecrübesiyle estetik web tasarımını birleştiren, uçtan uca dijital süreç yönetimi sunan Webtera teknoloji ofisi. IT altyapısı, AI otomasyon, web tasarım ve SEO.",
  keywords: [
    "Webtera",
    "IT Infrastructure",
    "AI Automation",
    "Digital Transformation",
    "Web Tasarım",
    "SEO",
    "Teknoloji Ofisi",
  ],
  openGraph: {
    title: "Webtera",
    description:
      "On yılı aşkın altyapı tecrübesiyle estetik web tasarımını birleştiren, uçtan uca dijital süreç yönetimi sunan teknoloji ofisi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen min-w-0 bg-[#0a0a0a] font-sans text-zinc-50 antialiased`}
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <ContactFormProvider>
          {process.env.NODE_ENV === "production" && <GoogleAnalytics />}
          <div className="min-h-screen">
            <Navbar />
            {children}
            <ContactFormButton />
          </div>
        </ContactFormProvider>
      </body>
    </html>
  );
}
