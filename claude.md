# Project Context: Jekyll + Svelte 5 + Tailwind CSS 4 Hybrid Static Site

## Vision

A static site hosted on GitHub Pages using the standard Jekyll 3.9 build pipeline. Interactive UI is built with Svelte 5 compiled as Web Components (Custom Elements) and styled with Tailwind CSS 4. Vite handles local builds in library mode. No GitHub Actions — the repository includes pre-built assets that Jekyll serves as-is.

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| SSG | Jekyll 3.9 | GitHub Pages default |
| Build | Vite (latest, 6.x+) | Library mode, fixed output filenames |
| UI Framework | Svelte 5 | Custom Elements with `shadow: "none"` |
| Styling | Tailwind CSS 4 | CSS-first config, no `tailwind.config.js` |
| Dark Mode | Tailwind `@custom-variant` + `localStorage` | Class strategy, FOUC-free inline script |
| Animation | Motion (motion.dev) | Lightweight (~2.5KB mini), hardware-accelerated |
| Page Transitions | View Transitions API | Browser-native, zero-bundle-cost, progressive |
| SEO | jekyll-seo-tag | Meta tags, Open Graph, Twitter Cards, JSON-LD |
| Sitemap | jekyll-sitemap | Auto-generated `sitemap.xml` |
| RSS | jekyll-feed | Auto-generated Atom feed at `/feed.xml` |
| Search | Lunr.js + lunr-languages | Client-side full-text search, Turkish stemmer support |
| Products | `_data/products/` + build script | SKU-based single-source YAML, auto-generated pages |
| Deployment | GitHub Pages | Standard Jekyll workflow, no Actions |

### Jekyll Plugins (GitHub Pages Whitelist)

All plugins below are supported by GitHub Pages in safe mode — no custom gems needed.

| Plugin | What it does |
|--------|-------------|
| `jekyll-seo-tag` | Generates `<title>`, `<meta>`, canonical URL, Open Graph, Twitter Card, JSON-LD structured data |
| `jekyll-sitemap` | Generates `sitemap.xml` for search engine crawlers |
| `jekyll-feed` | Generates Atom/RSS feed at `/feed.xml` |
| `jekyll-paginate` | Paginates blog post listings (activate when post count grows) |
| `jekyll-redirect-from` | Creates 301 redirects when URLs change (preserves SEO) |
| `jekyll-relative-links` | Converts relative Markdown links to proper HTML links |
| `jekyll-optional-front-matter` | Processes Markdown files without front matter |
| `jekyll-default-layout` | Auto-assigns layout to pages without explicit `layout:` |

### Client-Side Libraries (in Vite bundle)

| Library | Purpose | Import |
|---------|---------|--------|
| Motion (motion.dev) | Scroll animations, gestures, layout transitions | `import { animate, scroll, inView } from "motion"` |
| Lunr.js | Client-side full-text search with BM25 ranking | `import lunr from "lunr"` |
| lunr-languages | Turkish/multilanguage stemmer for Lunr.js | `import "lunr-languages/lunr.tr"` |
| phosphor-icons-svelte | Modern, minimal icon library for Svelte | `import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte"` |
| @phosphor-icons/core | Icon assets for Jekyll sprite generation | Used by `scripts/generate-sprite.js` |

### Browser APIs (zero cost)

| API | Purpose | Fallback |
|-----|---------|----------|
| View Transitions API | Smooth page-to-page crossfade/morph | No animation (graceful degradation) |

## Architecture Decisions

### Why `shadow: "none"`
Svelte custom elements default to Shadow DOM which encapsulates styles. Since Tailwind utility classes are global, components must opt out of Shadow DOM so that the global Tailwind stylesheet applies. All Svelte components must use `shadow: "none"` in their `customElement` config. Trade-off: no slot support, no style encapsulation.

### Why pre-built assets in Git
GitHub Pages standard pipeline only runs Jekyll — it cannot execute `npm run build`. Therefore `assets/dist/` (Vite output) must be committed to the repository. This is a deliberate trade-off: it avoids GitHub Actions complexity but increases repo size and can cause merge conflicts on build artifacts.

### Why library mode
Vite must output files with fixed names (`bundle.js`, `bundle.css`) — not hashed filenames — so Jekyll layouts can reference them with static `<script>` and `<link>` tags.

### Bundle strategy
Single JS bundle containing all Svelte custom elements. Individual component bundles are not needed unless total bundle exceeds 50KB gzipped.

### Why products in `_data/` instead of a collection
Jekyll collections generate one HTML page per source file. For multilanguage products, this would require duplicating all product data (price, image, stock) per language. Instead, products live in `_data/products/sku001.yml` as single-source files with all languages embedded. A Node.js build script (`scripts/generate-products.js`) reads `_config.yml` languages and generates thin wrapper `.md` pages per SKU per language. This means product data is never duplicated, and adding a new language requires zero changes to product files.

### Why Lunr.js for search
Lunr.js runs entirely client-side with no backend or API keys. Jekyll generates a `search.json` at build time via Liquid. The Svelte `jam-search` component fetches this JSON, filters by current language, and builds a Lunr index. Lunr-languages provides Turkish stemmer support. Total cost: ~8KB for Lunr + ~2KB for language pack.

## Directory Structure

