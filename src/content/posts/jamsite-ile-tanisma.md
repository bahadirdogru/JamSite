---
title: "JamSite ile Tanışma"
description: "Modern statik site geliştirme yolculuğumuzun başlangıcı. Astro 5, Svelte 5 ve Tailwind CSS 4 ile neler yapabilirsiniz?"
date: 2026-02-15
image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80"
tags: [astro, svelte, tailwind]
categories: [geliştirme]
ref: intro-jamsite
lang: tr
---

Modern web geliştirme dünyasında statik siteler yeniden popülerleşiyor. Peki neden? Hız, güvenlik ve maliyet avantajları en önemli nedenler arasında. JamSite, bu avantajları modern frontend teknolojileriyle birleştiren hibrit bir yaklaşım sunuyor.

## Neden Hibrit Yaklaşım?

Geleneksel statik site üreteçleri (SSG) genellikle sınırlı interaktivite sunar. Ancak modern kullanıcı deneyimi beklentileri, dinamik ve reaktif arayüzler gerektiriyor. JamSite bu iki dünyayı bir araya getiriyor:

- **Astro 5**: İçerik yönetimi, SEO ve statik HTML üretimi
- **Svelte 5**: Reaktif ve performanslı UI bileşenleri (islands)
- **Tailwind CSS 4**: Modern ve tutarlı tasarım sistemi

## Astro ve Svelte Birlikte

Bu mimaride her teknoloji kendi güçlü yanlarında kullanılıyor:

- Statik içerik Astro ile Markdown'dan HTML'e dönüştürülür (Content Collections)
- İnteraktif bileşenler Svelte 5 ile islands olarak gerekli sayfalarda hydrate edilir
- Stiller Tailwind CSS 4 ile utility-first yaklaşımıyla yönetilir
- Build Astro (Vite) ile optimize edilir

Bu yaklaşım, SEO dostu statik sayfalar ile zengin kullanıcı deneyimini aynı anda sunmanızı sağlar. Arama motorları tam içeriği görürken, kullanıcılar modern ve akıcı bir arayüzle etkileşime geçer.

## Başlamak İçin

JamSite'ı kullanmaya başlamak için sadece Node.js ve Git yeterli. Detaylı kurulum rehberi için [Başlangıç Rehberi](/getting-started/) sayfasını ziyaret edin.
