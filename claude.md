# Project Context: Astro 5 + Svelte 5 + Tailwind CSS 4 Static Site

**AI summary and entry point.** Read this first for context; then use ARCHITECTURE.md, DESIGN.md, PROCESS.md as needed.

---

## Documentation system (Markdown file roles)

| File | Audience | Purpose |
|------|----------|---------|
| **ARCHITECTURE.md** | AI | System architecture only: build pipeline, data flow, runtime, components, ownership. |
| **CLAUDE.md** | AI | This file. Project summary, tech stack, directory layout, config, rules. Documents this .md file system. |
| **DESIGN.md** | AI | Styles and design reference: Tailwind theme, colors, typography, component patterns, animation, dark mode. |
| **PROCESS.md** | AI | Feature tracking, todo list, completed work, backlog, and process notes. |
| **README.md** | Human | Main project doc for people: what it is, how to run, deploy, add content. Human-readable only. |

- **AI-optimized, AI-readable:** ARCHITECTURE.md, CLAUDE.md, DESIGN.md, PROCESS.md — structured for agents.
- **Human-optimized, Human-readable:** README.md — most understandable doc for developers and users.

---

## Vision

Statik site Astro 5 ile üretilir; etkileşimli arayüz Svelte 5 bileşenleri ile sağlanır. Tailwind CSS 4 ile stillenir. Çok dilli (TR root, EN /en/ prefix), blog (Content Collections), ürün kataloğu (src/content/products), sayfa içerikleri (src/content/pages), slider (src/content/slides), site içi arama (Fuse.js + build-time index), dark mode ve PWA desteklenir. Deploy tamamen statik çıktı (dist/) ile yapılır.

## Tech Stack

| Katman | Teknoloji | Not |
|--------|-----------|-----|
| SSG | Astro 5 | Tek SSG |
| UI | Svelte 5 | Bileşenler client:visible / client:load ile hydrate |
| Stil | Tailwind CSS 4 | CSS-first, src/styles/global.css, @theme |
| Dark mode | Tailwind @custom-variant + localStorage | .dark sınıfı, FOUC önleme inline script |
| Animasyon | Motion (motion.dev) | inView, scroll, animate |
| Sayfa geçişleri | astro:transitions (ClientRouter) | View Transitions API |
| SEO | Astro layout | Meta, OG, Twitter, canonical; @astrojs/sitemap |
| RSS | @astrojs/rss | src/pages/feed.xml.js |
| Arama | Fuse.js | public/search-index.json (build’te üretilir), SearchFuse.svelte |
| Ürünler | src/content/products/*.md + src/data/products.js | getProductPaths, getProductBySlug |
| Slider | src/content/slides/*.md + src/data/slides.js | getSlides(lang) |
| i18n | src/i18n/*.js | t(lang), Astro i18n routing |
| PWA | vite-plugin-pwa | Workbox, public/manifest.json |
| Deploy | Statik host / GitHub Pages | dist/ içeriği |

## Dizin Yapısı

```
.
├── astro.config.mjs      # Astro, Svelte, Tailwind, sitemap, PWA
├── _data/
│   ├── products/          # Ürün YAML (sku, price, tr/en blokları)
│   │   └── sku001.yml ...
│   └── slides/            # Slider içeriği dil bazlı
│       ├── tr.yml
│       └── en.yml
├── public/
│   ├── manifest.json
│   ├── robots.txt
│   └── search-index.json  # Build’te üretilir (search-index.js)
├── scripts/
│   └── postbuild-404.mjs  # Build sonrası 404 kopyalama
├── src/
│   ├── components/       # Svelte bileşenleri
│   │   ├── DarkModeToggle.svelte
│   │   ├── SearchFuse.svelte
│   │   ├── Slider.svelte
│   │   ├── ProductCarousel.svelte
│   │   └── ...
│   ├── config/
│   │   └── site.js       # site, languages, defaultLang, getLangPrefix, getCanonicalUrl
│   ├── content/
│   │   ├── config.js     # posts + pages collection schema
│   │   ├── posts/        # .md blog yazıları
│   │   ├── pages/        # .md about, getting-started (tr/en)
│   │   ├── products/     # .md ürün frontmatter
│   │   └── slides/       # .md slider slide’lar (lang, order)
│   ├── data/
│   │   ├── products.js   # content/products okur
│   │   └── slides.js     # content/slides okur, getSlides(lang)
│   ├── i18n/
│   │   ├── index.js      # t(lang)
│   │   ├── tr.js
│   │   └── en.js
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── search-index.js  # Build’te public/search-index.json üretir
│   ├── pages/
│   │   ├── index.astro, about.astro, blog/, products/, tags.astro, categories.astro, ...
│   │   ├── en/           # İngilizce sayfalar
│   │   ├── 404.astro
│   │   └── feed.xml.js   # RSS
│   └── styles/
│       └── global.css    # Tailwind, @custom-variant dark, @theme
├── package.json
└── tsconfig.json         # astro/tsconfigs/base, allowJs
```

## Önemli Yapılandırmalar

### astro.config.mjs

- `site`: production URL (sitemap/canonical için).
- `i18n`: defaultLocale `tr`, locales `["tr","en"]`, prefixDefaultLocale: false (TR root).
- `integrations`: svelte(), sitemap().
- `vite.plugins`: tailwindcss(), VitePWA (Workbox, manifest: false — public/manifest.json kullanılır).

### src/config/site.js

- `site` (title, description, url, baseUrl), `languages`, `defaultLang`, `isDefaultLang(lang)`, `getLangPrefix(lang)`, `getCanonicalUrl(path, lang)`.

### src/styles/global.css

- `@import "tailwindcss"`, `@custom-variant dark (&:where(.dark, .dark *));`
- `@source "./**/*.astro"; @source "./**/*.svelte";`
- `@theme { --color-jam-*, --font-heading, --font-body }`

