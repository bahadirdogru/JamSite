---
title: "Statik Sitelerde SEO Optimizasyonu"
description: "Astro ve JamSite ile SEO dostu web siteleri oluşturmanın püf noktaları."
date: 2026-02-19
image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&q=80"
tags: [seo, astro, web]
categories: [geliştirme]
ref: seo-optimization
lang: tr
---

Statik siteler, doğru yapılandırıldığında SEO açısından büyük avantajlar sunar. Hızlı yüklenme süreleri, temiz HTML çıktısı ve sunucu tarafı render — tüm bunlar arama motorlarının sevdiği özellikler.

## JamSite'ın SEO Araçları

JamSite, Astro ile kapsamlı SEO desteği sağlar:

### BaseLayout ve meta etiketleri

BaseLayout.astro otomatik olarak şunları üretir:
- `<title>` ve `<meta description>` etiketleri
- Open Graph meta etiketleri (Facebook, LinkedIn)
- Twitter Card etiketleri
- Canonical URL ve hreflang (çok dilli)

### @astrojs/sitemap

Tüm sayfalarınız için otomatik sitemap üretir. Google Search Console'a eklemeniz yeterli.

### RSS (feed.xml.js)

Blog yazılarınız için RSS feed oluşturur. Bu sayede okuyucular sitenizi takip edebilir.

## Çok Dilli SEO

JamSite'ın `hreflang` desteği, arama motorlarına sayfalarınızın farklı dil versiyonlarını bildirir:

```html
<link rel="alternate" hreflang="tr" href="https://site.com/hakkinda/">
<link rel="alternate" hreflang="en" href="https://site.com/en/about/">
```

Bu sayede her kullanıcı kendi dilindeki içeriği görür.

## Performans = SEO

Google, sayfa hızını önemli bir sıralama faktörü olarak değerlendirir. JamSite'ın statik yapısı ve optimize edilmiş bundle'ı, Lighthouse testlerinde 95+ puan almanızı sağlar.
