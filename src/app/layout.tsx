import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-w-0 font-sans antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
