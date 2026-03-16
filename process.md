# Process log

**AI-optimized.** Feature tracking, todo list, completed work, backlog, and process notes. For architecture see ARCHITECTURE.md; for project summary see CLAUDE.md; for styles see DESIGN.md. Humans: use README.md for getting started.

## Status: Tam temizlik ve doküman-kod uyumu tamamlandı

Son güncelleme: 2026-03-16

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
- [x] **Tek config’ten dil**: Dil listesi tek kaynak `src/config/site.js` → `languages`; astro.config.mjs (i18n) ve src/content/config.js (posts/pages lang şeması) buradan türetiliyor. Yeni dil eklemek için sadece site.js güncellenir; BaseLayout dil değiştirici ve og:locale da site.js'den besleniyor.
- [x] **Tekil config (Jekyll _config benzeri)**: `src/config/site.js` tek kaynak — `site` (title, description, url, baseUrl), `features` (blog, products, search, pwa, rss, darkMode, sitemap, tags, categories, features, gettingStarted). Astro config (site URL, sitemap/PWA koşullu), BaseLayout (nav linkleri ve bileşenler features’a göre), feed.xml.js (rss kapalıysa 404), search-index.js (search kapalıysa boş index; index içeriği features’a göre). Özellik kapalıyken ilgili sayfalar 404’e yönlendirilir veya getStaticPaths boş döner.
- [x] TypeScript kaldırıldı — proje tamamen JavaScript (config, data, i18n, lib, content config)
- [x] Eski SSG ve Vite library kaldırıldı — ilgili config, layout, include ve sayfa dizinleri, search.json, generate-products.js, eski vite.config.js, src/main.js, src/app.css, sw.js silindi; _data/i18n, manifest (kök), generate-sprite.js, assets/icons/sprite.svg, start.sh, install.sh kaldırıldı
- [x] Dokümantasyon yeni yapıya göre güncellendi: ARCHITECTURE.md, CLAUDE.md, DESIGN.md, PROCESS.md, README.md
- [x] **Tam temizlik**: Doküman-kod uyumu, gereksiz bağımlılık/dosya temizliği (2026-03-16)
  - global.css: primary renk blue-600, font Inter olarak DESIGN.md'ye uyumlu hale getirildi (Lexend -> Inter)
  - astro.config.mjs: @astrojs/static adapter kaldırıldı, outDir: "docs" eklendi
  - package.json: lunr, lunr-languages, tsx, @fontsource/lexend kaldırıldı; postbuild-404 ve generate script referansları silindi
  - Eski dizinler silindi: _data/ (boş), assets/dist/ (eski build), scripts/ (boş)
  - Tüm dokümanlar (ARCHITECTURE, CLAUDE, DESIGN, README, README_TR) dist/ -> docs/ güncellendi
  - CLAUDE.md: _data/ referansları kaldırıldı, svelte.config.js eklendi
  - ARCHITECTURE.md: Bileşen listesi tamamlandı, tekrarlanan satır düzeltildi
  - DESIGN.md: Var olmayan dark mode sınıfları (slate-50-dark vb.) doğru Tailwind 4 sınıflarına düzeltildi

- [x] **Astro 6 yükseltmesi** (2026-03-16)
  - Astro 5.18 -> 6.0.5, @astrojs/svelte 7 -> 8, Vite 7, Zod 4
  - Content Layer API geçişi: src/content/config.js -> src/content.config.js, glob loader, type:"content" kaldırıldı
  - entry.render() -> render(entry) (astro:content'ten import)
  - z import: astro:content -> astro/zod
  - post.id artık slug (md uzantısız); .replace(/\.md$/, "") ifadeleri kaldırıldı
  - Gereksiz devDependencies kaldırıldı: vite, @sveltejs/vite-plugin-svelte (Astro yönetiyor)
  - Dokümanlar güncellendi: Astro 5 -> 6, Node 18+ -> 22+, Content Layer API

## Şu an

- Proje Astro 6 tabanlı çalışıyor; doküman-kod uyumu sağlandı; ek özellik veya iyileştirme yapılabilir.

## Planlanan / Backlog

- [ ] Yorum sistemi (Giscus/Utterances) — harici bağımlılık, isteğe bağlı
- [ ] Newsletter formu — harici servis, isteğe bağlı
- [ ] Performans denetimi (bundle boyutu, Lighthouse)
- [ ] prefers-reduced-motion kontrolü animasyonlarda
- [ ] Favicon seti (favicon.ico, apple-touch-icon)
- [ ] Google Search Console + sitemap gönderimi
- [ ] Blog sayfalarında pagination (gerekirse)
- [ ] Yeni dil ekleme: **1)** `src/config/site.js` → `languages` dizisine dil kodu ekle. **2)** `src/pages/{lang}/` + `src/i18n/{lang}.js` + isteğe bağlı `src/content/slides/{lang}-*.md` + ürün frontmatter'da dil bloğu.
- [ ] Görsel optimizasyonu (Astro Image / modern format)
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

