import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site } from "../config/site.js";

export async function GET(context) {
  const posts = (await getCollection("posts"))
    .filter((p) => p.data.lang === "tr")
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const baseUrl = context.site?.toString() || site.url || "https://jamsite.example.com";
  return rss({
    title: `${site.title} – Blog`,
    description: site.description,
    site: baseUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `${baseUrl}/blog/${post.id.replace(/\.md$/, "")}/`,
    })),
  });
}
