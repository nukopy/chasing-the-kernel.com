import i18next from "i18next";
import Backend from "i18next-http-backend";
import { RemixI18Next } from "remix-i18next/server";

export const defaultNS = "common";
export const fallbackLng = "ja";
export const supportedLngs = ["ja", "en"];

export const remixI18Next = new RemixI18Next({
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
