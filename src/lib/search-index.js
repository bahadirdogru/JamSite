/**
 * Build-time search index for Fuse.js.
 * Output: public/search-index.json
 * Run before or during Astro build.
 */

import fs from "fs";
import path from "path";
import { getProducts, getProductPaths } from "../data/products.js";

const STOPWORDS_TR = new Set([
  "ve", "veya", "için", "bir", "bu", "şu", "olarak", "ile", "gibi", "kadar", "da", "de", "ta", "te", "mi", "mı", "mu", "mü", "olan", "var", "yok", "ama", "fakat", "ancak", "ne", "na", "den", "dan", "nin", "nın", "nin", "nun", "nün",
]);
const STOPWORDS_EN = new Set([
  "the", "a", "an", "and", "or", "for", "but", "in", "on", "at", "to", "by", "with", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "must", "can", "this", "that", "these", "those",
]);

function stripStopwords(text, lang) {
  const stop = lang === "tr" ? STOPWORDS_TR : STOPWORDS_EN;
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stop.has(w))
    .join(" ");
}

async function buildIndex() {
  const entries = [];
  const siteBase = "";

  const postsDir = path.join(process.cwd(), "src", "content", "posts");
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
      if (!match) continue;
      const front = match[1];
      const title = front.match(/title:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() ?? "";
      const description = front.match(/description:\s*["']?([^"'\n]+)["']?/)?.[1]?.trim() ?? "";
      const lang = front.match(/lang:\s*(tr|en)/)?.[1] ?? "tr";
      const slug = file.replace(/\.md$/, "");
      const prefix = lang === "tr" ? "" : "/en";
      const url = `${siteBase}${prefix}/blog/${slug}/`;
      const content = stripStopwords((description + " " + title).toLowerCase(), lang);
      entries.push({
        title,
        url,
        slug,
        lang,
        type: "post",
        description,
        content,
      });
    }
  }

  const pages = [
    { path: "/", titleTr: "Ana Sayfa", titleEn: "Home" },
    { path: "/about/", titleTr: "Hakkında", titleEn: "About" },
    { path: "/features/", titleTr: "Özellikler", titleEn: "Features" },
    { path: "/getting-started/", titleTr: "Başlangıç Rehberi", titleEn: "Getting Started" },
    { path: "/blog/", titleTr: "Blog", titleEn: "Blog" },
    { path: "/products/", titleTr: "Ürünler", titleEn: "Products" },
    { path: "/tags/", titleTr: "Etiketler", titleEn: "Tags" },
    { path: "/categories/", titleTr: "Kategoriler", titleEn: "Categories" },
  ];
  for (const p of pages) {
    entries.push({
      title: p.titleTr,
      url: siteBase + p.path,
      slug: p.path.replace(/\/$/, "") || "index",
      lang: "tr",
      type: "page",
      description: "",
      content: stripStopwords(p.titleTr.toLowerCase(), "tr"),
    });
    if (p.path !== "/") {
      entries.push({
        title: p.titleEn,
        url: siteBase + "/en" + p.path,
        slug: "en-" + p.path.replace(/\/$/, ""),
        lang: "en",
        type: "page",
        description: "",
        content: stripStopwords(p.titleEn.toLowerCase(), "en"),
      });
    }
  }

  const products = getProducts();
  const paths = getProductPaths();
  for (const { lang, slug, sku } of paths) {
    const product = products.find((p) => p.sku === sku);
    if (!product) continue;
    const info = lang === "tr" ? product.tr : product.en;
    if (!info) continue;
    const prefix = lang === "tr" ? "" : "/en";
    const url = `${siteBase}${prefix}/products/${slug}/`;
    const content = stripStopwords((info.title + " " + info.description).toLowerCase(), lang);
    entries.push({
      title: info.title,
      url,
      slug,
      lang,
      type: "product",
      description: info.description,
      content,
    });
  }

  return entries;
}

async function main() {
  const entries = await buildIndex();
  const outPath = path.join(process.cwd(), "public", "search-index.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(entries), "utf8");
  console.log(`Search index: ${entries.length} entries -> ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
