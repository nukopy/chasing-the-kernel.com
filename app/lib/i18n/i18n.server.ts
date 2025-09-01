import { createRemixI18NextBackend } from "remix-i18next/server";
import i18next from "i18next";
import { defaultNS, fallbackLng, supportedLngs } from ".";

export const i18n = createRemixI18NextBackend({
  detection: {
    supportedLanguages: supportedLngs,
    fallbackLanguage: fallbackLng,
    order: ["pathPrefix"],
  },
  i18next: {
    ...i18next,
    supportedLngs,
    defaultNS,
    fallbackLng,
    ns: [defaultNS],
    backend: {
      loadPath: "./public/locales/{{lng}}/{{ns}}.json",
    },
  },
});

export default i18n;