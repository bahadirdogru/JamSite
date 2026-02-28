# Process Log

## Status: Astro geçişi tamamlandı

Son güncelleme: 2026-02-28

---

## Tamamlanan

- [x] Jekyll + Svelte hibrit mimarisi tasarımı ve dokümantasyonu (başlangıç)
- [x] Astro 5’e geçiş planı (astroplan.md, 8 faz)
- [x] **Faz 1**: Astro 5, Tailwind 4, Svelte 5, BaseLayout, dark mode (inline script + DarkModeToggle), font (@fontsource/inter), i18n (tr root, en /en/)
- [x] **Faz 2**: Content Collections (posts), Shiki, blog listesi ve [slug] sayfaları (/blog/, /en/blog/)
- [x] **Faz 3**: Statik sayfalar (about, features, getting-started, tags, categories — tr ve en)
- [x] **Faz 4**: Ürün verisi (_data/products + src/data/products.js), /products/[slug], /en/products/[slug], getStaticPaths
- [x] **Faz 5**: Fuse.js arama (search-index.js → public/search-index.json, SearchFuse.svelte, Cmd+K), sitemap, RSS (feed.xml.js), robots.txt, SEO meta (BaseLayout)
- [x] **Faz 6**: OG image (BaseLayout ogImage prop, blog/ürün sayfalarında kullanım, varsayılan görsel)
- [x] **Faz 7**: Slider ve ProductCarousel (slides/products prop), src/data/slides.js, ana sayfa tr/en güncellendi
- [x] **Faz 8**: View Transitions (ClientRouter), 404.astro, vite-plugin-pwa (sw, Workbox), build script (search-index + astro build + postbuild-404)
- [x] TypeScript kaldırıldı — proje tamamen JavaScript (config, data, i18n, lib, content config)
- [x] Jekyll kaldırıldı — Gemfile, _config.yml, _layouts, _includes, _pages, _posts, search.json, generate-products.js, eski vite.config.js, src/main.js, src/app.css, sw.js silindi; _data/i18n, manifest (kök), generate-sprite.js, assets/icons/sprite.svg, start.sh, install.sh kaldırıldı
- [x] Dokümantasyon yeni yapıya göre güncellendi: Architecture.md, claude.md, process.md, README.md, Styles.md

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
- [ ] Yeni dil ekleme: config + src/pages/{lang}/ + src/i18n/{lang}.js + _data/slides/{lang}.yml

## Session notları

### 2026-02-28 — Dokümantasyon güncellemesi

- Architecture.md, claude.md, process.md, README.md, Styles.md Astro 5 + Svelte 5 + Tailwind 4 yapısına göre yeniden yazıldı.
- Jekyll, Vite library mode, custom elements, Lunr, _config.yml, _layouts, _includes, _pages, _posts referansları kaldırıldı.
- Yeni referanslar: Astro i18n, Content Collections, src/data/*.js, src/i18n/*.js, BaseLayout.astro, SearchFuse, Fuse.js, getProductPaths, getSlides, postbuild-404, vite-plugin-pwa.
