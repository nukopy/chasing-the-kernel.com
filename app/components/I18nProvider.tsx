"use client";

import { createContext, useContext, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import "../lib/i18n/i18n.client";
import { i18next } from "../lib/i18n";

interface LanguageContextType {
  language: string;
}

const LanguageContext = createContext<LanguageContextType>({ language: "ja" });

export function useLanguage() {
  return useContext(LanguageContext);
}

interface I18nProviderProps {
  children: React.ReactNode;
  language?: string;
}

export function I18nProvider({ children, language = "ja" }: I18nProviderProps) {
  useEffect(() => {
    if (i18next.language !== language) {
      i18next.changeLanguage(language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language }}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  );
}
