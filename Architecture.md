# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    DEVELOPMENT (Local)                   │
│                                                         │
│  src/                   _pages/{lang}/   _posts/{lang}/  _layouts/  │
│  ├── components/        ├── tr/*.md      ├── tr/*.md     ├── default│
│  │   ├── ThemeToggle.svelte  └── en/*.md  └── en/*.md   ├── post   │
│  │   ├── Slider.svelte _pages/products/                 └── product│
│  │   ├── Search.svelte   ├── tr/*.md   _data/                      │
│  │   └── Counter.svelte  └── en/*.md   ├── i18n/{lang}.yml         │
│  ├── main.js                           ├── slides/{lang}.yml        │
│  └── app.css                           └── products/{sku}.yml       │
│                                                                     │
│  scripts/                                                            │
│  ├── generate-products.js (reads _data/products + generates pages)   │
│  └── generate-sprite.js (reads @phosphor-icons/core → sprite.svg)    │
│         │                                               │
│         ▼                                               │
│  ┌─────────────────────────┐                              │
│  │  Pre-build               │  (node scripts/             │
│  │  generate-products.js    │   generate-products.js)     │
│  └────────────┬────────────┘                              │
│               ▼                                           │
│  _pages/products/tr/*.md, _pages/products/en/*.md (wrapper pages)   │
│                                                           │
│  ┌─────────────┐                                          │
│  │  Vite Build  │  (vite build)                           │
│  │  Library Mode│                                         │
│  └──────┬──────┘                                          │
│         │                                               │
│         ▼                                               │
│  assets/                                                 │
│  ├── dist/                                              │
│  │   ├── bundle.js   ◄── Svelte custom elements (IIFE) │
│  │   └── bundle.css  ◄── Purged Tailwind CSS           │
│  └── icons/                                             │
│      └── sprite.svg  ◄── Phosphor Icons SVG sprite     │
└─────────────────────────────────────────────────────────┘
                          │
                     git push
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 DEPLOYMENT (GitHub Pages)                │
│                                                         │
│  Jekyll 3.9 (safe mode, whitelisted plugins only)       │
│  ├── Processes _posts/, _layouts/, _includes/, _data/   │
│  ├── Processes _pages/ collection (pages + generated products)    │
│  ├── Generates search.json from Liquid template         │
│  ├── Runs plugins: seo-tag, sitemap, feed, paginate...  │
│  ├── Copies assets/dist/* as static files               │
│  └── Outputs _site/ (served at github.io)               │
│                                                         │
│  Jekyll does NOT touch bundle.js or bundle.css.         │
│  Plugins generate: sitemap.xml, feed.xml, meta tags.    │
└─────────────────────────────────────────────────────────┘
```

## Build Pipeline

```
src/main.js
    │
    ├── imports src/app.css
    │       │
    │       ├── @import "tailwindcss"
    │       └── @source directives (scans _layouts, _includes, _posts, _pages, src)
    │
    └── imports src/components/*.svelte
            │
            └── Each component has:
                  <svelte:options customElement={{ tag: "jam-*", shadow: "none" }} />
                  Auto-registers as a custom element on import

            Vite (IIFE mode)
                  │
                  ├── assets/dist/bundle.js   (all components in one file)
                  └── assets/dist/bundle.css  (all Tailwind utilities used)
```

## Runtime Flow (Browser)

```
1. Browser requests page (e.g., /en/about/)
2. Inline <script> in <head> runs immediately:
   └── Checks localStorage/OS preference → adds .dark to <html> if needed
3. Jekyll-generated HTML loads (static content already visible)
   └── Includes: <title>, <meta>, OG, JSON-LD, hreflang, lang-switcher
   └── <html lang="en"> set from page.lang
4. <link> loads bundle.css → Tailwind + dark mode styles apply
5. <script> loads bundle.js →
   ├── Custom elements register (jam-* tags upgrade)
   ├── jam-theme-toggle syncs with current dark/light state
   ├── jam-slider parses JSON data and starts autoplay
   ├── jam-search registers Cmd+K listener (index loads on first open)
   ├── jam-stories renders category bubbles from data-items JSON
   ├── jam-product-carousel renders product cards with scroll-snap
   ├── Motion animations activate (inView, scroll)
   └── View Transitions API hooks install (if supported)
6. Components become interactive (onclick, $state, etc.)
7. Internal link clicks → View Transition crossfade (Chrome/Edge)
   └── Unsupported browsers: normal navigation (no animation)
```

Steps 1-3 happen without the Vite bundle. This is the progressive enhancement boundary — content, SEO meta, dark mode, and language switcher all work before bundle.js loads.

## SEO Layer

```
_config.yml (site-level: title, description, url, author)
    │
    ├── jekyll-seo-tag
    │   └── Generates per page:
    │       ├── <title>
    │       ├── <meta name="description">
    │       ├── <link rel="canonical">
    │       ├── Open Graph tags (og:title, og:description, og:image)
    │       ├── Twitter Card tags
    │       └── JSON-LD structured data (WebSite, WebPage, BlogPosting)
    │
    ├── jekyll-sitemap
    │   └── Generates /sitemap.xml (auto-discovers all pages/posts)
    │
    └── jekyll-feed
        └── Generates /feed.xml (Atom feed of all posts)

Per-page overrides via front matter:
  title, description, image, author
```

All SEO output is in the initial HTML — no JavaScript dependency. Search engines see fully formed meta tags on first crawl.

## Multilanguage (i18n) Architecture

```
_config.yml
    │
    ├── languages: ["tr", "en"]       ← list of supported languages
    ├── default_lang: "tr"            ← root URL language (no prefix)
    └── defaults:                     ← auto-assigns lang based on file path
        ├── path: ""        → lang: "tr"
        ├── path: "en"      → lang: "en", permalink: /en/:title/
        ├── path: "_posts/tr" → lang: "tr"
        └── path: "_posts/en" → lang: "en", permalink: /en/:title/

Content Structure:
    _pages/tr/index.md  (lang: tr, ref: home, permalink: /)     → /
    _pages/tr/about.md  (lang: tr, ref: about, permalink: /about/) → /about/
    _pages/en/index.md  (lang: en, ref: home, permalink: /en/)  → /en/
    _pages/en/about.md  (lang: en, ref: about, permalink: /en/about/) → /en/about/
    _posts/tr/2026-*.md (lang: tr)                → /blog-title/
    _posts/en/2026-*.md (lang: en)                → /en/blog-title/

Translation Linking (ref system):
    page.ref = "about"
        ├── _pages/tr/about.md  (lang: tr, ref: about)
        └── _pages/en/about.md  (lang: en, ref: about)
    
    Liquid finds translations:
        site.pages | where: "ref", page.ref | where: "lang", target_lang

Data Files:
    _data/i18n/tr.yml   ← UI strings (nav, footer, labels)
    _data/i18n/en.yml
    _data/slides/tr.yml ← slider content per language
    _data/slides/en.yml

    Access: site.data.i18n[page.lang].key_name
```

### Adding a New Language

No code changes needed. Steps:
1. Add code to `_config.yml` `languages` array
2. Add `defaults` scope for new path
3. Create `_data/i18n/{lang}.yml` and `_data/slides/{lang}.yml`
4. Create `_pages/{lang}/` directory with pages (matching `ref` values)
5. Create `_posts/{lang}/` directory for posts

hreflang tags, language switcher, and slider automatically detect the new language.

## Dark Mode Architecture

```
Theme Resolution (3-step chain):
    1. localStorage.getItem("theme")  → explicit user choice
    2. matchMedia("(prefers-color-scheme: dark)")  → OS preference
    3. fallback → "light"

Flow:
    Page load → inline <script> in <head>
        ├── Reads localStorage/OS preference
        └── Adds .dark class to <html> BEFORE CSS renders (no FOUC)
    
    bundle.js loads → jam-theme-toggle component
        ├── Reads current state from <html>.classList
        ├── Toggle button updates:
        │   ├── document.documentElement.classList.toggle("dark")
        │   └── localStorage.setItem("theme", ...)
        └── All dark: utilities react instantly

CSS:
    @custom-variant dark (&:where(.dark, .dark *));
    
    Usage: bg-jam-surface dark:bg-jam-surface-dark
```

## Slider Architecture

```
_data/slides/{lang}.yml
    │
    └── Liquid: site.data.slides[page.lang] | jsonify
          │
          └── <jam-slider data-slides="[...]" autoplay="5000">
                │
                └── Svelte component:
                    ├── Parses JSON from data-slides attribute
                    ├── Renders slides by type (hero | image)
                    ├── Navigation: arrows, dots, keyboard, touch
                    ├── Autoplay with configurable interval
                    └── Motion animations for transitions
```

Slide types:
| Type | Fields | Renders |
|------|--------|---------|
| `hero` | title, description, image, cta_text, cta_link | Full-width background + overlay text + CTA button |
| `image` | image, alt | Full-width image with alt text |

## Product Data Architecture

```
_data/products/{sku}.yml (single source of truth)
    │
    ├── Shared fields: sku, price, currency, image, images, tags, categories, active
    └── Per-language: tr: {title, description, slug}, en: {title, description, slug}

Pre-build step (node scripts/generate-products.js):
    │
    ├── Reads _config.yml → languages, default_lang
    ├── Reads _data/products/*.yml
    └── Generates wrapper pages:
        ├── _pages/products/tr/sku001.md  (lang: tr, ref: sku001, layout: product)
        ├── _pages/products/en/sku001.md  (lang: en, ref: sku001, layout: product)
        └── ... for each SKU × language

Jekyll build:
    │
    ├── Wrapper pages processed → HTML pages with permalink
    └── _layouts/product.html reads data from site.data.products[page.ref]
        └── Uses page.lang to select localized title/description
```

### Product Data Flow

```
_data/products/sku001.yml
        │
        ├── generate-products.js → _pages/products/tr/sku001.md (front matter only)
        │                              │
        │                              └── Jekyll → /products/kablosuz-kulaklik/
        │
        └── _layouts/product.html
            └── site.data.products[page.ref] → renders price, images, description
```

## Search Architecture

```
Build time (Jekyll Liquid):
    search.json (layout: null)
        │
        ├── Iterates site.posts → {title, url, content, tags, categories, lang, type: "post"}
        ├── Iterates site.pages (with ref) → {title, url, content, lang, type: "page"}
        └── Iterates site.data.products → {title, url, description, tags, lang, type: "product"}
            (one entry per SKU × language)

Runtime (jam-search Svelte component):
    User presses Cmd+K / Ctrl+K
        │
        ├── Fetches /search.json (once, cached)
        ├── Filters entries by current lang attribute
        ├── Builds Lunr.js index (with lunr.tr for Turkish stemmer)
        └── Live search → ranked results with type badges
            │
            ├── Keyboard navigation (up/down/enter/esc)
            └── Click → navigate to result URL
```

## Stories Architecture (Category Bubbles — Instagram Stories UI)

```
Data Source:
    Categories → collected from product categories in site.data.products

Liquid Template → generates JSON:
    {% capture category_stories %}[...JSON items...]{% endcapture %}
        │
        └── Each item: {title, subtitle, icon, gradient, link}

<jam-stories> Custom Element (Svelte):
    ┌─ Bubble Row ─────────────────────────────────────────┐
    │  (○) (○) (○)  ← horizontally scrollable             │
    │  gradient ring, icon/initial, category label         │
    └──────────────────────────────────────────────────────┘
        │ click
        ▼
    ┌─ Fullscreen Viewer ──────────────────────────────────┐
    │  [■■■■■░░░░░] [░░░░░░]  ← progress bars             │
    │  ┌─────────────────────────────────────────────┐     │
    │  │  gradient background + icon                 │     │
    │  │  (left tap = prev, right tap = next)        │     │
    │  │  (long press = pause)                       │     │
    │  └─────────────────────────────────────────────┘     │
    │  Category Title, Subtitle (item count)               │
    └──────────────────────────────────────────────────────┘

    Keyboard: ← → (navigate), Escape (close)
    Auto-advance: configurable via duration attribute (ms)
    Used on: index pages, products pages (category navigation)
```

## Product Carousel Architecture (Owl Carousel-style)

```
Data Source:
    Products → site.data.products (per-SKU YAML files)

Liquid Template → generates JSON:
    {% capture carousel_products %}[...JSON items...]{% endcapture %}
        │
        └── Each item: {title, image, description, price, link, tags, gradient}

<jam-product-carousel> Custom Element (Svelte):
    ┌─ Header ─────────────────────────────────────────────┐
    │  Label                           (●) (○) (○)  dots  │
    └──────────────────────────────────────────────────────┘
    ┌─ Card Track (scroll-snap) ───────────────────────────┐
    │ ┌──────────┐ ┌──────────┐ ┌──────────┐              │
    │ │  image   │ │  image   │ │  image   │  ← drag/swipe│
    │ │  title   │ │  title   │ │  title   │              │
    │ │  price   │ │  price   │ │  price   │              │
    │ │  tags    │ │  tags    │ │  tags    │              │
    │ └──────────┘ └──────────┘ └──────────┘              │
    └──────────────────────────────────────────────────────┘
      ◀ prev                                    next ▶
         (arrows appear on hover, hidden on mobile)

    Responsive: 1 card (mobile) / 2 cards (tablet) / 3 cards (desktop)
    Auto-play: configurable via autoplay attribute (ms)
    Drag/swipe via pointer events, CSS scroll-snap for native feel
    Each card links to product detail page
    Used on: index pages
```

## Tag/Category Aggregation

```
Tag/Category index pages aggregate from two sources:

    site.posts (filtered by page.lang)
        │
        └── post.tags, post.categories

    site.data.products (filtered by product[page.lang] existence)
        │
        └── product.tags, product.categories

    Combined → unique tag/category list for the current language
```

## Component Architecture

```
_layouts/default.html
    │
    ├── <html lang="{{ page.lang }}">
    │
    ├── <head>
    │   ├── inline <script>            ← dark mode FOUC prevention
    │   ├── {% seo %}                  ← meta tags, OG, JSON-LD
    │   ├── {% feed_meta %}            ← RSS <link> tag
    │   ├── {% include hreflang.html %}← alternate language links
    │   └── <link href="bundle.css">   ← Tailwind + dark mode styles
    │
    ├── <body class="bg-jam-surface dark:bg-jam-surface-dark ...">
    │   ├── {% include navbar.html %}
    │   │     ├── {% include lang-switcher.html %}  ← pure Liquid
    │   │     └── <jam-theme-toggle>                ← Svelte component
    │   ├── <jam-search lang="{{ page.lang }}" baseurl="{{ site.baseurl }}">
    │   ├── <jam-slider data-slides="{{ slides | jsonify | escape }}">
    │   ├── <main>{{ content }}</main>
    │   ├── {% include footer.html %}
    │   └── <script src="bundle.js">   ← Svelte + Motion + View Transitions
    │
    └── Generated files (by plugins):
        ├── /sitemap.xml
        └── /feed.xml
```

### Component Communication

Svelte custom elements are isolated by design. Communication patterns:

| Pattern | When to use | Example |
|---------|------------|---------|
| HTML attributes/props | Parent → Child data | `<jam-card title="Hello">` |
| Custom events | Child → Parent notification | `this.dispatchEvent(new CustomEvent("select"))` |
| Shared URL state | Cross-component sync | Query params or hash fragments |
| DOM events | Global broadcasts | `window.dispatchEvent(...)` |

Do NOT use Svelte stores across custom elements — each element has its own Svelte runtime instance.

## Data Flow

```
Jekyll Data (_data/*.yml)
    │
    └── Liquid templates render static HTML
          │
          └── HTML attributes pass data to Svelte components

Example:
  _data/features.yml → Liquid loop → <jam-feature title="{{ f.title }}">
```

For dynamic data (API calls, user input), handle entirely within Svelte components using `$state` and `$effect`.

## Animation Layer

```
Motion (motion.dev)
    │
    ├── inView()     → Triggers animation when element enters viewport
    ├── scroll()     → Binds animation progress to scroll position
    └── animate()    → Imperative animation of any CSS property
    
    Used inside Svelte components via onMount or $effect:
    
    $effect(() => {
      inView(element, () => {
        animate(element, { opacity: [0, 1], y: [20, 0] });
      });
    });

View Transitions API (browser-native)
    │
    └── Intercepts same-origin <a> clicks in main.js
        ├── Supported (Chrome/Edge): crossfade between pages
        └── Unsupported (Firefox/Safari): normal navigation, no break
```

Motion handles in-page animations. View Transitions handle page-to-page transitions. They do not overlap.

## PWA Architecture (future)

```
manifest.json      → App name, icons, theme color, display mode
sw.js              → Service Worker: cache-first for assets, network-first for HTML
    │
    ├── Precache: bundle.js, bundle.css, key images
    ├── Runtime cache: HTML pages (network-first with offline fallback)
    └── Offline page: cached shell with "you are offline" message
```

Service Worker is a static file in the repo root. Jekyll copies it to `_site/` as-is. No build step needed. Implementation deferred to after core site is functional.

## File Ownership

| Directory | Owned by | Built by | Deployed by |
|-----------|----------|----------|-------------|
| `src/` | Developer | — | Not deployed (excluded) |
| `assets/dist/` | Vite | `npm run build` | Jekyll (static copy) |
| `_posts/{lang}/` | Content author | — | Jekyll (Markdown → HTML) |
| `_layouts/`, `_includes/` | Developer | — | Jekyll (template processing) |
| `_data/i18n/` | Translator/Developer | — | Jekyll (available via Liquid) |
| `_data/slides/` | Content author | — | Jekyll (available via Liquid) |
| `_data/products/` | Content author | — | Jekyll (available via Liquid) |
| `_pages/` | Content author | — | Jekyll (collection) |
| `_pages/products/{lang}/` | — | `generate-products.js` | Jekyll (page generation) |
| `_pages/{lang}/` (tags, categories, pages) | Content author | — | Jekyll (page generation) |
| `src/components/Stories.svelte` | Developer | Vite | Via `assets/dist/bundle.js` |
| `scripts/` | Developer | — | Not deployed (excluded) |
| `assets/icons/sprite.svg` | — | `generate-sprite.js` | Jekyll (static copy) |
| `search.json` | — | Jekyll (Liquid template) | Jekyll (static file) |
| `_site/` | — | Jekyll | GitHub Pages (served) |
| `sitemap.xml` | — | jekyll-sitemap | Jekyll (auto-generated) |
| `feed.xml` | — | jekyll-feed | Jekyll (auto-generated) |
| `manifest.json` | Developer | — | Jekyll (static copy) |
| `sw.js` | Developer | — | Jekyll (static copy) |
