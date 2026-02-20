# Process Log

## Status: Project Setup Phase

Last updated: 2026-02-20

---

## Completed

- [x] Define project vision and hybrid architecture (Jekyll + Svelte 5 + Tailwind 4)
- [x] Create `claude.md` — full AI context document
- [x] Create `Architecture.md` — system architecture and data flow
- [x] Create `Styles.md` — design system and style guide
- [x] Create `README.md` — GitHub repo landing page
- [x] Create `process.md` — this file
- [x] Decide on key architecture trade-offs:
  - `shadow: "none"` for global Tailwind compatibility
  - IIFE bundle format for `<script>` tag loading
  - Pre-built assets committed to Git (no GitHub Actions)
  - Single bundle strategy (split only if >50KB gzipped)
  - `jam-` prefix for all custom element tags
- [x] Select and document Jekyll plugins (GitHub Pages whitelist):
  - jekyll-seo-tag (meta tags, Open Graph, Twitter Cards, JSON-LD)
  - jekyll-sitemap (auto sitemap.xml)
  - jekyll-feed (auto RSS/Atom feed)
  - jekyll-paginate (blog pagination — activate later)
  - jekyll-redirect-from (URL redirects for SEO)
  - jekyll-relative-links (Markdown link conversion)
  - jekyll-optional-front-matter (less boilerplate)
  - jekyll-default-layout (auto layout assignment)
- [x] Select client-side animation library: Motion (motion.dev, ~2.5KB)
- [x] Decide on View Transitions API for page-to-page transitions (progressive enhancement)
- [x] Plan PWA support (manifest.json + sw.js — deferred to later phase)
- [x] Update all reference docs with new decisions
- [x] Design dark mode architecture:
  - Tailwind CSS 4 `@custom-variant dark` with class strategy
  - Inline `<script>` in `<head>` for FOUC prevention
  - 3-step preference chain: localStorage > OS > light
  - `jam-theme-toggle` Svelte component
  - Light/dark theme tokens in `@theme` block
- [x] Design dynamic slider architecture:
  - `_data/slides/{lang}.yml` per-language data
  - Liquid `jsonify` → `data-slides` attribute on `<jam-slider>`
  - Slide types: `hero` (title + desc + image + CTA), `image` (image + alt)
  - Autoplay, arrows, dots, keyboard, touch support
- [x] Design multilanguage (i18n) boilerplate architecture:
  - `_config.yml`: `languages` array + `default_lang` (configurable)
  - Default language at root (`/`), others prefixed (`/en/`, `/de/`)
  - `_data/i18n/{lang}.yml` for UI translations
  - `ref` field in front matter links translations across languages
  - `_includes/hreflang.html` for SEO alternate links
  - `_includes/lang-switcher.html` (pure Liquid, no JS dependency)
  - `defaults` in `_config.yml` auto-assigns `lang` from file path
  - Adding a new language: config + data files + content directory only
- [x] Update all reference docs with dark mode, slider, and i18n decisions
- [x] Design blog structure:
  - Posts in `_posts/{lang}/` with `tags`, `categories`, `ref` in front matter
  - `_layouts/post.html` with tag badges and date
  - Tag/category index pages with language filtering
- [x] Design products data architecture:
  - Single-source `_data/products/{sku}.yml` with all languages embedded
  - `scripts/generate-products.js` pre-build script to generate wrapper pages
  - `_layouts/product.html` reads data from `site.data.products[page.ref]`
  - Product defaults in `_config.yml` for layout and lang auto-assignment
- [x] Design unified tag/category system:
  - Tag/category index pages aggregate from `site.posts` and `site.data.products`
  - Liquid loop collects unique tags/categories across both content types
  - Color-coded badges: posts (primary), products (accent), categories (secondary)
- [x] Design search architecture:
  - `search.json` Liquid template generates build-time search index
  - Includes posts, pages, and products (all languages, with `lang` and `type` fields)
  - `jam-search` Svelte component: Lunr.js + lunr-languages (Turkish stemmer)
  - Spotlight-style modal (Cmd+K), keyboard navigation, type badges, Motion animation
  - Search filtered by active page language
