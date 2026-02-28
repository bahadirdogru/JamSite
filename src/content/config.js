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

export const collections = {
  posts: postsCollection,
};
