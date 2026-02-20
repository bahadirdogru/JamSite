---
title: "Hakkında"
description: "JamSite hakkında bilgi"
ref: about
lang: tr
permalink: /about/
---

<section class="max-w-3xl mx-auto px-4 py-12">

## JamSite Nedir?

JamSite, statik site üretimi ile modern frontend teknolojilerini birleştiren hibrit bir boilerplate projesidir. Jekyll'in içerik yönetimi gücünü, Svelte 5'in reaktif bileşen mimarisini ve Tailwind CSS 4'ün tasarım sistemini tek bir çatı altında toplar.

## Tasarım Felsefesi

JamSite şu temel anlayışlar üzerine inşa edilmiştir:

- **Progressive Enhancement** — İçerik JavaScript olmadan da okunabilir kalır. Etkileşimli özellikler deneyimi zenginleştirir, bağımlılık yaratmaz.
- **JAMstack Yaklaşımı** — Sunucu tarafı işlem yok. Tüm içerik build aşamasında statik HTML'e dönüşür; CDN üzerinden hızlıca sunulur.
- **Zero-Config Deployment** — GitHub Pages'in standart Jekyll pipeline'ı yeterlidir. GitHub Actions, özel CI/CD veya ek sunucu gerekmez.
- **Convention over Configuration** — Dosya ve dizin yapısı kendi kendini açıklar. Yeni bir dil, ürün veya yazı eklemek için kod değişikliği gerekmez; sadece dosya eklenir.
- **Separation of Concerns** — Jekyll içerik ve SEO'dan, Svelte etkileşimden, Tailwind görünümden sorumludur. Her katman bağımsız çalışır ve geliştirilebilir.
- **Content-First** — Önce içerik, sonra sunum. Markdown ve YAML ile veri girişi yapılır; şablonlar bunu otomatik olarak sayfaya dönüştürür.
- **Web Standards** — Svelte bileşenleri Web Components (Custom Elements) olarak derlenir. Herhangi bir framework'e bağımlılık yoktur; tarayıcının native API'leri kullanılır.
- **Performance by Default** — Tek bir JS bundle, tek bir CSS bundle. Gereksiz bağımlılık yok. Lighthouse puanları varsayılan olarak yüksek tutulur.
- **i18n as a First-Class Citizen** — Çok dilli yapı sonradan eklenen bir eklenti değil, mimarinin temel taşıdır. Her içerik parçası `ref` ile eşlenir, SEO hreflang'ları otomatik üretilir.

## Teknoloji Yığını

- **Jekyll 3.9** — GitHub Pages standart yapı aracı
- **Svelte 5** — Web Components olarak derlenen modern UI framework
- **Tailwind CSS 4** — CSS-first yapılandırma ile utility-first stiller
- **Vite** — Hızlı geliştirme ve üretim derlemesi

## Taslağı Kim Yaptı?

Bu proje [Bahadır Doğru](https://bahadirdogru.com) tarafından tasarlanmış ve geliştirilmiştir.

## İletişim

Daha fazla bilgi ve iletişim için [bahadirdogru.com](https://bahadirdogru.com) adresini ziyaret edebilirsiniz.

<jam-counter></jam-counter>

</section>