```
.
├── _config.yml          # Jekyll config (collections, languages, plugins, excludes)
├── _data/
│   ├── i18n/            # UI translations per language
│   │   ├── tr.yml
│   │   └── en.yml
│   ├── slides/          # Slider content per language
│   │   ├── tr.yml
│   │   └── en.yml
│   └── products/        # Product data (single source per SKU)
│       ├── sku001.yml
│       └── sku002.yml
├── _includes/           # Jekyll partials
│   ├── navbar.html
│   ├── footer.html
│   ├── hreflang.html
│   ├── lang-switcher.html
│   ├── icon.html        # SVG sprite icon helper
│   ├── social-share.html
│   ├── related-posts.html
│   └── related-products.html
├── _layouts/            # Jekyll HTML templates
│   ├── default.html
│   ├── post.html
│   └── product.html
├── _pages/              # All page content (Jekyll collection, output: true)
│   ├── tr/              # Turkish pages (default lang → outputs to root /)
│   │   ├── index.md          # permalink: /
│   │   ├── about.md          # permalink: /about/
│   │   ├── features.md       # permalink: /features/
│   │   ├── getting-started.md # permalink: /getting-started/
│   │   ├── favorites.md      # permalink: /favorites/
│   │   ├── reading-list.md   # permalink: /reading-list/
│   │   ├── blog.html
│   │   ├── products.html
│   │   ├── tags.html
│   │   └── categories.html
│   ├── en/              # English pages (outputs to /en/)
│   │   ├── index.md          # permalink: /en/
│   │   ├── about.md          # permalink: /en/about/
│   │   ├── features.md       # permalink: /en/features/
│   │   ├── getting-started.md # permalink: /en/getting-started/
│   │   ├── favorites.md      # permalink: /en/favorites/
│   │   ├── reading-list.md   # permalink: /en/reading-list/
│   │   ├── blog.html
│   │   ├── products.html
│   │   ├── tags.html
│   │   └── categories.html
│   ├── products/        # Auto-generated product wrapper pages
│   │   ├── tr/
│   │   │   └── sku001.md
│   │   └── en/
│   │       └── sku001.md
│   └── search.json      # Build-time search index (Liquid template)
├── _posts/              # Blog posts organized by language
│   ├── tr/
│   └── en/
├── scripts/
│   ├── generate-products.js  # Pre-build: generates product wrapper pages
│   └── generate-sprite.js    # Generates SVG sprite from Phosphor Icons
├── src/                 # Modern layer (excluded from Jekyll build)
│   ├── components/
│   │   ├── ThemeToggle.svelte
│   │   ├── Slider.svelte
│   │   ├── Search.svelte
│   │   ├── Stories.svelte
│   │   ├── ProductCarousel.svelte
│   │   └── Counter.svelte
│   ├── main.js
│   └── app.css
├── assets/
│   ├── dist/            # Vite output (committed to Git)
│   │   ├── bundle.js
│   │   └── bundle.css
│   ├── icons/           # SVG sprite for Jekyll
│   │   └── sprite.svg   # Auto-generated by scripts/generate-sprite.js
│   └── img/
├── package.json
├── vite.config.js
├── Gemfile
└── .gitignore
```

## Critical Configuration

### `_config.yml` — Jekyll

```yaml
title: JamSite
description: "A modern hybrid static site"
url: "" # set to https://username.github.io for production
baseurl: "/JamSite" # repo name, or "" if using custom domain

# Multilanguage
languages: ["tr", "en"]
default_lang: "tr"

plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-feed
  - jekyll-paginate
  - jekyll-redirect-from
  - jekyll-relative-links
  - jekyll-optional-front-matter
  - jekyll-default-layout

collections:
  pages:
    output: true

exclude:
  - node_modules/
  - src/
  - scripts/
  - vite.config.js
  - package.json
  - package-lock.json
  - claude.md
  - Architecture.md
  - Styles.md
  - process.md

defaults:
  - scope:
      path: ""
    values:
      layout: "default"
      image: /assets/img/og-default.png
      lang: "tr"
  - scope:
      path: "_pages/tr"
    values:
      type: "pages"
      lang: "tr"
  - scope:
      path: "_pages/en"
    values:
      type: "pages"
      lang: "en"
      permalink: /en/:title/
  - scope:
      path: "_posts/tr"
    values:
      lang: "tr"
  - scope:
      path: "_posts/en"
    values:
      lang: "en"
      permalink: /en/:title/
  - scope:
      path: "_pages/products/tr"
    values:
      type: "pages"
      layout: "product"
      lang: "tr"
  - scope:
      path: "_pages/products/en"
    values:
      type: "pages"
      layout: "product"
      lang: "en"
      permalink: /en/products/:title/
```

Jekyll 3.9 excludes `node_modules/` and `vendor/` by default, but when you override `exclude` you must re-declare defaults.

`languages` and `default_lang` are custom variables — not processed by Jekyll, but available via `site.languages` and `site.default_lang` in Liquid templates. Page content lives in `_pages/{lang}/` (e.g. `_pages/tr/`, `_pages/en/`); default language uses root permalinks (`/`), additional languages use prefix directories (`/en/`). The `defaults` section auto-assigns `lang` based on file path.

`jekyll-seo-tag` reads `title`, `description`, `url`, `author`, and per-page front matter (`title`, `description`, `image`) to generate all SEO meta tags automatically.

### `vite.config.js` — Vite Library Mode

```js
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      formats: ["iife"],
      name: "JamSite",
      fileName: () => "bundle.js",
    },
    outDir: "assets/dist",
    emptyOutDir: true,
    cssCodeSplit: false,
  },
});
```

Output format is `iife` (not `es`) because the bundle loads via a `<script>` tag in Jekyll layouts, not as an ES module.

### `src/app.css` — Tailwind CSS 4

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
@source "../_layouts/**/*.html";
@source "../_includes/**/*.html";
@source "../_posts/**/*.md";
@source "../_pages/**/*.html";
@source "../_pages/**/*.md";
@source "./components/**/*.svelte";

