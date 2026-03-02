---
title: "Başlangıç Rehberi"
description: "JamSite'ı kurun ve dakikalar içinde çalışır hale getirin"
lang: tr
pageId: getting-started
---

JamSite'ı birkaç dakika içinde kurun ve kişiselleştirmeye başlayın.

## Gereksinimler

- **Node.js** (v18+) — [İndir](https://nodejs.org/)
- **Git** — [İndir](https://git-scm.com/)

## Kurulum

```bash
# Projeyi klonla
git clone https://github.com/bahadirdogru/JamSite.git

# Bağımlılıkları yükle
cd JamSite && npm install
```

## Geliştirme

Astro dev server ile çalıştırın:

```bash
npm run dev
```

Üretim build:

```bash
npm run build
```

## Yayınlama

Build alıp `dist/` çıktısını GitHub Pages veya başka bir statik hosta yükleyin. GitHub Actions kullanmıyorsanız yerelde `npm run build` çalıştırıp `dist/` içeriğini gh-pages branch'e push edebilirsiniz.

[Özellikler](/features/) · [Hakkında](/about/)
