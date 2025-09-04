import {
  index,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

const LANGUAGE_ID_MAP = {
  ja: "ja",
  en: "en",
} as const;

function createBaseRoutes(language: keyof typeof LANGUAGE_ID_MAP) {
  return [
    // root
    index(`./routes/home.tsx`, { id: `home-${language}` }),

    // /contents
    route("contents", `./routes/contents.tsx`, {
      id: `contents-${language}`,
    }),
    // /contents/:slug
    route("contents/:slug", `./routes/contents.$slug.tsx`, {
      id: `contents-slug-${language}`,
    }),

    // /tags
    route("tags", `./routes/tags.tsx`, { id: `tags-${language}` }),
    // /tags/:tag
    route("tags/:tag", `./routes/tags.$tag.tsx`, {
      id: `tags-slug-${language}`,
    }),

    // /misc
    route(
      "misc",
      `./routes/misc/index.tsx`,
      {
        id: `misc-${language}`,
      },
      [
        route("test-props", `./routes/misc/test-props.tsx`, {
          id: `misc-test-props-${language}`,
        }),
        route(
          "test-get-root-loader",
          `./routes/misc/test-get-root-loader.tsx`,
          {
            id: `misc-test-get-root-loader-${language}`,
          },
        ),
      ],
    ),

    // /about
    route("about", `./routes/about.tsx`, { id: `about-${language}` }),

    // /not-found
    route("*", `./routes/not-found.tsx`, { id: `not-found-${language}` }),
  ];
}

function createRoutes(language: keyof typeof LANGUAGE_ID_MAP) {
  const baseRoutes = createBaseRoutes(language);

  // if ja, we don't use prefix
  if (language === LANGUAGE_ID_MAP.ja) {
    return baseRoutes;
  }

  // if not ja, we use prefix
  return prefix(language, baseRoutes);
}

// create routes
const routesJa = createRoutes(LANGUAGE_ID_MAP.ja);
const routesEn = createRoutes(LANGUAGE_ID_MAP.en);
const routes = [...routesJa, ...routesEn];

export default routes satisfies RouteConfig;
