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

Statik site Astro 5 ile üretilir; etkileşimli arayüz Svelte 5 bileşenleri ile sağlanır. Tailwind CSS 4 ile stillenir. Çok dilli (TR /tr/, EN /en/ prefix), blog (Content Collections), ürün kataloğu (src/content/products), sayfa içerikleri (src/content/pages), modüler UI blokları (Hero, Feature, CTA, FAQ), slider (src/content/slides), site içi arama (Fuse.js + build-time index), dark mode ve PWA desteklenir.

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
│   ├── assets/
│   │   └── img/          # README ve showcase görselleri
│   ├── components/       # Svelte bileşenleri
│   │   ├── blocks/       # Modular UI blokları (Hero, Feature, CTA, FAQ vb.)
│   │   ├── DarkModeToggle.svelte
│   │   ├── SearchFuse.svelte
│   │   ├── Slider.svelte
│   │   ├── ProductCarousel.svelte
│   │   └── ...
│   ├── config/
│   │   └── site.js       # Tekil config: site, features, languages, yardımcılar
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
│   │   ├── [lang]/       # Dinamik dil rotaları (index, about, blog, products, 404, offline, RSS)
│   │   └── index.astro   # Kök yönlendirme (/ -> /tr/)
│   └── styles/
│       └── global.css    # Tailwind, @custom-variant dark, @theme
├── package.json
└── tsconfig.json         # astro/tsconfigs/base, allowJs
```

## Önemli Yapılandırmalar

### astro.config.mjs

- `site`: **src/config/site.js**'deki `site.url` kullanılır (yoksa fallback).
- `i18n`: **site.js'den türetilir** — `languages` ve `defaultLang` import edilir; defaultLocale `tr`, locales `["tr","en"]` (yeni dil eklemek için sadece `src/config/site.js` güncellenir), prefixDefaultLocale: true (Tüm diller ön ek alır).
- `integrations`: svelte(), sitemap() **features.sitemap** true ise eklenir.
- `vite.plugins`: tailwindcss(), **features.pwa** true ise VitePWA (Workbox, manifest: false — public/manifest.json kullanılır).

### src/config/site.js (tekil config — Jekyll _config benzeri)

- **Tek yapılandırma kaynağı**: Site kimliği, özellik aç/kapa ve i18n tek bu dosyadan yönetilir.
- **site**: title, description, url, baseUrl (canonical, sitemap, RSS için).
- **features**: blog, products, search, pwa, rss, darkMode, sitemap, tags, categories, features, gettingStarted — her biri true/false ile ilgili sayfaları, nav linklerini, feed’i, arama index’ini ve PWA’yı açar/kapatır.
- **i18n**: languages, defaultLang, localeForOg, languageLabels. Yeni dil için sadece `languages`’a ekle; astro.config ve content config buradan okur.
- **Yardımcılar**: isDefaultLang(lang), getLangPrefix(lang), getOgLocale(lang), getCanonicalUrl(path, lang), getSiteBase().

### src/styles/global.css

- `@import "tailwindcss"`, `@custom-variant dark (&:where(.dark, .dark *));`
- `@source "./**/*.astro"; @source "./**/*.svelte";`
- `@theme { --color-jam-*, --font-heading, --font-body }`

### Build komutu

```json
"build": "node src/lib/search-index.js && astro build && node scripts/postbuild-404.mjs"
```

## Kurallar ve Kısıtlamalar

- **Tekil config**: Site özellikleri ve kimliği **sadece** `src/config/site.js` üzerinden değiştirilir (Jekyll _config.yml benzeri). `site`, `features` ve `languages` burada tanımlanır; Astro config, layout, feed, arama ve sayfa üretimi buradan okur.
- **Dil**: TR `/tr/`, EN `/en/`. **Dil listesi tek kaynak**: `src/config/site.js` → `languages` dizisi; Astro i18n ve Content Collections şeması buradan türetilir. Yeni dil eklemek için önce `site.js` içinde `languages`'a ekle (örn. `"de"`), ardından `src/i18n/{lang}.js`, `src/pages/[lang]/` (dinamik yapıda olduğu için sadece içerik/data gerekebilir) ve gerekirse `localeForOg` / `languageLabels` ekle.
- **Çeviriler**: Sadece `src/i18n/*.js`. Yeni anahtar eklenince tr.js ve en.js güncellenir.
- **Ürün verisi**: Sadece `src/content/products/{sku}.md`. Frontmatter’da ortak alanlar + `tr`/`en` blokları (title, description, slug). Sayfa üretimi `getProductPaths()` + [slug].astro ile.
- **Modüler Bloklar**: `src/components/blocks/`. `src/content/config.js` şemasına göre ekleme yapılır. `BlockRenderer.svelte` üzerinden yönetilir.
- **Media**: Tanıtım resimleri `src/assets/img/`.
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
