/// <reference types="node" />
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const FrontmatterSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()).optional(),
  summary: z.string(),
  language: z.string().optional(),
});

const getAppDir = () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  // このファイル: app/lib/content-collections/index.ts
  // なので 3つ上がプロジェクトルート
  const projectRoot = path.resolve(here, "../../../../..");
  const appDir = path.join(projectRoot, "app");

  console.info("--------------------------------");
  console.info("import.meta.url:", import.meta.url);
  console.info("here:", here);
  console.info("projectRoot:", projectRoot);
  console.info("appDir:", appDir);
  console.info("--------------------------------");

  return appDir;
};
const appDir = getAppDir();

// ref: https://www.content-collections.dev/docs/configuration
const contents = defineCollection({
  name: "contents",
  directory: "../../../app/contents",
  include: ["**/*.md", "**/*.mdx"],
  parser: "frontmatter",
  // typeName: generated type name in `.content-collections/generated/index.d.ts`
  typeName: "Content",
  schema: FrontmatterSchema,
  transform: async (document, context) => {
    // Extract language from file path (e.g. "ja/hello-world" -> "ja")
    const pathParts = document._meta.path.split('/');
    const language = pathParts.length > 1 ? pathParts[0] : 'ja'; // default to Japanese
    
    if (document._meta.extension === "mdx") {
      const mdx = await compileMDX({ cache: context.cache }, document, {
        cwd: appDir,
      });

      return {
        ...document,
        language,
        mdx,
        html: "",
      };
    } else if (document._meta.extension === "md") {
      const html = await compileMarkdown({ cache: context.cache }, document);

      return {
        ...document,
        language,
        mdx: "",
        html,
      };
    }

    throw new Error(`Unsupported extension: ${document._meta.extension}`);
  },
  // logging
  onSuccess: (contents) => {
    console.info(`generated collection with ${contents.length} contents`);
  },
});

export default defineConfig({
  collections: [contents],
});
