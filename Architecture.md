# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT (Local)                              │
│                                                                          │
│  src/                          _data/                                    │
│  ├── components/               ├── products/*.yml   (ürün verisi)         │
│  │   ├── DarkModeToggle.svelte └── slides/{lang}.yml (slider verisi)      │
│  │   ├── Slider.svelte                                                    │
│  │   ├── SearchFuse.svelte                                                │
│  │   └── ...                                                             │
│  ├── content/                                                            │
│  │   ├── config.js             (posts schema)                            │
│  │   └── posts/*.md            (blog yazıları)                           │
│  ├── data/                                                               │
│  │   ├── products.js           (_data/products okur)                     │
│  │   └── slides.js             (_data/slides okur)                        │
│  ├── i18n/                     (tr.js, en.js, index.js)                  │
│  ├── layouts/                  BaseLayout.astro                          │
│  ├── lib/                      search-index.js → public/search-index.json │
│  ├── pages/                    (tr root, en/ prefix)                      │
│  ├── config/site.js                                                       │
│  └── styles/global.css         (Tailwind 4, @theme, dark variant)         │
│                                                                          │
│  scripts/                                                                 │
│  └── postbuild-404.mjs         (build sonrası 404 kopyalama)               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                               npm run build
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         BUILD PIPELINE                                   │
│                                                                          │
│  1. node src/lib/search-index.js  → public/search-index.json (Fuse.js)    │
│  2. astro build                   → dist/ (HTML, CSS, JS, fonts)         │
│  3. node scripts/postbuild-404.mjs → dist/404.html kopyala                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                               Deploy (static host)
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT (Static Host / GitHub Pages)                │
│                                                                          │
│  dist/ (veya _site/) statik olarak sunulur.                              │
│  Jekyll yok; Astro tek SSG. Sitemap, RSS, PWA Astro/Vite ile.            │
└─────────────────────────────────────────────────────────────────────────┘
```

## Build Pipeline

```
src/lib/search-index.js (Node)
    │
    ├── src/content/posts/*.md + _data/products → public/search-index.json
    │
src/pages/**/*.astro
    │
    ├── BaseLayout.astro → global CSS, meta, navbar, footer, ClientRouter
    ├── Astro + Svelte (client:visible / client:load) → hydrate
    └── Content Collections (posts) → getCollection, getEntry
            │
            └── Vite + Tailwind 4 + @astrojs/svelte
                    │
                    ├── dist/_astro/*.js, *.css
                    └── dist/**/*.html
