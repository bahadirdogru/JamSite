# Process log

**AI-optimized.** Feature tracking, todo list, completed work, backlog, and process notes. For architecture see ARCHITECTURE.md; for project summary see CLAUDE.md; for styles see DESIGN.md. Humans: use README.md for getting started.

## Status: Astro geçişi tamamlandı

Son güncelleme: 2026-02-28

---

## Tamamlanan

- [x] Statik site mimarisi tasarımı ve dokümantasyonu (başlangıç)
- [x] Astro 5’e geçiş planı (astroplan.md, 8 faz)
- [x] **Faz 1**: Astro 5, Tailwind 4, Svelte 5, BaseLayout, dark mode (inline script + DarkModeToggle), font (@fontsource/inter), i18n (tr root, en /en/)
- [x] **Faz 2**: Content Collections (posts), Shiki, blog listesi ve [slug] sayfaları (/blog/, /en/blog/)
- [x] **Faz 3**: Statik sayfalar (about, features, getting-started, tags, categories — tr ve en)
- [x] **Faz 4**: Ürün verisi (src/content/products + src/data/products.js), /products/[slug], /en/products/[slug], getStaticPaths
- [x] **Faz 5**: Fuse.js arama (search-index.js → public/search-index.json, SearchFuse.svelte, Cmd+K), sitemap, RSS (feed.xml.js), robots.txt, SEO meta (BaseLayout)
- [x] **Faz 6**: OG image (BaseLayout ogImage prop, blog/ürün sayfalarında kullanım, varsayılan görsel)
- [x] **Faz 7**: Slider ve ProductCarousel (slides/products prop), src/data/slides.js, ana sayfa tr/en güncellendi
- [x] **Faz 8**: View Transitions (ClientRouter), 404.astro, vite-plugin-pwa (sw, Workbox), build script (search-index + astro build + postbuild-404)
- [x] TypeScript kaldırıldı — proje tamamen JavaScript (config, data, i18n, lib, content config)
- [x] Eski SSG ve Vite library kaldırıldı — ilgili config, layout, include ve sayfa dizinleri, search.json, generate-products.js, eski vite.config.js, src/main.js, src/app.css, sw.js silindi; _data/i18n, manifest (kök), generate-sprite.js, assets/icons/sprite.svg, start.sh, install.sh kaldırıldı
- [x] Dokümantasyon yeni yapıya göre güncellendi: ARCHITECTURE.md, CLAUDE.md, DESIGN.md, PROCESS.md, README.md

## Şu an

- Proje Astro 5 tabanlı çalışıyor; ek özellik veya iyileştirme yapılabilir.

## Planlanan / Backlog

- [ ] Yorum sistemi (Giscus/Utterances) — harici bağımlılık, isteğe bağlı
- [ ] Newsletter formu — harici servis, isteğe bağlı
- [ ] Performans denetimi (bundle boyutu, Lighthouse)
- [ ] prefers-reduced-motion kontrolü animasyonlarda
- [ ] Favicon seti (favicon.ico, apple-touch-icon)
- [ ] Google Search Console + sitemap gönderimi
- [ ] Blog sayfalarında pagination (gerekirse)
- [ ] Yeni dil ekleme: config + src/pages/{lang}/ + src/i18n/{lang}.js + src/content/slides/{lang}-*.md + ürün frontmatter’da dil bloğu
- [ ] Skeleton / loading state (blog listesi, ürün kartları)
- [ ] Optimistic UI (favoriler, karşılaştırma, okuma listesi)
- [ ] Cross-tab tema senkronu (storage event)
- [ ] Web Share API (blog/ürün paylaşımı)
- [ ] Client-side ürün filtreleme/sıralama
- [ ] Load more / infinite scroll (blog veya ürün)
- [ ] Görsel optimizasyonu (Astro Image / modern format)
- [ ] Preload/prefetch stratejisi
- [ ] PWA: offline fallback sayfası
- [ ] PWA: güncelleme bildirimi
- [ ] Skip link (içeriğe atla)
- [ ] JSON-LD (Article, Product, BreadcrumbList)
- [ ] Breadcrumb UI
- [ ] Error boundary (Svelte)
- [ ] Lighthouse CI (opsiyonel)

## Session notları

### Content yapısı: posts, pages, products, slides (src/content)

- Tüm içerik `src/content/` altında klasör klasör ve .md: **posts**, **pages**, **products**, **slides**.
- **posts**: Mevcut (Content Collection). **pages**: about-tr/en, getting-started-tr/en .md eklendi; about/getting-started sayfaları getEntry("pages", "...") ile içeriği çekiyor.
- **products**: Eski `_data/products/*.yml` → `src/content/products/*.md` taşındı; frontmatter aynı yapı (sku, price, tr/en). `src/data/products.js` artık content/products/*.md dosyalarını fs + YAML frontmatter ile okuyor.
- **slides**: Eski `_data/slides/tr.yml`, `en.yml` → `src/content/slides/tr-01.md` … `en-04.md` (slide başına bir .md, lang + order). `src/data/slides.js` content/slides/*.md okuyor.
- `_data` klasörü kaldırıldı. ARCHITECTURE.md, CLAUDE.md, README.md, PROCESS.md güncellendi.

### Jamstack dinamik özellikler (plan uygulaması)

- Skeleton/loading: SkeletonCard, SkeletonListItem, BlogListWithSkeleton, ProductGridWithSkeleton (blog/ürün listelerinde kısa süreli iskelet).
- Optimistic UI: FavoriteButton, CompareButton, ReadingListButton — tıklamada önce state güncelleniyor, sonra localStorage.
- Cross-tab tema: DarkModeToggle içinde storage event ile diğer sekmeler senkron.
- Web Share API: ShareButton.svelte (blog ve ürün slug sayfalarında); navigator.share veya copy link fallback.
- Client-side filtre/sıralama: ProductsFilterSort.svelte — ürün listesi JSON ile client’ta; kategori/etiket/sıralama ve “Daha fazla”.
- Load more: BlogListLoadMore.svelte (blog), ProductsFilterSort içinde “Daha fazla” (ürün).
- Görsel: img’lere width/height, loading="lazy", decoding="async"; astro.config’ta image.remotePatterns.
- Preload/prefetch: BaseLayout’ta blog/, products/, about/ için prefetch.
- PWA: /offline sayfası, navigateFallback, registerType: "prompt", PwaUpdateBanner.svelte.
- Skip link: Body başında “İçeriğe atla”, main id="main-content".
- JSON-LD + Breadcrumb: Blog ve ürün slug’larda Article/Product + BreadcrumbList; breadcrumb UI (nav).
- Error boundary: ErrorBoundary.svelte (svelte:boundary), BlogListLoadMore ve ProductsFilterSort’ta kullanıldı.

### 2026-02-28 — Dokümantasyon güncellemesi

- ARCHITECTURE.md, CLAUDE.md, DESIGN.md, PROCESS.md, README.md Astro 5 + Svelte 5 + Tailwind 4 yapısına göre yeniden yazıldı.
- Eski SSG, Vite library mode, custom elements, Lunr ve ilgili dosya referansları kaldırıldı.
- Yeni referanslar: Astro i18n, Content Collections, src/data/*.js, src/i18n/*.js, BaseLayout.astro, SearchFuse, Fuse.js, getProductPaths, getSlides, postbuild-404, vite-plugin-pwa.