### Build komutu

```json
"build": "node src/lib/search-index.js && astro build && node scripts/postbuild-404.mjs"
```

## Kurallar ve Kısıtlamalar

- **Dil**: TR root (`/`), EN `/en/`. Yeni sayfa için TR için `src/pages/...`, EN için `src/pages/en/...`.
- **Çeviriler**: Sadece `src/i18n/*.js`. Yeni anahtar eklenince tr.js ve en.js güncellenir.
- **Ürün verisi**: Sadece `src/content/products/{sku}.md`. Frontmatter’da ortak alanlar + `tr`/`en` blokları (title, description, slug). Sayfa üretimi `getProductPaths()` + [slug].astro ile.
- **Blog**: Sadece `src/content/posts/*.md`. Schema: title, description, date, image, tags, categories, ref, lang.
- **SEO**: BaseLayout’ta title, description, ogImage, canonical; blog/ürün sayfalarında ogImage prop kullan.
- **Tailwind**: Sadece utility sınıfları; yapılamayanlar için global.css’te kural ve DESIGN.md’de dokümante et.
- **Svelte 5**: $state, $derived, $effect kullan; custom element zorunlu değil, normal Svelte bileşenleri Astro’da client:visible/client:load.
- **Dark mode**: .dark sınıfı + dark: utility’leri; FOUC için <head> inline script değiştirilmesin.
- **Arama**: search-index.js build’te çalışır; SearchFuse dil filtreli Fuse.js kullanır.

## Referans dokümanlar (bu .md sistemi)

| Dosya | Amaç |
|-------|------|
| **ARCHITECTURE.md** | Sistem mimarisi, veri akışı, build pipeline. |
| **CLAUDE.md** | Proje özeti, tech stack, dizin, kurallar, bu dokümantasyon sistemi (bu dosya). |
| **DESIGN.md** | Renk, tipografi, bileşen stilleri, animasyon, dark mode. |
| **PROCESS.md** | Tamamlanan işler, backlog, süreç notları. |
| **README.md** | İnsan odaklı: proje tanımı, kurulum, kullanım. |

AI ajanları önce CLAUDE.md ile bağlamı alsın; mimari için ARCHITECTURE.md, stil için DESIGN.md, ilerleme için PROCESS.md kullanılsın. README.md yalnızca insan okunabilirliği içindir.