- [x] Update all reference docs with blog, products, search, and tag/category specifications
- [x] Refactor directory structure:
  - Moved all page content to `_pages/` Jekyll collection (output: true)
  - `_pages/tr/` for Turkish pages, `_pages/en/` for English pages
  - Tags and categories are now files inside `_pages/{lang}/` instead of standalone directories
  - Product wrapper pages generated to `_pages/products/{lang}/`
  - `search.json` moved to `_pages/search.json`
  - Root directory cleaned: no more `en/`, `tags/`, `categories/` directories
- [x] Add Instagram Stories UI component (`jam-stories`) for **category titles**
  - `src/components/Stories.svelte` — circular bubble row + fullscreen viewer overlay
  - Progress bars, auto-advance (configurable duration), left/right tap navigation
  - Long-press to pause, keyboard navigation (ArrowLeft/Right, Escape)
  - Gradient rings on bubbles with category icons and item counts
  - Used on index pages and products pages for category navigation
  - Data passed via `data-items` JSON attribute (generated with Liquid capture/jsonify/escape)
  - Registered as `<jam-stories>` custom element, imported in `main.js`
- [x] Add Owl Carousel-style product card slider (`jam-product-carousel`)
  - `src/components/ProductCarousel.svelte` — horizontal card carousel
  - Product cards with image/gradient, title, price, description, tags
  - Responsive: 1 card mobile / 2 tablet / 3 desktop
  - Navigation arrows (hover-visible), dot indicators with active animation
  - Drag/swipe via pointer events, CSS scroll-snap for native feel
  - Auto-play with configurable interval
  - Cards link directly to product detail pages
  - Used on index pages for product showcase
  - Registered as `<jam-product-carousel>` custom element
- [x] Fix slider data-slides attribute escaping (`jsonify | escape` with double quotes)

## In Progress

- [ ] Initialize project files:
  - [ ] `package.json` with dependencies (svelte, vite, tailwindcss, @sveltejs/vite-plugin-svelte, motion)
  - [ ] `vite.config.js`
  - [ ] `src/main.js`
  - [ ] `src/app.css` (with `@custom-variant dark`, `@theme`, `@source`)
  - [ ] `src/components/ThemeToggle.svelte`
  - [ ] `src/components/Slider.svelte`
  - [ ] `src/components/Counter.svelte`
  - [ ] `_config.yml` (with plugins, languages, defaults)
  - [ ] `_layouts/default.html` (dark mode script, seo, hreflang, bundles)
  - [ ] `_includes/navbar.html` (lang-switcher, theme toggle)
  - [ ] `_includes/footer.html`
  - [ ] `_includes/hreflang.html`
  - [ ] `_includes/lang-switcher.html`
  - [ ] `_data/i18n/tr.yml` and `_data/i18n/en.yml`
  - [ ] `_data/slides/tr.yml` and `_data/slides/en.yml`
  - [ ] `_data/products/sku001.yml` (example product)
  - [ ] `scripts/generate-products.js` (product wrapper page generator)
  - [ ] `_layouts/post.html` (blog post layout)
  - [ ] `_layouts/product.html` (product page layout)
  - [ ] `src/components/Search.svelte` (jam-search)
  - [ ] `_pages/search.json` (Liquid template for search index)
  - [ ] `_pages/tr/tags.html` and `_pages/en/tags.html` (tag index)
  - [ ] `_pages/tr/categories.html` and `_pages/en/categories.html` (category index)
  - [ ] `_pages/tr/index.md` (lang: tr, ref: home)
  - [ ] `_pages/en/index.md` (lang: en, ref: home)

## Planned

- [ ] Run `npm run build` and verify `assets/dist/` output
- [ ] Test dark mode toggle (FOUC-free, localStorage persistence)
- [ ] Test slider with sample data (hero + image slides)
- [ ] Test language switching and hreflang tags
- [ ] Test locally with Jekyll or static file server
- [ ] Push to GitHub and verify GitHub Pages deployment
- [ ] Build site navigation (`jam-navbar`)
- [ ] Design and implement homepage layout
- [ ] Add blog post listing with Jekyll Liquid (per language)
- [ ] Add product listing page with grid layout
- [ ] Add sample blog posts in TR and EN
- [ ] Add sample products (2-3 SKUs)
- [ ] Test search functionality with sample content
- [ ] Test tag/category aggregation across posts and products
- [ ] Add Motion entrance animations to homepage sections
- [ ] Add View Transition CSS (`view-transition-name`) to key elements