@theme {
  --color-jam-primary: #3b82f6;
  --color-jam-secondary: #10b981;
  --color-jam-accent: #f59e0b;
  --color-jam-surface: #f8fafc;
  --color-jam-surface-dark: #0f172a;
  --color-jam-text: #0f172a;
  --color-jam-text-dark: #f1f5f9;
  --font-heading: "Inter", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

`@custom-variant dark` enables manual dark mode toggle via `.dark` class on `<html>`. All `dark:` utilities become available. `@source` directives tell Tailwind where to scan for utility class usage.

### `src/main.js` — Custom Element Registration

```js
import "./app.css";
import "./components/ThemeToggle.svelte";
import "./components/Slider.svelte";
import "./components/Counter.svelte";
import "./components/Search.svelte";
import "./components/Stories.svelte";
import "./components/ProductCarousel.svelte";

// View Transitions API — progressive enhancement for page navigations
if (document.startViewTransition) {
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a[href]");
    if (!anchor || anchor.origin !== location.origin) return;
    e.preventDefault();
    document.startViewTransition(() => {
      location.href = anchor.href;
    });
  });
}
```

### Svelte Component: `jam-theme-toggle`

```svelte
<svelte:options customElement={{ tag: "jam-theme-toggle", shadow: "none" }} />

<script>
  let dark = $state(document.documentElement.classList.contains("dark"));

  function toggle() {
    dark = !dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }
</script>

<button onclick={toggle} aria-label="Toggle dark mode"
  class="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
  {dark ? "☀️" : "🌙"}
</button>
```

3-step preference chain: `localStorage` > OS `prefers-color-scheme` > light (default). The inline script in `<head>` handles initial state; this component syncs the toggle UI.

### Svelte Component: `jam-slider`

```svelte
<svelte:options customElement={{ tag: "jam-slider", shadow: "none",
  props: { dataSlides: { reflect: true, attribute: "data-slides" },
           autoplay: { reflect: true, attribute: "autoplay" } }
}} />

<script>
  import { animate } from "motion";

  let { dataSlides = "[]", autoplay = "0" } = $props();
  let slides = $derived(JSON.parse(dataSlides));
  let current = $state(0);
  let interval;

  function next() { current = (current + 1) % slides.length; }
  function prev() { current = (current - 1 + slides.length) % slides.length; }
  function goTo(i) { current = i; }

  $effect(() => {
    const ms = parseInt(autoplay);
    if (ms > 0) {
      interval = setInterval(next, ms);
      return () => clearInterval(interval);
    }
  });
</script>

{#if slides.length > 0}
<div class="relative overflow-hidden rounded-xl">
  {#each slides as slide, i}
    {#if i === current}
      <div class="w-full">
        {#if slide.type === "hero"}
          <div class="relative h-96 flex items-center justify-center bg-cover bg-center"
               style="background-image: url({slide.image})">
            <div class="absolute inset-0 bg-black/40"></div>
            <div class="relative z-10 text-center text-white px-4">
              <h2 class="text-4xl font-bold mb-4">{slide.title}</h2>
              <p class="text-lg mb-6">{slide.description}</p>
              {#if slide.cta_text}
                <a href={slide.cta_link}
                   class="px-6 py-3 bg-jam-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
                  {slide.cta_text}
                </a>
              {/if}
            </div>
          </div>
        {:else if slide.type === "image"}
          <img src={slide.image} alt={slide.alt || ""} class="w-full h-96 object-cover" />
        {/if}
      </div>
    {/if}
  {/each}

  <button onclick={prev} class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 rounded-full p-2">←</button>
  <button onclick={next} class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 rounded-full p-2">→</button>

  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
    {#each slides as _, i}
      <button onclick={() => goTo(i)}
        class="w-3 h-3 rounded-full {i === current ? 'bg-white' : 'bg-white/50'}"></button>
    {/each}
  </div>
</div>
{/if}
```

Data flows from `_data/slides/{lang}.yml` via Liquid `jsonify` filter into the `data-slides` attribute. The component supports `hero` (title + description + image + CTA) and `image` (image + alt) slide types. Autoplay interval is configurable via the `autoplay` attribute (milliseconds, 0 = off).

### Svelte Component Template (generic)

```svelte
<svelte:options customElement={{ tag: "jam-counter", shadow: "none" }} />

<script>
  let count = $state(0);
</script>

<button class="px-4 py-2 bg-blue-500 text-white rounded" onclick={() => count++}>
  Count: {count}
</button>
```

### `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "node scripts/generate-products.js && vite build",
    "generate": "node scripts/generate-products.js",
    "preview": "vite preview"
  },
  "devDependencies": {
    "js-yaml": "^4.x"
  }
}
```

`build` first runs the product page generator, then Vite. `generate` can be run standalone to regenerate product wrapper pages without rebuilding JS/CSS.

### Jekyll Layout — Loading Bundles

```html
<!-- _layouts/default.html -->
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.default_lang }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>
    (function(){
      var t = localStorage.getItem("theme");
      if (t === "dark" || (!t && matchMedia("(prefers-color-scheme:dark)").matches))
        document.documentElement.classList.add("dark");
    })();
  </script>
  {% seo %}
  {% feed_meta %}
  {% include hreflang.html %}
  <link rel="stylesheet" href="{{ site.baseurl }}/assets/dist/bundle.css">
</head>
<body class="bg-jam-surface dark:bg-jam-surface-dark text-jam-text dark:text-jam-text-dark">
  {% include navbar.html %}
  <main>{{ content }}</main>
  {% include footer.html %}
  <script src="{{ site.baseurl }}/assets/dist/bundle.js"></script>
