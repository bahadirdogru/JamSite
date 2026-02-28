import fs from "fs";
import path from "path";
import yaml from "js-yaml";

function loadSlides(lang) {
  const file = path.join(process.cwd(), "_data", "slides", `${lang}.yml`);
  if (!fs.existsSync(file)) return [];
  const content = fs.readFileSync(file, "utf8");
  const data = yaml.load(content);
  return Array.isArray(data) ? data : [];
}

export function getSlides(lang) {
  return loadSlides(lang);
}
