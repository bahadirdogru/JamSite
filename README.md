# JamSite

Astro 5, Svelte 5 ve Tailwind CSS 4 ile kurulmuş çok dilli statik site şablonu. Blog (etiket/kategori), ürün kataloğu, site içi arama (Cmd+K), karanlık/aydınlık tema, dinamik slider ve PWA desteği içerir.

Oluşturan: [Bahadır Doğru](https://bahadirdogru.com)

İçerik ve SEO Astro ile üretilir; etkileşimli bileşenler Svelte ile yazılır ve gerekli sayfalarda hydrate edilir. Build çıktısı (`dist/`) herhangi bir statik hostinge (GitHub Pages dahil) deploy edilebilir.

## Özellikler

- **Blog** — Content Collections ile yazılar, etiket/kategori, dil bazlı listeler, okuma süresi, sosyal paylaşım
- **Ürün kataloğu** — SKU bazlı YAML veri, çok dilli destek, favoriler, karşılaştırma
- **Site araması** — Cmd+K / Ctrl+K ile Fuse.js tabanlı, build-time index
- **Karanlık / aydınlık mod** — FOUC önlemli tema, OS tercihi ve localStorage
- **Dinamik slider** — Dil bazlı veri, hero/image slide tipleri, autoplay
- **Çok dilli (i18n)** — TR root, EN /en/ prefix; hreflang ve dil değiştirici
- **SEO** — Meta, Open Graph, Twitter Card, sitemap, RSS
- **Etkileşimli bileşenler** — Favoriler, okuma listesi, hızlı önizleme, karşılaştırma, klavye kısayolları
- **Animasyon** — Motion + Astro View Transitions
- **PWA** — Service Worker (vite-plugin-pwa), manifest
- **Progressive enhancement** — İçerik JS olmadan okunabilir

## Gereksinimler

- [Node.js](https://nodejs.org/) (v18+)
- Git

## Kurulum

```bash
git clone https://github.com/<kullanici>/JamSite.git
cd JamSite
npm install
```

## Geliştirme

```bash
npm run dev
```

Astro dev server başlar (varsayılan http://localhost:4321). Hot reload açıktır.

## Build

```bash
npm run build
```

Sırasıyla:

1. `src/lib/search-index.js` — arama indeksini `public/search-index.json` olarak üretir  
2. `astro build` — siteyi `dist/` altına derler  
3. `scripts/postbuild-404.mjs` — 404 sayfasını uygun yere kopyalar  

## Önizleme

```bash
npm run preview
```

`dist/` çıktısını yerel sunucuda dener.

## Deploy

```bash
npm run build
```

Ardından `dist/` klasörünü hostinge yükleyin (GitHub Pages için `dist` içeriğini repo’ya veya gh-pages branch’ine push edebilirsiniz; Actions ile otomatik build de kullanılabilir).

## Proje yapısı

```
_data/               Ürün ve slider verisi (YAML)
  products/          sku001.yml, sku002.yml ...
  slides/            tr.yml, en.yml
public/              Statik dosyalar (manifest, robots, build’te search-index.json)
src/
  components/        Svelte bileşenleri
  content/posts/     Blog yazıları (.md)
  data/              products.js, slides.js (_data’yı okur)
  i18n/              tr.js, en.js, index.js (UI çevirileri)
  layouts/           BaseLayout.astro
  lib/               search-index.js (build-time arama indeksi)
  pages/             Astro sayfaları (tr root, en/ prefix)
  config/            site.js
  styles/            global.css (Tailwind, @theme)
scripts/             postbuild-404.mjs
```

## Teknoloji

- **SSG**: Astro 5  
- **UI**: Svelte 5 (client:visible / client:load)  
- **Stil**: Tailwind CSS 4 (CSS-first)  
- **İkonlar**: Phosphor Icons (Svelte)  
- **Animasyon**: Motion + Astro View Transitions  
- **Arama**: Fuse.js + build-time JSON index  
- **SEO**: Astro meta + @astrojs/sitemap  
- **RSS**: @astrojs/rss (feed.xml.js)  
- **PWA**: vite-plugin-pwa  

## Yeni dil ekleme

1. `astro.config.mjs` içinde `i18n.locales` dizisine yeni dili ekleyin.  
2. `src/pages/{dil}/` altında gerekli sayfaları oluşturun.  
3. `src/i18n/{dil}.js` ekleyip `src/i18n/index.js` içinde kullanın.  
4. `_data/slides/{dil}.yml` ekleyin.  
5. Ürün YAML’larında ilgili dil bloğunu (örn. `de: title, description, slug`) ekleyin.  

## Yeni ürün ekleme

1. `_data/products/{sku}.yml` oluşturun (ortak alanlar + tr/en blokları).  
2. `npm run build` — ürün sayfaları getStaticPaths ile otomatik üretilir.  
3. Arama indeksi ve etiket/kategori listeleri build sırasında güncellenir.  

## Arama

Sayfadayken **Cmd+K** (macOS) veya **Ctrl+K** (Windows/Linux) ile arama modalı açılır. Sonuçlar mevcut sayfa diline göre filtrelenir; tip etiketleri (post, product, page) gösterilir.

## Lisans

MIT
