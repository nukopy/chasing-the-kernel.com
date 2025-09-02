import i18next from "i18next";
import Backend from "i18next-http-backend";
import { createRemixI18NextBackend } from "remix-i18next/server";

export const defaultNS = "common";
export const fallbackLng = "ja";
export const supportedLngs = ["ja", "en"];

export const remixI18Next = createRemixI18NextBackend({
  detection: {
    supportedLanguages: supportedLngs,
    fallbackLanguage: fallbackLng,
  },
  i18next: {
    ...i18next,
    backend: Backend,
  },
  backend: Backend,
});

export { i18next };
