"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useContactForm } from "@/contexts/ContactFormContext";

// Formspree endpoint - formspree.io'dan form oluşturup buraya ID'nizi yapıştırın
const FORMSPREE_ENDPOINT = "https://formspree.io/f/meelzldj";

export default function ContactFormButton() {
  const { isOpen, openContact, closeContact } = useContactForm();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Floating Button - gizlenir panel açıkken */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={openContact}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-brand-electric-blue/50 bg-brand-background/90 shadow-lg shadow-brand-electric-blue/20 backdrop-blur-xl transition-colors hover:border-brand-electric-blue hover:bg-brand-electric-blue/10 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
            aria-label="Mesaj gönder"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle
              className="h-6 w-6 text-brand-electric-blue sm:h-7 sm:w-7"
              strokeWidth={1.5}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeContact}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              aria-hidden
            />
            {/* Form Panel */}
            <motion.div
              key="panel"
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border-t border-x border-brand-border bg-brand-background/95 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-8 sm:max-h-[85vh] sm:rounded-2xl sm:border"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-brand-border bg-brand-background/95 px-4 py-3 backdrop-blur-sm sm:px-6 sm:py-4">
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  Bize Ulaşın
                </h3>
                <button
                  onClick={closeContact}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Kapat"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-4 sm:p-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="ad"
                      className="mb-1.5 block font-mono text-xs text-zinc-500"
                    >
                      Ad
                    </label>
                    <input
                      id="ad"
                      name="Ad"
                      type="text"
                      required
                      className="w-full rounded-lg border border-brand-border bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-brand-electric-blue/50"
                      placeholder="Adınız"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="soyad"
                      className="mb-1.5 block font-mono text-xs text-zinc-500"
                    >
                      Soyad
                    </label>
                    <input
                      id="soyad"
                      name="Soyad"
                      type="text"
                      required
                      className="w-full rounded-lg border border-brand-border bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-brand-electric-blue/50"
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-mono text-xs text-zinc-500"
                  >
                    E-posta
                  </label>
                  <input
                    id="email"
                    name="Email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-brand-border bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-brand-electric-blue/50"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="mesaj"
                    className="mb-1.5 block font-mono text-xs text-zinc-500"
                  >
                    Mesajınız
                  </label>
                  <textarea
                    id="mesaj"
                    name="Mesaj"
                    rows={4}
                    required
                    className="w-full resize-none rounded-lg border border-brand-border bg-white/5 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-brand-electric-blue/50"
                    placeholder="Mesajınızı yazın..."
                  />
                </div>
                {status === "success" && (
                  <p className="rounded-lg bg-brand-emerald-green/20 p-3 text-sm text-brand-emerald-green">
                    Mesajınız iletildi. En kısa sürede dönüş yapacağız.
                  </p>
                )}
                {status === "error" && (
                  <p className="rounded-lg bg-red-500/20 p-3 text-sm text-red-400">
                    Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-lg border border-brand-electric-blue bg-brand-electric-blue/10 py-3.5 font-medium text-brand-electric-blue transition-colors hover:bg-brand-electric-blue/20 disabled:opacity-50"
                >
                  {status === "sending" ? "Gönderiliyor..." : "Gönder"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