</body>
</html>
```

The inline `<script>` in `<head>` runs before any rendering to prevent FOUC (flash of unstyled content). It checks `localStorage` first, then OS preference, and adds `.dark` to `<html>` immediately. `{% seo %}` outputs all meta tags, Open Graph, Twitter Cards, and JSON-LD. `{% feed_meta %}` adds the RSS feed `<link>` tag. `{% include hreflang.html %}` adds alternate language links for SEO.

### SEO Front Matter (per page/post)

```yaml
---
title: "Page Title"
description: "Page-specific description for search engines and social shares"
image: /assets/img/page-specific-og.png
author: "Author Name"
---
```

`jekyll-seo-tag` uses these values to generate page-specific meta tags. If omitted, it falls back to site-level defaults from `_config.yml`.

### `_data/i18n/tr.yml` — UI Translations (Turkish)

```yaml
nav_home: "Ana Sayfa"
nav_about: "Hakkında"
nav_blog: "Blog"
nav_products: "Ürünler"
nav_contact: "İletişim"
footer_copyright: "Tüm hakları saklıdır."
slider_prev: "Önceki"
slider_next: "Sonraki"
theme_toggle: "Tema değiştir"
lang_label: "Dil"
search_placeholder: "Ara..."
search_no_results: "Sonuç bulunamadı"
tags_title: "Etiketler"
categories_title: "Kategoriler"
products_title: "Ürünler"
product_price: "Fiyat"
```

### `_data/i18n/en.yml` — UI Translations (English)

```yaml
nav_home: "Home"
nav_about: "About"
nav_blog: "Blog"
nav_products: "Products"
nav_contact: "Contact"
footer_copyright: "All rights reserved."
slider_prev: "Previous"
slider_next: "Next"
theme_toggle: "Toggle theme"
lang_label: "Language"
search_placeholder: "Search..."
search_no_results: "No results found"
tags_title: "Tags"
categories_title: "Categories"
products_title: "Products"
product_price: "Price"
```

Access translations in Liquid: `{% assign t = site.data.i18n[page.lang] %}` then `{{ t.nav_home }}`.

### `_data/slides/tr.yml` — Slider Content (Turkish)

```yaml
- type: hero
  title: "JamSite'a Hoş Geldiniz"
  description: "Modern, hızlı ve dinamik statik site deneyimi"
  image: /assets/img/hero-1.jpg
  cta_text: "Keşfet"
  cta_link: /about/

- type: image
  image: /assets/img/slide-2.jpg
  alt: "Proje görseli"
```

### `_includes/hreflang.html` — Alternate Language Links

```liquid
{% assign all_pages = site.collections.pages.docs %}
{% for lang in site.languages %}
  {% assign alt = all_pages | where: "ref", page.ref | where: "lang", lang | first %}
  {% if alt %}
    <link rel="alternate" hreflang="{{ lang }}" href="{{ alt.url | prepend: site.baseurl | prepend: site.url }}">
  {% endif %}
{% endfor %}
```

Each page must have a `ref` field in front matter to link translations. Pages with the same `ref` value are treated as translations of each other.

### `_includes/lang-switcher.html` — Language Selector

```liquid
{% assign t = site.data.i18n[page.lang] %}
{% assign all_pages = site.collections.pages.docs %}
<nav aria-label="{{ t.lang_label }}">
  {% for lang in site.languages %}
    {% assign target = all_pages | where: "ref", page.ref | where: "lang", lang | first %}
    {% if target %}
      <a href="{{ target.url | prepend: site.baseurl }}"
         {% if lang == page.lang %}aria-current="page"{% endif %}>
        {{ lang | upcase }}
      </a>
    {% endif %}
  {% endfor %}
</nav>
```

The language switcher is pure Liquid (no JavaScript dependency) for SEO. It is included in `_includes/navbar.html`.

### Blog Post Front Matter

```yaml
---
title: "Post Başlığı"
description: "Post açıklaması"
date: 2026-02-20
tags: [svelte, jekyll, web]
categories: [geliştirme]
image: /assets/img/posts/post-1.jpg
ref: post-slug
lang: tr
---
```

Posts live in `_posts/{lang}/YYYY-MM-DD-slug.md`. The `ref` field links translations across languages. Tags and categories are arrays. `lang` is auto-assigned via `_config.yml` defaults but can be overridden.

### `_layouts/post.html` — Blog Post Layout

```html
---
layout: default
---
{% assign t = site.data.i18n[page.lang] %}
<article class="max-w-3xl mx-auto px-4 py-12">
  <header class="mb-8">
    <h1 class="text-3xl font-bold font-heading mb-2">{{ page.title }}</h1>
    <div class="text-sm text-slate-500 dark:text-slate-400 flex gap-4">
      <time datetime="{{ page.date | date_to_xmlschema }}">{{ page.date | date: "%d.%m.%Y" }}</time>
      {% if page.categories.size > 0 %}
        <span>{{ page.categories | join: ", " }}</span>
      {% endif %}
    </div>
    {% if page.tags.size > 0 %}
      <div class="flex flex-wrap gap-2 mt-3">
        {% for tag in page.tags %}
          <span class="px-2 py-1 text-xs bg-jam-primary/10 text-jam-primary rounded-full">{{ tag }}</span>
        {% endfor %}
      </div>
    {% endif %}
  </header>
  <div class="prose dark:prose-invert max-w-none">
    {{ content }}
  </div>
</article>
```

### Product Data — `_data/products/sku001.yml`

Single-source product file. All languages and shared data in one file per SKU:

```yaml
sku: "sku001"
price: 299.99
currency: "TRY"
image: /assets/img/products/sku001.jpg
images:
  - /assets/img/products/sku001-1.jpg
  - /assets/img/products/sku001-2.jpg
tags: [elektronik, aksesuar]
categories: [teknoloji]
active: true

tr:
  title: "Kablosuz Kulaklık"
  description: "Yüksek kaliteli ses deneyimi sunan kablosuz kulaklık"
  slug: "kablosuz-kulaklik"

en:
  title: "Wireless Headphones"
  description: "High quality sound experience wireless headphones"
  slug: "wireless-headphones"
```

Shared fields (`price`, `image`, `tags`, `categories`) are language-neutral. Per-language fields (`title`, `description`, `slug`) are nested under the language code.

### `scripts/generate-products.js` — Product Page Generator

```js
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const config = yaml.load(fs.readFileSync("_config.yml", "utf8"));
const languages = config.languages || ["tr"];
const defaultLang = config.default_lang || "tr";
const productsDir = path.join("_data", "products");

if (!fs.existsSync(productsDir)) process.exit(0);

const files = fs.readdirSync(productsDir).filter(f => f.endsWith(".yml"));