### 2026-03-04 — Tekil config (Jekyll _config benzeri)

- `src/config/site.js` genişletildi: `site` (url, baseUrl dahil), `features` (blog, products, search, pwa, rss, darkMode, sitemap, tags, categories, features, gettingStarted). Astro config, BaseLayout, feed, search-index ve sayfa üretimi bu config’ten okuyor; özellik kapalıyken ilgili sayfalar 404 veya boş path. CLAUDE.md, ARCHITECTURE.md, PROCESS.md, README.md buna göre güncellendi.

### 2026-02-28 — Dokümantasyon güncellemesi

- ARCHITECTURE.md, CLAUDE.md, DESIGN.md, PROCESS.md, README.md Astro 5 + Svelte 5 + Tailwind 4 yapısına göre yeniden yazıldı.
- Eski SSG, Vite library mode, custom elements, Lunr ve ilgili dosya referansları kaldırıldı.
- Yeni referanslar: Astro i18n, Content Collections, src/data/*.js, src/i18n/*.js, BaseLayout.astro, SearchFuse, Fuse.js, getProductPaths, getSlides, postbuild-404, vite-plugin-pwa.
### 2026-03-11 — Modüler UI Blokları ve Görsel Şölen
- **Modüler UI Blokları**: Tailwind Plus ilhamlı Hero (split), Feature (screenshot), CTA (panel) ve FAQ (accordion) eklendi. `src/content/config.js` şemaları güncellendi.
- **Showcase Sayfası**: `showcase-tr.md` ve `showcase-en.md` yeni bloklarla zenginleştirildi.
- **README Görsel Şölen**: `README.md` dosyasına karanlık/aydınlık mod, modüler bloklar ve arama özelliklerini gösteren yüksek kaliteli resimler ve interaktif carouseller eklendi.
- **Asset Yönetimi**: Önemli görseller `src/assets/img` altında toplandı.

### 2026-03-16 — Astro 6 yükseltmesi

- Astro 5.18 -> 6.0.5, @astrojs/svelte 7 -> 8.0.1, @astrojs/rss 4.0.17, @astrojs/sitemap 3.7.1.
- Content Layer API: `src/content/config.js` -> `src/content.config.js` taşındı; `type: "content"` kaldırıldı, `loader: glob(...)` eklendi; `z` import kaynağı `astro:content` -> `astro/zod`.
- `entry.render()` -> `render(entry)` (3 dosya: blog/[slug], about, getting-started).
- `post.id` artık slug olduğu için `.replace(/\.md$/, "")` ifadeleri kaldırıldı (5 dosya).
- Gereksiz devDependencies kaldırıldı: `vite` ve `@sveltejs/vite-plugin-svelte` (Astro kendi Vite'ını yönetiyor).
- README/README_TR: Astro badge 5.0 -> 6.0, Node gereksinimi v18+ -> v22+, SSG referansı Astro 6.
- CLAUDE.md, ARCHITECTURE.md: Astro 6 ve Content Layer API yansıtıldı.

### 2026-03-16 — Tam temizlik ve doküman-kod uyumu

- **Renk/font düzeltmesi**: global.css'teki primary renk (#ff6000) ve font (Lexend) DESIGN.md'ye uygun olarak blue-600 ve Inter'e geri döndürüldü.
- **astro.config.mjs**: Gereksiz `@astrojs/static` adapter kaldırıldı; `outDir: "docs"` ile build çıktısı doğru yansıtıldı.
- **package.json temizliği**: Kullanılmayan bağımlılıklar (lunr, lunr-languages, tsx, @fontsource/lexend) kaldırıldı; build script'ten postbuild-404 referansı silindi; generate script kaldırıldı.
- **Dosya temizliği**: Boş `_data/`, `scripts/` dizinleri ve eski `assets/dist/` build artıkları silindi.
- **Doküman güncellemeleri**: Tüm MD dosyalarında dist/ -> docs/ güncellendi; CLAUDE.md'den _data/ referansları kaldırıldı; ARCHITECTURE.md'de bileşen listesi tamamlandı ve tekrarlanan satır düzeltildi; DESIGN.md'de var olmayan dark mode sınıfları (slate-50-dark, slate-900-dark, slate-200-dark) doğru Tailwind 4 karşılıklarına (slate-900, slate-100, slate-700) düzeltildi.
- **PROCESS.md backlog**: Session notlarında tamamlanmış olarak belgelenen backlog maddeleri (skeleton, optimistic UI, cross-tab tema, Web Share, filtre/sıralama, load more, preload/prefetch, PWA offline/güncelleme, skip link, JSON-LD, breadcrumb, error boundary) listeden çıkarıldı.

### 2026-03-11 — [lang] Dizin Yapısı ve i18n Fix
- **Yönlendirme**: [[lang]] yapısı kaldırıldı, tüm diller [lang] altında toplandı.
- **Astro Config**: prefixDefaultLocale: true yapıldı.
- **Svelte 5**: SearchFuse.svelte inputEl fixlendi.
