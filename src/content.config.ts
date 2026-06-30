import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const addons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/addons" }),
  schema: z.object({
    title: z.string(),
    creator: z.string(),
    creatorLink: z.string().optional(),
    type: z.enum(["Addon", "Texture Pack"]),
    description: z.string(),
    mainImage: z.string(),
    youtubeLink: z.string().optional(),
  }),
});

export const collections = { addons };
