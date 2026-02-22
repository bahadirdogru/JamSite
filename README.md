# JamSite

A modern boilerplate that combines Jekyll (GitHub Pages) with Svelte 5 interactive components and Tailwind CSS 4 styling. Features blog with tags/categories, product catalog, site-wide search, dark/light mode, dynamic slider, and built-in multilanguage support.

Created by [Bahadır Doğru](https://bahadirdogru.com)

Jekyll handles content, SEO, and templating. Svelte components compile to Web Components (Custom Elements) and are embedded in Jekyll layouts as `<jam-*>` tags. Vite builds the JS/CSS bundles locally; the output is committed to the repo so GitHub Pages can serve it without any custom build pipeline.

## Features

- **Blog** — Posts with tags and categories, language-specific listings, post layout with metadata
- **Product Catalog** — SKU-based product data with multilanguage support, auto-generated product pages, e-commerce ready layout
- **Site Search** — Spotlight-style search modal (Cmd+K / Ctrl+K), client-side full-text search with Lunr.js, language-filtered results
- **Dark / Light Mode** — FOUC-free theme toggle with OS preference detection and `localStorage` persistence
- **Dynamic Slider** — Data-driven slider with hero and image slide types, autoplay, and keyboard/touch navigation
- **Multilanguage (i18n)** — Configurable language support with SEO-friendly hreflang tags and pure Liquid language switcher. Add a new language with zero code changes.
- **SEO Optimized** — Auto-generated meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap, and RSS feed via Jekyll plugins
- **Smooth Animations** — Motion library for scroll/entrance animations + View Transitions API for page navigation
- **Progressive Enhancement** — Content readable without JavaScript. Interactive features enhance, not replace.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- Git

No Ruby/Jekyll installation needed for local development of Svelte components. Jekyll runs only on GitHub Pages.

## Setup

```bash
git clone https://github.com/<username>/JamSite.git
cd JamSite
npm install
```

## Development

```bash
npm run dev
```

Opens Vite dev server for working on Svelte components with hot reload.

## Build

```bash
npm run build
```

Compiles Svelte components and Tailwind CSS into `assets/dist/bundle.js` and `assets/dist/bundle.css`.

## Deploy

```bash
git add -A
git commit -m "build: update bundle"
git push
```

GitHub Pages automatically picks up the changes and runs Jekyll to build the site.

## Project Structure

```
_data/               Data files (i18n, slides, products)
_includes/           Jekyll partials (navbar, footer, hreflang, lang-switcher, icon helper)
_layouts/            Jekyll HTML templates (default, post, product)
_pages/              All page content as Jekyll collection
  tr/                Turkish pages (index, about, blog, products, tags, categories)
  en/                English pages
  products/          Auto-generated product wrapper pages
  search.json        Build-time search index
_posts/              Blog posts organized by language (tr/, en/)
scripts/             Build scripts (product page generator, icon sprite generator)
src/                 Svelte 5 components, Tailwind entry, main.js
assets/
  dist/              Pre-built JS/CSS bundles (committed)
  icons/             Phosphor Icons SVG sprite
```

## Tech Stack

- **SSG**: Jekyll 3.9 (GitHub Pages standard)
- **Build**: Vite 6.x+ (library mode)
- **Components**: Svelte 5 (Custom Elements, `shadow: "none"`)
- **Styling**: Tailwind CSS 4 (CSS-first configuration, dark mode)
- **Icons**: Phosphor Icons (SVG sprite + Svelte components)
- **Animation**: Motion (motion.dev) + View Transitions API
- **Search**: Lunr.js + lunr-languages (client-side, Turkish stemmer)
- **SEO**: jekyll-seo-tag, jekyll-sitemap, jekyll-feed

## Adding a New Language

1. Add the language code to `languages` in `_config.yml`
2. Add a `defaults` scope for the new language path
3. Create `_data/i18n/{lang}.yml` (UI translations)
4. Create `_data/slides/{lang}.yml` (slider content)
5. Create a `{lang}/` directory with pages (set matching `ref` values)
6. Create `_posts/{lang}/` for blog posts

hreflang tags, language switcher, and slider content automatically detect the new language.

## Adding a Product

1. Create `_data/products/{sku}.yml` with shared fields (price, image, tags) and per-language translations (title, description, slug)
2. Run `npm run build` — the build script generates wrapper pages for each language automatically
3. Product pages, search index, and tag/category listings update automatically

## Search

Press `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) to open the search modal. Search covers blog posts, pages, and products. Results are filtered by the current page language and show type badges for easy identification.

## Icons

This project uses [Phosphor Icons](https://phosphoricons.com/) for all icons.

**Adding a new icon:**

1. Add the icon to the `ICONS` array in `scripts/generate-sprite.js`
2. Run `node scripts/generate-sprite.js` to regenerate the sprite
3. Use in Jekyll: `{% include icon.html name="icon-name" class="w-5 h-5" %}`
4. Use in Svelte: `import IconName from "phosphor-icons-svelte/IconName.svelte"`

## License

MIT
