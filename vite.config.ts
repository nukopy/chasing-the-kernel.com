import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/remix-vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    contentCollections({
      configPath: "./app/lib/content-collections/index.ts",
    }),
  ],
});
