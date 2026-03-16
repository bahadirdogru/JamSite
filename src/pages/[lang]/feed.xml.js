import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { site, features, getStaticPathsForLang } from "../../config/site.js";

export function getStaticPaths() {
  return getStaticPathsForLang();
}

export async function GET(context) {
  const { lang } = context.params;
  
  if (!features.rss) {
    return new Response(null, { status: 404 });
  }

  const posts = (await getCollection("posts"))
    .filter((p) => p.data.lang === lang)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const baseUrl = context.site?.toString() || site.url || "https://jamsite.example.com";
  
  return rss({
    title: `${site.title} – Blog (${lang.toUpperCase()})`,
    description: site.description,
    site: baseUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `${baseUrl}/${lang}/blog/${post.id}/`,
    })),
  });
}
