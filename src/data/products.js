import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const productsDir = path.join(process.cwd(), "src", "content", "products");

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return yaml.load(match[1]);
}

function loadProducts() {
  if (!fs.existsSync(productsDir)) return [];
  const files = fs.readdirSync(productsDir).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const content = fs.readFileSync(path.join(productsDir, file), "utf8");
    const data = parseFrontmatter(content);
    if (!data) return null;
    const sku = data.sku ?? path.basename(file, ".md");
    return { ...data, sku };
  }).filter(Boolean);
}

let cached = null;

export function getProducts() {
  if (!cached) cached = loadProducts();
  return cached;
}

export function getProductBySku(sku) {
  return getProducts().find((p) => p.sku === sku);
}

export function getProductBySlug(slug, lang) {
  for (const product of getProducts()) {
    const info = lang === "tr" ? product.tr : product.en;
    if (info && (info.slug === slug || product.sku === slug)) {
      return { product, info };
    }
  }
  return undefined;
}

export function getProductPaths() {
  const paths = [];
  for (const product of getProducts()) {
    if (product.tr) paths.push({ lang: "tr", slug: product.tr.slug, sku: product.sku });
    if (product.en) paths.push({ lang: "en", slug: product.en.slug, sku: product.sku });
  }
  return paths;
}
