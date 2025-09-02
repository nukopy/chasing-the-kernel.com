import { createCookie } from "react-router";
import { unstable_createI18nextMiddleware } from "remix-i18next/middleware";
import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from "../lib/i18n";
import en from "../lib/i18n/locales/en";
import ja from "../lib/i18n/locales/ja";

export const localeCookie = createCookie("lng", {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
});

export const [i18nextMiddleware, getLocale, getInstance] =
  unstable_createI18nextMiddleware({
    detection: {
      supportedLanguages: SUPPORTED_LANGUAGES,
      fallbackLanguage: FALLBACK_LANGUAGE,
      // get locale from request
      // ref: https://github.com/sergiodxa/remix-i18next?tab=readme-ov-file#finding-the-locale-from-the-request-url-pathname
      // TODO:  Cookie 対応 https://github.com/sergiodxa/remix-i18next?tab=readme-ov-file#store-the-locale-in-a-cookie
      findLocale(request) {
        const url = new URL(request.url);
        const language = url.pathname.split("/")[1];

        // check if language is supported
        if (SUPPORTED_LANGUAGES.includes(language)) {
          return Promise.resolve(language);
        }

        return Promise.resolve(FALLBACK_LANGUAGE);
      },
      cookie: localeCookie,
    },
    i18next: {
      resources: { en: { translation: en }, ja: { translation: ja } },
      // Other i18next options are available here
    },
  });
