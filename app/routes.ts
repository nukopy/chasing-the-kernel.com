import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // /contents
  route("contents", "routes/contents.tsx"),
  route("contents/:slug", "routes/contents.$slug.tsx"),

  // /tags
  route("tags", "routes/tags.tsx"),
  route("tags/:tag", "routes/tags.$tag.tsx"),
] satisfies RouteConfig;
