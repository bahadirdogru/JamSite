import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const slidesDir = path.join(process.cwd(), "src", "content", "slides");

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  return yaml.load(match[1]);
}

function loadSlides() {
  if (!fs.existsSync(slidesDir)) return [];
  const files = fs.readdirSync(slidesDir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const content = fs.readFileSync(path.join(slidesDir, file), "utf8");
      const data = parseFrontmatter(content);
      return data;
    })
    .filter(Boolean);
}

let cached = null;

function getCachedSlides() {
  if (!cached) cached = loadSlides();
  return cached;
}

export function getSlides(lang) {
  const all = getCachedSlides();
  return all
    .filter((s) => s.lang === lang)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
