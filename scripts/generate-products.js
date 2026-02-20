import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const config = yaml.load(fs.readFileSync("_config.yml", "utf8"));
const languages = config.languages || ["tr"];
const defaultLang = config.default_lang || "tr";
const baseurl = config.baseurl || "";
const productsDir = path.join("_data", "products");

if (!fs.existsSync(productsDir)) {
  console.log("No _data/products/ directory found. Skipping.");
  process.exit(0);
}

const files = fs.readdirSync(productsDir).filter((f) => f.endsWith(".yml"));

if (files.length === 0) {
  console.log("No product files found. Skipping.");
  process.exit(0);
}

let totalPages = 0;

for (const file of files) {
  const product = yaml.load(
    fs.readFileSync(path.join(productsDir, file), "utf8")
  );
  const sku = product.sku || path.basename(file, ".yml");

  for (const lang of languages) {
    const langData = product[lang];
    if (!langData) continue;

    const slug = langData.slug || sku;
    const dir = path.join("_pages", "products", lang);

    fs.mkdirSync(dir, { recursive: true });

    const permalink =
      lang === defaultLang
        ? `${baseurl}/products/${slug}/`
        : `${baseurl}/${lang}/products/${slug}/`;

    const frontMatter = [
      "---",
      `layout: product`,
      `title: "${langData.title}"`,
      `description: "${langData.description}"`,
      `ref: ${sku}`,
      `lang: ${lang}`,
      `permalink: "${permalink}"`,
      "---",
      "",
    ].join("\n");

    fs.writeFileSync(path.join(dir, `${sku}.md`), frontMatter);
    totalPages++;
  }
}

console.log(
  `Generated ${totalPages} wrapper pages for ${files.length} products in ${languages.length} languages.`
);
