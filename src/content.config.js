import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import { languages } from "./config/site.js";

const langSchema = z.enum(languages);

const heroBlockSchema = z.object({
  type: z.literal("hero"),
  layout: z.enum(["centered", "split"]).default("centered"),
  badge: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  primaryCtaText: z.string(),
  primaryCtaHref: z.string(),
  secondaryCtaText: z.string().optional(),
  secondaryCtaHref: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const featureItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

const featureBlockSchema = z.object({
  type: z.literal("feature"),
  layout: z.enum(["grid", "screenshot"]).default("grid"),
  heading: z.string(),
  subheading: z.string().optional(),
  features: z.array(featureItemSchema),
  image: z.string().optional(),
});

const ctaBlockSchema = z.object({
  type: z.literal("cta"),
  variant: z.enum(["simple", "panel"]).default("simple"),
  title: z.string(),
  description: z.string().optional(),
  ctaText: z.string(),
  ctaHref: z.string(),
  image: z.string().optional(),
});

const statItemSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const statsBlockSchema = z.object({
  type: z.literal("stats"),
  stats: z.array(statItemSchema),
});

const testimonialItemSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  avatar: z.string().optional(),
});

const testimonialsBlockSchema = z.object({
  type: z.literal("testimonials"),
  heading: z.string().optional(),
  testimonials: z.array(testimonialItemSchema),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const faqBlockSchema = z.object({
  type: z.literal("faq"),
  layout: z.enum(["list", "accordion"]).default("list"),
  heading: z.string().optional(),
  items: z.array(faqItemSchema),
});

const featuredPostsBlockSchema = z.object({
  type: z.literal("featured-posts"),
  heading: z.string(),
  count: z.number().default(3),
});

const blockSchema = z.discriminatedUnion("type", [
  heroBlockSchema,
  featureBlockSchema,
  ctaBlockSchema,
  statsBlockSchema,
  testimonialsBlockSchema,
  faqBlockSchema,
  featuredPostsBlockSchema,
]);

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    ref: z.string().optional(),
    lang: langSchema,
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: langSchema,
    pageId: z.string(),
    blocks: z.array(blockSchema).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
};
