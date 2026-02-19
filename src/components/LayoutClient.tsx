"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
  loading: () => (
    <header
      className="fixed top-0 left-0 right-0 z-50 mx-3 mt-3 rounded-xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl sm:mx-4 sm:mt-4 sm:px-6 md:mx-8 md:px-8"
      style={{ minHeight: 52 }}
    />
  ),
});

const ContactFormButton = dynamic(() => import("@/components/ContactFormButton"), {
  ssr: false,
});

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <ContactFormButton />
    </>
  );
}