for (const file of files) {
  const product = yaml.load(fs.readFileSync(path.join(productsDir, file), "utf8"));
  const sku = product.sku || path.basename(file, ".yml");

  for (const lang of languages) {
    const langData = product[lang];
    if (!langData) continue;

    const slug = langData.slug || sku;
    const dir = path.join("_pages", "products", lang);

    fs.mkdirSync(dir, { recursive: true });

    const frontMatter = [
      "---",
      `title: "${langData.title}"`,
      `description: "${langData.description}"`,
      `ref: ${sku}`,
      `lang: ${lang}`,
      `permalink: ${lang === defaultLang ? `/products/${slug}/` : `/${lang}/products/${slug}/`}`,
      "---",
      ""
    ].join("\n");

    fs.writeFileSync(path.join(dir, `${sku}.md`), frontMatter);
  }
}

console.log(`Generated wrapper pages for ${files.length} products in ${languages.length} languages.`);
```

This script reads all `_data/products/*.yml` files and generates minimal `.md` wrapper pages for each SKU+language combination in `_pages/products/{lang}/`. The generated pages only contain front matter — layout, title, description, ref, lang, and permalink. The actual product layout reads all display data from `site.data.products[page.ref]`.

### `_layouts/product.html` — Product Page Layout

```html
---
layout: default
---
{% assign product = site.data.products[page.ref] %}
{% assign lang = page.lang %}
{% assign t = site.data.i18n[lang] %}
{% assign info = product[lang] %}

<article class="max-w-4xl mx-auto px-4 py-12">
  <div class="grid md:grid-cols-2 gap-8">
    <div>
      <img src="{{ product.image }}" alt="{{ info.title }}" class="w-full rounded-xl" />
      {% if product.images %}
        <div class="grid grid-cols-3 gap-2 mt-4">
          {% for img in product.images %}
            <img src="{{ img }}" alt="{{ info.title }}" class="w-full rounded-lg cursor-pointer" />
          {% endfor %}
        </div>
      {% endif %}
    </div>
    <div>
      <h1 class="text-3xl font-bold font-heading mb-2">{{ info.title }}</h1>
      <p class="text-2xl text-jam-primary font-semibold mb-4">
        {{ product.price }} {{ product.currency }}
      </p>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{{ info.description }}</p>
      {% if product.tags.size > 0 %}
        <div class="flex flex-wrap gap-2 mb-4">
          {% for tag in product.tags %}
            <span class="px-2 py-1 text-xs bg-jam-accent/10 text-jam-accent rounded-full">{{ tag }}</span>
          {% endfor %}
        </div>
      {% endif %}
      {{ content }}
    </div>
  </div>
</article>
```

The layout reads product data from `site.data.products[page.ref]` using the `ref` (SKU) set by the wrapper page. Language-specific fields (`title`, `description`) are accessed via `product[lang]`.

### Tag and Category Index Pages

Tag and category listing pages aggregate content from both posts and products. They live at `/tags/` and `/categories/` (in `_pages/tr/tags.html`, `_pages/tr/categories.html` for default language; `_pages/en/tags.html`, `_pages/en/categories.html` for English).

```liquid
<!-- _pages/tr/tags.html -->
---
layout: default
title: Etiketler
ref: tags
lang: tr
permalink: /tags/
---
{% assign t = site.data.i18n[page.lang] %}
{% assign lang_posts = site.posts | where: "lang", page.lang %}
{% assign all_tags = "" | split: "" %}

{% for post in lang_posts %}
  {% for tag in post.tags %}
    {% unless all_tags contains tag %}
      {% assign all_tags = all_tags | push: tag %}
    {% endunless %}
  {% endfor %}
{% endfor %}

{% for product_file in site.data.products %}
  {% assign product = product_file[1] %}
  {% if product[page.lang] %}
    {% for tag in product.tags %}
      {% unless all_tags contains tag %}
        {% assign all_tags = all_tags | push: tag %}
      {% endunless %}
    {% endfor %}
  {% endif %}
{% endfor %}

<div class="max-w-4xl mx-auto px-4 py-12">
  <h1 class="text-3xl font-bold font-heading mb-8">{{ page.title }}</h1>
  <div class="flex flex-wrap gap-3">
    {% for tag in all_tags %}
      <a href="{{ site.baseurl }}/tags/{{ tag }}/"
         class="px-3 py-2 bg-white dark:bg-slate-800 border border-jam-border dark:border-jam-border-dark rounded-lg hover:border-jam-primary transition-colors">
        {{ tag }}
      </a>
    {% endfor %}
  </div>
</div>
```

The same pattern applies to categories. English versions live at `/en/tags/` and `/en/categories/` with `lang: en`.

### `search.json` — Build-Time Search Index

```liquid
---
layout: null
permalink: /search.json
---
[
  {% assign sep = "" %}
  {% for post in site.posts %}
    {{ sep }}
    {
      "title": {{ post.title | jsonify }},
      "url": "{{ post.url | prepend: site.baseurl }}",
      "content": {{ post.content | strip_html | truncatewords: 100 | jsonify }},
      "tags": {{ post.tags | jsonify }},
      "categories": {{ post.categories | jsonify }},
      "lang": {{ post.lang | jsonify }},
      "type": "post",
      "date": "{{ post.date | date_to_xmlschema }}"
    }
    {% assign sep = "," %}
  {% endfor %}

  {% for page in site.collections.pages.docs %}
    {% if page.title and page.ref %}
      {{ sep }}
      {
        "title": {{ page.title | jsonify }},
        "url": "{{ page.url | prepend: site.baseurl }}",
        "content": {{ page.content | strip_html | truncatewords: 100 | jsonify }},
        "lang": {{ page.lang | jsonify }},
        "type": "page",
        "ref": {{ page.ref | jsonify }}
      }
      {% assign sep = "," %}
    {% endif %}
  {% endfor %}

  {% for product_entry in site.data.products %}
    {% assign sku = product_entry[0] %}
    {% assign product = product_entry[1] %}
    {% for lang_entry in site.languages %}
      {% assign pinfo = product[lang_entry] %}
      {% if pinfo %}
        {{ sep }}
        {
          "title": {{ pinfo.title | jsonify }},
          "url": "{{ site.baseurl }}{% if lang_entry != site.default_lang %}/{{ lang_entry }}{% endif %}/products/{{ pinfo.slug | default: sku }}/",
          "content": {{ pinfo.description | jsonify }},
          "tags": {{ product.tags | jsonify }},
          "categories": {{ product.categories | jsonify }},
          "lang": {{ lang_entry | jsonify }},
          "type": "product",
          "price": {{ product.price }},
          "ref": {{ sku | jsonify }}
        }
        {% assign sep = "," %}
      {% endif %}
    {% endfor %}
  {% endfor %}
]
```

`search.json` lives in `_pages/search.json` and is generated at build time by Jekyll's Liquid engine. The `permalink: /search.json` ensures it is served at the root. It includes all posts, pages (with `title` and `ref`), and products across all languages. Each entry has a `lang` and `type` field so the search component can filter by current language and show type badges.

### Svelte Component: `jam-search`

```svelte
<svelte:options customElement={{ tag: "jam-search", shadow: "none",
  props: { lang: { reflect: true, attribute: "lang" },
           baseurl: { reflect: true, attribute: "baseurl" } }
}} />

<script>
  import { animate } from "motion";
  import lunr from "lunr";
  import "lunr-languages/lunr.stemmer.support";
  import "lunr-languages/lunr.tr";

  let { lang = "tr", baseurl = "" } = $props();
  let open = $state(false);
  let query = $state("");
  let results = $state([]);
  let index = $state(null);
  let docs = $state([]);
  let selectedIdx = $state(0);
  let inputEl;
  let modalEl;

  async function loadIndex() {
    if (index) return;
    const res = await fetch(`${baseurl}/search.json`);
    const data = await res.json();
    docs = data.filter(d => d.lang === lang);
    index = lunr(function () {
      if (lang === "tr") this.use(lunr.tr);
      this.ref("url");
      this.field("title", { boost: 10 });
      this.field("content");
      this.field("tags", { boost: 5 });
      docs.forEach(doc => this.add(doc));
    });
  }

  function search(q) {
    if (!index || !q.trim()) { results = []; return; }
    const hits = index.search(q + "*");
    results = hits.slice(0, 10).map(h => docs.find(d => d.url === h.ref)).filter(Boolean);
    selectedIdx = 0;
  }

  function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      toggle();
    }
    if (!open) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowDown") { e.preventDefault(); selectedIdx = Math.min(selectedIdx + 1, results.length - 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); selectedIdx = Math.max(selectedIdx - 1, 0); }
    if (e.key === "Enter" && results[selectedIdx]) {
      window.location.href = results[selectedIdx].url;
    }
  }

  function toggle() { open ? close() : openModal(); }

  async function openModal() {
    open = true;
    await loadIndex();
    requestAnimationFrame(() => {
      inputEl?.focus();
      if (modalEl) animate(modalEl, { opacity: [0, 1], scale: [0.95, 1] }, { duration: 0.15 });
    });
  }

  function close() {
    open = false;
    query = "";
    results = [];
  }

  $effect(() => { search(query); });
  $effect(() => { document.addEventListener("keydown", handleKeydown); return () => document.removeEventListener("keydown", handleKeydown); });
</script>

{#if open}
<div class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50" onclick={close}>
  <div bind:this={modalEl} class="w-full max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
       onclick={(e) => e.stopPropagation()}>
    <div class="flex items-center px-4 border-b border-jam-border dark:border-jam-border-dark">
      <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <input bind:this={inputEl} bind:value={query} type="text" placeholder="Ara..."
             class="w-full px-3 py-4 bg-transparent outline-none text-jam-text dark:text-jam-text-dark" />
      <kbd class="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 rounded">ESC</kbd>
    </div>
    {#if results.length > 0}
      <ul class="max-h-80 overflow-y-auto py-2">
        {#each results as result, i}
          <li>
            <a href={result.url}
               class="flex items-center gap-3 px-4 py-3 {i === selectedIdx ? 'bg-jam-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}">
              <span class="px-2 py-0.5 text-xs rounded-full
                {result.type === 'post' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                 result.type === 'product' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' :
                 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}">
                {result.type}
              </span>
              <span class="text-jam-text dark:text-jam-text-dark">{result.title}</span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
{/if}
```

The search modal opens with `Cmd+K` (macOS) / `Ctrl+K` (Windows/Linux). It filters results by the current page language. Results show type badges (post, product, page) with color coding. Keyboard navigation with up/down arrows and Enter to select. Motion handles the modal entrance animation.

### Search in Jekyll Layout

```liquid
<jam-search lang="{{ page.lang | default: site.default_lang }}" baseurl="{{ site.baseurl }}"></jam-search>
```

Place this in `_layouts/default.html` (inside `<body>`, typically near the navbar). The `lang` attribute filters search results to the current language. `baseurl` ensures the search.json fetch URL is correct.

### Slider in Jekyll Templates

```liquid
{% assign slides = site.data.slides[page.lang] %}
{% if slides %}
  <jam-slider data-slides="{{ slides | jsonify | escape }}" autoplay="5000"></jam-slider>
{% endif %}
```

Slider data is language-aware: `site.data.slides[page.lang]` automatically selects the correct YAML file based on the current page language.

### Stories in Jekyll Templates (Instagram Stories UI)

```svelte
<svelte:options customElement={{ tag: "jam-stories", shadow: "none",
  props: { dataItems: { reflect: true, attribute: "data-items" },
           duration: { reflect: true, attribute: "duration" },
           label: { reflect: true, attribute: "label" } }
}} />
```

The `jam-stories` component provides an Instagram Stories-like experience **for category titles**:
- Circular thumbnail bubbles with gradient ring in a horizontally scrollable row
- Full-screen overlay viewer on click (progress bars, auto-advance, left/right tap navigation)
- Long-press to pause, keyboard navigation (Arrow keys, Escape)
- Categories show icon, item count, and gradient background

Data items JSON structure:

```json
[
  {
    "title": "Category",
    "subtitle": "3 products",
    "icon": "🛍️",
    "gradient": "from-rose-500 to-orange-500",
    "link": "/categories/"
  }
]
```

Usage in Liquid (category stories):

```liquid
{% assign all_cats = "" %}
{% for pe in site.data.products %}{% assign p = pe[1] %}{% if p.active %}{% for cat in p.categories %}{% unless all_cats contains cat %}{% if all_cats != "" %}{% assign all_cats = all_cats | append: "|" %}{% endif %}{% assign all_cats = all_cats | append: cat %}{% endunless %}{% endfor %}{% endif %}{% endfor %}
{% assign cats_array = all_cats | split: "|" %}
{% assign csep = "" %}
{% capture category_stories %}[{% for cat in cats_array %}{% assign cat_count = 0 %}{% for pe in site.data.products %}{% assign p = pe[1] %}{% if p.active and p.categories contains cat %}{% assign cat_count = cat_count | plus: 1 %}{% endif %}{% endfor %}{{ csep }}{"title":"{{ cat }}","subtitle":"{{ cat_count }} ürün","gradient":"...","icon":"🛍️","link":"/categories/"}{% assign csep = "," %}{% endfor %}]{% endcapture %}

<jam-stories data-items="{{ category_stories | strip_newlines | escape }}" duration="4000" label="Kategoriler"></jam-stories>
```

### Product Carousel in Jekyll Templates (Owl Carousel-style)

```svelte
<svelte:options customElement={{ tag: "jam-product-carousel", shadow: "none",
  props: { dataProducts: { reflect: true, attribute: "data-products" },
           autoplay: { reflect: true, attribute: "autoplay" },
           label: { reflect: true, attribute: "label" } }
}} />
```

The `jam-product-carousel` component provides an Owl Carousel-like card slider for products:
- Horizontal scrolling product cards with images, titles, prices, tags, and descriptions
- Responsive: 1 card on mobile, 2 on tablet, 3 on desktop
- Navigation arrows (appear on hover), dot indicators with active state animation
- Drag/swipe support via pointer events, CSS scroll-snap for native feel
- Auto-play with configurable interval
- Cards link directly to product detail pages

Data items JSON structure:

```json
[
  {
    "title": "Product Name",
    "image": "/assets/img/product.jpg",
    "description": "Short description...",
    "price": "299.99 TRY",
    "link": "/products/slug/",
    "tags": ["tag1", "tag2"],
    "gradient": "from-blue-500 to-indigo-600"
  }
]
```

Usage in Liquid:

```liquid
{% assign psep = "" %}
{% capture carousel_products %}[{% for pe in site.data.products %}{% assign p = pe[1] %}{% assign info = p[page.lang] %}{% if info and p.active %}{{ psep }}{"title":{{ info.title | jsonify }},"image":{{ p.image | jsonify }},"description":{{ info.description | truncatewords: 12 | jsonify }},"price":"{{ p.price }} {{ p.currency }}","link":"/products/{{ info.slug }}/","tags":{{ p.tags | jsonify }}}{% assign psep = "," %}{% endif %}{% endfor %}]{% endcapture %}

<jam-product-carousel data-products="{{ carousel_products | strip_newlines | escape }}" autoplay="6000" label="Ürünler"></jam-product-carousel>
```

### Phosphor Icons — Icon Library

The project uses Phosphor Icons via a hybrid integration strategy:

**For Svelte Components:**

```svelte
<script>
  import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte";
  import IconHeartFill from "phosphor-icons-svelte/IconHeartFill.svelte";
</script>

<IconHeartRegular class="w-5 h-5" />
```

Icon naming convention: `Icon{Name}{Weight}.svelte` where Weight is `Regular`, `Bold`, `Light`, `Thin`, `Fill`, or `Duotone`.

**For Jekyll Templates:**

Use the `_includes/icon.html` helper which references the SVG sprite at `assets/icons/sprite.svg`:

```liquid
{% include icon.html name="heart" class="w-4 h-4" %}
{% include icon.html name="x-logo" class="w-5 h-5 text-jam-primary" %}
```

Available icons in sprite (see `scripts/generate-sprite.js` for full list):
- Social: `x-logo`, `linkedin`, `whatsapp`, `link`
- Navigation: `arrow-right`, `arrow-left`, `arrow-up`, `caret-down`
- Actions: `copy`, `trash`, `share`, `eye`
- Status: `check-circle`, `x-circle`, `info`, `warning`
- UI: `heart`, `heart-fill`, `bookmark`, `bookmark-fill`, `sun`, `moon`, `magnifying-glass`, `x`, `list`, `funnel`, `scales`, `keyboard`, `spinner`
- Content: `cube`, `newspaper`, `image`

**Adding New Icons:**

1. Add icon entry to `ICONS` array in `scripts/generate-sprite.js`
2. Run `node scripts/generate-sprite.js` to regenerate sprite
3. Use in Jekyll via `{% include icon.html name="new-icon" %}`

### Motion — Animation Library

```js
import { animate, scroll, inView } from "motion";

// Fade-in on scroll
inView(".card", (el) => {
  animate(el, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5 });
});

// Scroll-linked progress bar
scroll(animate(".progress-bar", { scaleX: [0, 1] }));
```

Motion is imported in individual Svelte components where animation is needed — not globally. Keep total Motion usage under control to maintain bundle size.

### PWA — Progressive Web App (future)

`manifest.json` and `sw.js` are static files served by Jekyll. Service Worker caches HTML, CSS, JS, and images for offline access. Implementation deferred to after core site is functional.

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Custom element tag | `jam-` prefix, kebab-case | `jam-counter`, `jam-navbar` |
| Svelte file | PascalCase | `Counter.svelte`, `NavBar.svelte` |
| CSS classes | Tailwind utilities only | No custom CSS classes unless absolutely necessary |
| Language code | ISO 639-1, lowercase | `tr`, `en`, `de` |
| Translation key | snake_case | `nav_home`, `footer_copyright` |
| Page `ref` field | kebab-case, content-descriptive | `home`, `about`, `contact` |
| i18n data file | `_data/i18n/{lang}.yml` | `_data/i18n/tr.yml` |
| Slide data file | `_data/slides/{lang}.yml` | `_data/slides/en.yml` |
| Product data file | `_data/products/{sku}.yml` | `_data/products/sku001.yml` |
| Product SKU | lowercase, no spaces | `sku001`, `wireless-headphones` |
| Tag | lowercase, kebab-case | `web-development`, `svelte` |
| Category | lowercase, kebab-case | `geliştirme`, `teknoloji` |

## Workflow

1. Write Svelte components in `src/components/`, register in `src/main.js`
2. Write content in `_posts/{lang}/` with `ref` field for translation linking
3. Create page translations in `_pages/{lang}/`
4. Add UI translations to `_data/i18n/{lang}.yml`
5. Add slider content to `_data/slides/{lang}.yml`
6. Add products to `_data/products/{sku}.yml` (one file per SKU with all translations)
7. Use custom element tags in layouts/includes: `<jam-slider>`, `<jam-theme-toggle>`, `<jam-search>`, `<jam-stories>`, `<jam-product-carousel>`
8. Run `npm run build` — generates product pages, then Vite compiles into `assets/dist/`
9. Commit all files including `assets/dist/` and generated `_pages/products/` pages, push to GitHub
10. GitHub Pages runs Jekyll, serves the site with pre-built JS/CSS

### Adding a Product

1. Create `_data/products/{sku}.yml` with shared fields and per-language translations
2. Run `npm run generate` or `npm run build` — creates wrapper `.md` pages
3. Wrapper pages are committed to Git (they are tiny front-matter-only files)
4. Product appears in search index and tag/category listings automatically

### Adding a New Language

1. Add language code to `languages` array in `_config.yml`
2. Add `defaults` scope for `_pages/{lang}/` with `lang` and `permalink`
3. Create `_data/i18n/{lang}.yml` with all UI translation keys
4. Create `_data/slides/{lang}.yml` with slider content
5. Create pages in `_pages/{lang}/` (e.g. `index.md`, `about.md`) with matching `ref` values
6. Create `_posts/{lang}/` directory for blog posts
7. hreflang tags, language switcher, and slider automatically pick up the new language

## Constraints and Rules

- **Only whitelisted Jekyll plugins**: GitHub Pages runs Jekyll in safe mode. Only plugins from the GitHub Pages whitelist are allowed (see Tech Stack section). All other dynamic behavior must be client-side (Svelte) or use built-in Liquid filters/tags.
- **Asset paths must use `{{ site.baseurl }}`**: Never hardcode paths. The site may be served from a subpath (e.g., `username.github.io/repo-name`).
- **SEO-critical content in Jekyll/Liquid**: Custom elements render after JS loads. Page titles, meta tags, headings, and article body text must be in the HTML that Jekyll generates. Svelte handles only interactive widgets.
- **Progressive enhancement**: If JS fails to load, the page must still be readable. Svelte components should enhance existing content, not replace it. Use `<noscript>` fallbacks where appropriate.
- **No `tailwind.config.js`**: Tailwind 4 is configured entirely in CSS. Do not create a JS config file.
- **All Svelte components must use `shadow: "none"`**: Required for Tailwind global styles to apply.
- **Svelte 5 runes syntax**: Use `$state`, `$derived`, `$effect` — not legacy `let` reactivity or stores.
- **Motion for animations only**: Do not use CSS `@keyframes` or Svelte `transition:` directives. Use Motion's `animate`, `scroll`, `inView` functions for all animations. Exception: simple Tailwind `transition-*` utilities for hover/focus states.
- **View Transitions API is progressive**: The `document.startViewTransition` check ensures browsers without support get normal navigation. Never depend on the transition completing for functionality.
- **Every page/post must have `lang` and `ref`**: `lang` is auto-assigned via `defaults` in `_config.yml`. `ref` must be manually set in front matter to link translations across languages.
- **Default language at root, others prefixed**: Default language pages (in `_pages/tr/`) use root permalinks (`/`), additional languages use `/{lang}/` prefix. NEVER use `/tr/` in permalinks — Turkish content outputs directly to root.
- **Dark mode FOUC prevention**: The inline `<script>` in `<head>` must run before any CSS loads. Never move it after the stylesheet `<link>` tag.
- **Language switcher is pure Liquid**: Do not use JavaScript for the language switcher. It must be crawlable by search engines.
- **Slider data is per-language**: Always create a `_data/slides/{lang}.yml` file for each supported language.
- **Product data is single-source**: One `_data/products/{sku}.yml` per product. All languages in one file. Never duplicate product data across files.
- **Product wrapper pages are auto-generated**: Do not manually edit files in `_pages/products/{lang}/`. They are overwritten by `scripts/generate-products.js`.
- **Tags and categories are shared across content types**: Tag/category index pages must aggregate from both `site.posts` and `site.data.products`.
- **Search index includes all content types**: `search.json` must contain posts, pages (with `ref`), and products. Each entry must have `lang` and `type` fields.
- **Search filters by current language**: The `jam-search` component receives the page language via `lang` attribute and only indexes content matching that language.

## Reference Documentation

This project uses a set of Markdown files for AI-guided development. These are **not** Jekyll content — they are excluded from the Jekyll build via `_config.yml`.

| File | Purpose | Update frequency |
|------|---------|-----------------|
| `claude.md` | Full project context, tech stack, config references, rules | When architecture or config changes |
| `Architecture.md` | System architecture, data flow, build pipeline, component map | When structural decisions change |
| `Styles.md` | Design system: colors, typography, spacing, component patterns | When visual design evolves |
| `process.md` | Task log: completed work, current sprint, planned work, backlog | Every session |
| `README.md` | Public-facing repo description, setup instructions | When setup steps change |

AI agents should read `claude.md` first for full context, then consult other files as needed.
