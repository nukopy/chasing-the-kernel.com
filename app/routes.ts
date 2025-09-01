import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // Japanese (default) routes - no language prefix
  index("routes/home.tsx"),
  route("contents", "routes/contents.tsx"),
  route("contents/:slug", "routes/contents.$slug.tsx"),
  route("tags", "routes/tags.tsx"),
  route("tags/:tag", "routes/tags.$tag.tsx"),

  // English routes with language prefix
  route("en", "routes/en/layout.tsx", [
    index("routes/en/home.tsx"),
    route("contents", "routes/en/contents.tsx"),
    route("contents/:slug", "routes/en/contents.$slug.tsx"),
    route("tags", "routes/en/tags.tsx"),
    route("tags/:tag", "routes/en/tags.$tag.tsx"),
  ]),
] satisfies RouteConfig;