## Backlog

- [ ] PWA: create `manifest.json` and `sw.js`
- [ ] Performance audit (bundle size, Lighthouse)
- [ ] Add `<noscript>` fallbacks for all interactive components
- [ ] Consider code splitting if bundle exceeds 50KB gzipped
- [ ] `prefers-reduced-motion` audit across all animations
- [ ] Open Graph default image (`assets/img/og-default.png`)
- [ ] Favicon set (favicon.ico, apple-touch-icon, etc.)
- [ ] 404 page (`404.html` — Jekyll built-in support)
- [ ] Google Search Console setup + sitemap submission
- [ ] robots.txt
- [ ] Dark mode: test all component patterns in both modes
- [ ] i18n: add example blog posts in both languages
- [ ] i18n: per-language RSS feeds (if needed)
- [ ] Slider: touch/swipe gesture support
- [ ] Slider: `prefers-reduced-motion` — disable autoplay and transitions
- [ ] Products: Snipcart or external payment integration (future)
- [ ] Products: product image gallery/lightbox component
- [ ] Search: search analytics (popular queries, zero-result tracking)
- [ ] Blog: pagination with `jekyll-paginate`
- [ ] Blog: reading time estimate in post layout

---

## Session Notes

### 2026-02-20 — Session 1
- Drafted initial `claude.md` with project vision
- Refined to use Svelte 5 (latest) and Tailwind CSS 4 (CSS-first config)
- Decided against GitHub Actions — standard Jekyll workflow only
- Created full reference documentation set (5 MD files)

### 2026-02-20 — Session 1 (continued)
- Researched GitHub Pages whitelisted Jekyll plugins
- Selected 8 plugins: seo-tag, sitemap, feed, paginate, redirect-from, relative-links, optional-front-matter, default-layout
- Selected Motion (motion.dev) as animation library (~2.5KB mini)
- Adopted View Transitions API for page navigation (progressive enhancement, zero cost)
- Planned PWA support (deferred — manifest.json + sw.js)
- Updated all 4 reference docs (claude.md, Architecture.md, Styles.md, process.md) with new decisions

### 2026-02-20 — Session 1 (continued)
- Designed dark mode: Tailwind `@custom-variant dark`, FOUC-free inline script, `jam-theme-toggle` component, light/dark theme tokens
- Designed dynamic slider: `_data/slides/{lang}.yml`, Liquid jsonify → Svelte, hero/image types, autoplay
- Designed multilanguage boilerplate: configurable `languages`/`default_lang`, `ref`-based translation linking, `_data/i18n/` translations, pure Liquid lang-switcher, hreflang SEO tags
- Architecture: no code changes needed to add a new language — just config + data + content
- Updated all 4 reference docs with dark mode, slider, and i18n specifications

### 2026-02-20 — Session 2
- Designed blog structure: posts with tags/categories, `_layouts/post.html`, tag/category index pages
- Designed products data architecture: single-source `_data/products/{sku}.yml` with all translations, `scripts/generate-products.js` pre-build step, `_layouts/product.html`
- Designed unified tag/category system: Liquid aggregation across posts and products, color-coded badges
- Designed search: Lunr.js + lunr-languages, `search.json` build-time index, `jam-search` Spotlight-style component (Cmd+K)
- All tag/category and product data structures designed for extensibility (Snipcart, additional languages, etc.)
- Updated all 5 reference docs (claude.md, Architecture.md, Styles.md, process.md, README.md) with complete specifications

### 2026-02-20 — Session 2 (continued)
- Refactored directory structure: all page content moved to `_pages/` Jekyll collection
- Root directory cleaned: removed `en/`, `tags/`, `categories/` standalone directories
- Updated `_config.yml` with `collections: pages: output: true` and new defaults
- Updated `generate-products.js` to output to `_pages/products/{lang}/`
- Updated all reference documentation with new directory structure
