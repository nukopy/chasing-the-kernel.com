import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // Japanese (default) routes - no language prefix
  index("routes/home.tsx"),
  route("contents", "routes/contents.tsx"),
  route("contents/:slug", "routes/contents.$slug.tsx"),
  route("tags", "routes/tags.tsx"),
  route("tags/:tag", "routes/tags.$tag.tsx"),

  // English routes with language prefix - reusing same components
  route("en", undefined, [
    index("routes/home.tsx"),
    route("contents", "routes/contents.tsx"),
    route("contents/:slug", "routes/contents.$slug.tsx"),
    route("tags", "routes/tags.tsx"),
    route("tags/:tag", "routes/tags.$tag.tsx"),
  ]),
] satisfies RouteConfig;
