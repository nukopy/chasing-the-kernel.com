import {
  index,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

const routesJa = [
  index("./routes/home.tsx", { id: "home-ja" }),
  route("contents", "./routes/contents.tsx", { id: "contents-ja" }),
  route("contents/:slug", "./routes/contents.$slug.tsx", {
    id: "contents-slug-ja",
  }),
  route("tags", "./routes/tags.tsx", { id: "tags-ja" }),
  route("tags/:tag", "./routes/tags.$tag.tsx", { id: "tags-tag-ja" }),
];
const routesEn = [
  index("./routes/home.tsx", { id: "home-en" }),
  route("contents", "./routes/contents.tsx", { id: "contents-en" }),
  route("contents/:slug", "./routes/contents.$slug.tsx", {
    id: "contents-slug-en",
  }),
  route("tags", "./routes/tags.tsx", { id: "tags-en" }),
  route("tags/:tag", "./routes/tags.$tag.tsx", { id: "tags-tag-en" }),
];

export default [...routesJa, ...prefix("en", routesEn)] satisfies RouteConfig;
