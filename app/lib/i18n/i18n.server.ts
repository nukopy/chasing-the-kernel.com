import i18next from "i18next";
import { RemixI18Next } from "remix-i18next/server";
import { defaultNS, fallbackLng, supportedLngs } from ".";

export const i18n = new RemixI18Next({
  detection: {
    supportedLanguages: supportedLngs,
    fallbackLanguage: fallbackLng,
    order: ["header"],
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
