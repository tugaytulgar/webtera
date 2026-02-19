"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type ContactFormContextType = {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
};

const ContactFormContext = createContext<ContactFormContextType | null>(null);

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openContact = useCallback(() => setIsOpen(true), []);
  const closeContact = useCallback(() => setIsOpen(false), []);

  return (
    <ContactFormContext.Provider value={{ isOpen, openContact, closeContact }}>
      {children}
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const ctx = useContext(ContactFormContext);
  if (!ctx) throw new Error("useContactForm must be used within ContactFormProvider");
  return ctx;
}
