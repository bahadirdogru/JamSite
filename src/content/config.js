import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    ref: z.string().optional(),
    lang: z.enum(["tr", "en"]),
  }),
});

const pagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(["tr", "en"]),
    pageId: z.string(),
  }),
});

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
};