```

## Runtime Flow (Browser)

```
1. İstek (örn. /en/about/)
2. <head> içindeki inline script: localStorage/OS → .dark sınıfı (FOUC önleme)
3. Astro üretimi HTML yüklenir (meta, title, OG, lang)
4. CSS/JS yüklenir → Tailwind + Svelte bileşenleri hydrate
5. ClientRouter (astro:transitions) → sayfa geçişlerinde View Transitions
6. Cmd+K → SearchFuse, /search-index.json ile Fuse.js arama
```

İçerik ve SEO tamamen HTML'de; JavaScript yalnızca etkileşimi artırır.

## SEO Katmanı

- **Astro sayfaları**: Her sayfa `BaseLayout` ile `title`, `description`, `ogImage`, canonical, hreflang (dil linkleri layout/nav'da).
- **Sitemap**: `@astrojs/sitemap` → `sitemap-index.xml`, `sitemap-0.xml`.
- **RSS**: `src/pages/feed.xml.js` → `feed.xml`.
- **robots.txt**: `public/robots.txt` (izinler).

OG/Twitter meta `BaseLayout.astro` içinde; blog/ürün sayfalarında `ogImage` prop ile sayfa özel görseli.

## Çok Dilli (i18n) Mimarisi

- **Astro i18n**: `astro.config.mjs` → `i18n.defaultLocale: "tr"`, `locales: ["tr","en"]`, `prefixDefaultLocale: false` → TR root (`/`), EN prefix (`/en/`).
- **Sayfa yapısı**: `src/pages/index.astro`, `about.astro`, … → TR; `src/pages/en/index.astro`, `en/about.astro`, … → EN.
- **Çeviriler**: `src/i18n/tr.js`, `src/i18n/en.js`, `src/i18n/index.js` → `t(lang)` ile UI metinleri.
- **Blog**: `src/content/posts/*.md` içinde `lang: tr | en`; slug routing ile `/blog/[slug]` ve `/en/blog/[slug]`.
- **Ürünler**: `_data/products/*.yml` içinde `tr`/`en` blokları; `src/data/products.js` → `getProductBySlug(slug, lang)`.
- **Slider**: `_data/slides/tr.yml`, `_data/slides/en.yml` → `src/data/slides.js` → `getSlides(lang)`.

Yeni dil eklemek için: config'e locale ekleme, `src/pages/{lang}/` sayfaları, `src/i18n/{lang}.js`, `_data/slides/{lang}.yml` ve ürün YAML'larında ilgili dil bloğu.

## Dark Mode

- **Çözümleme**: `localStorage.theme` → `prefers-color-scheme: dark` → varsayılan light.
- **Uygulama**: `<head>` içinde inline script `.dark` sınıfını hemen ekler; `DarkModeToggle.svelte` (ThemeToggle) sınıfı ve localStorage'ı günceller.
- **CSS**: `src/styles/global.css` → `@custom-variant dark` + `@theme` ile jam-surface-dark, jam-text-dark vb.

## Slider Mimarisi

- **Veri**: `_data/slides/{lang}.yml` → `src/data/slides.js` → `getSlides(lang)`.
- **Bileşen**: `Slider.svelte` — `slides` prop (hero | image tipleri), autoplay, oklar, noktalar, klavye/touch.
- **Kullanım**: Ana sayfa (tr/en) Astro'da `getSlides(lang)` çağırıp `<Slider slides={...} />` ile kullanır.

## Ürün Verisi Mimarisi

- **Kaynak**: `_data/products/{sku}.yml` — ortak alanlar (price, image, tags, categories) + dil blokları (tr/en: title, description, slug).
- **Okuma**: `src/data/products.js` → `getProducts()`, `getProductBySku(sku)`, `getProductBySlug(slug, lang)`, `getProductPaths()` (getStaticPaths için).
- **Sayfalar**: `src/pages/products/[slug].astro`, `src/pages/en/products/[slug].astro` → getStaticPaths + getProductBySlug ile HTML üretimi.

## Arama Mimarisi

- **Build**: `src/lib/search-index.js` — post front matter + ürün verisi → `public/search-index.json` (Fuse.js için alanlar: title, url, slug, lang, type, content/keywords).
- **Çalışma zamanı**: `SearchFuse.svelte` — Cmd+K ile modal açar, `/search-index.json` indirir, Fuse.js ile dil filtreli arama, klavye ile seçim.

## Bileşen Mimarisi

- **Layout**: `BaseLayout.astro` — props: title, description, lang, canonicalURL, noindex, ogImage. İçerik: navbar (linkler, dil değiştirici, SearchFuse, DarkModeToggle), `<slot />`, footer. `<ClientRouter />` View Transitions için.
- **Svelte**: Navbar/footer Astro içinde; Slider, ProductCarousel, SearchFuse, DarkModeToggle, FavoritesBadge, CompareBar vb. Svelte. Gerekli yerlerde `client:visible` veya `client:load`.
- **İletişim**: Props (Astro → Svelte), custom events (Svelte → parent), URL/query state paylaşımı.

## Veri Akışı

```
_data/products/*.yml, _data/slides/*.yml
    → src/data/products.js, slides.js
    → Astro sayfalarında import + getProducts(), getSlides(lang)

src/content/posts/*.md
    → getCollection("posts"), getEntry()
    → Blog listesi ve [slug] sayfaları

src/i18n/*.js
    → t(lang) → BaseLayout ve sayfalarda UI metinleri
```

## Animasyon ve PWA

- **Motion**: Svelte bileşenlerinde `inView`, `scroll`, `animate`.
- **View Transitions**: `<ClientRouter />` (astro:transitions).
- **PWA**: vite-plugin-pwa (Workbox), `public/manifest.json`.

## Dosya Sahipliği

| Dizin / Dosya | Sahibi | Üreten | Not |
|---------------|--------|--------|-----|
| `src/` | Geliştirici | — | Kaynak |
| `_data/products/`, `_data/slides/` | İçerik / geliştirici | — | Astro build'te okunur |
| `src/content/posts/` | İçerik | — | Content Collections |
| `src/pages/` | Geliştirici | Astro | HTML çıktısı |
| `public/search-index.json` | — | search-index.js | Build adımı |
| `dist/` | — | astro build | Deploy edilen çıktı |
| `scripts/postbuild-404.mjs` | Geliştirici | — | Build sonrası 404 kopyalama |
