import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro:schema";

const contentSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.coerce.date(),
	updatedAt: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	status: z.enum(["draft", "published", "archived"]),
});

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
	schema: contentSchema,
});

const wiki = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/wiki" }),
	schema: contentSchema,
});

export const collections = { blog, wiki };
