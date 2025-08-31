import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const FrontmatterSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()).optional(),
  summary: z.string(),
});

// ref: https://www.content-collections.dev/docs/configuration
const contents = defineCollection({
  name: "contents",
  directory: "../../../app/contents",
  include: "**/*.md",
  parser: "frontmatter",
  // typeName: generated type name in `.content-collections/generated/index.d.ts`
  typeName: "Content",
  schema: FrontmatterSchema,
  // logging
  onSuccess: (contents) => {
    console.info(`generated collection with ${contents.length} contents`);
  },
});

export default defineConfig({
  collections: [contents],
});
