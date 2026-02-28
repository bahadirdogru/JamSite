# Project Context: Astro 5 + Svelte 5 + Tailwind CSS 4 Static Site

## Vision

Statik site Astro 5 ile üretilir; etkileşimli arayüz Svelte 5 bileşenleri ile sağlanır. Tailwind CSS 4 ile stillenir. Çok dilli (TR root, EN /en/ prefix), blog (Content Collections), ürün kataloğu (_data/products), site içi arama (Fuse.js + build-time index), dark mode ve PWA desteklenir. Jekyll kullanılmaz; deploy tamamen statik çıktı (dist/) ile yapılır.

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
| Ürünler | _data/products/*.yml + src/data/products.js | getProductPaths, getProductBySlug |
| Slider | _data/slides/*.yml + src/data/slides.js | getSlides(lang) |
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
│   │   ├── config.js     # posts collection schema
│   │   └── posts/        # .md blog yazıları (lang, title, description, date, tags, categories)
│   ├── data/
│   │   ├── products.js   # getProducts, getProductBySku, getProductBySlug, getProductPaths
│   │   └── slides.js     # getSlides(lang)
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
- **Ürün verisi**: Sadece `_data/products/{sku}.yml`. Ortak alanlar + `tr`/`en` blokları (title, description, slug). Sayfa üretimi `getProductPaths()` + [slug].astro ile.
- **Blog**: Sadece `src/content/posts/*.md`. Schema: title, description, date, image, tags, categories, ref, lang.
- **SEO**: BaseLayout’ta title, description, ogImage, canonical; blog/ürün sayfalarında ogImage prop kullan.
- **Tailwind**: Sadece utility sınıfları; yapılamayanlar için global.css’te kural ve Styles.md’de dokümante et.
- **Svelte 5**: $state, $derived, $effect kullan; custom element zorunlu değil, normal Svelte bileşenleri Astro’da client:visible/client:load.
- **Dark mode**: .dark sınıfı + dark: utility’leri; FOUC için <head> inline script değiştirilmesin.
- **Arama**: search-index.js build’te çalışır; SearchFuse dil filtreli Fuse.js kullanır.

## Referans Dokümanlar

| Dosya | Amaç |
|-------|------|
| claude.md | Proje bağlamı, tech stack, dizin, kurallar (bu dosya) |
| Architecture.md | Sistem mimarisi, veri akışı, build pipeline |
| Styles.md | Renk, tipografi, bileşen stilleri, animasyon |
| process.md | Tamamlanan işler, sprint, backlog |
| README.md | Repo tanımı, kurulum, kullanım |

AI ajanları önce claude.md ile bağlamı alsın, gerektikçe diğer dosyalara baksın.
