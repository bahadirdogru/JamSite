---
title: "Svelte 5 ile Web Components"
description: "Svelte 5'in Custom Elements modunda kullanımı ve runes API ile reaktif bileşenler oluşturma."
date: 2026-02-20
image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80"
tags: [svelte, javascript, web-components]
categories: [geliştirme]
ref: svelte5-web-components
lang: tr
---

Svelte 5, web geliştirme dünyasında önemli bir dönüm noktası. Yeni runes API ile reaktivite daha açık ve anlaşılır hale gelirken, Custom Elements desteği hibrit mimarilerde kullanımı kolaylaştırıyor.

## Runes API

Svelte 5'in en önemli yeniliği runes (rün) sistemi. `$state`, `$derived` ve `$effect` ile reaktif değerler ve yan etkiler tanımlanır:

```javascript
let count = $state(0);
let doubled = $derived(count * 2);

$effect(() => {
  console.log(`Count değişti: ${count}`);
});
```

Bu syntax, değişkenlerin reaktif olup olmadığını açıkça belirtir ve kodun anlaşılabilirliğini artırır.

## Custom Element Tanımlama

JamSite'da Svelte bileşenleri Web Components olarak derlenir. Her bileşen `<svelte:options>` ile konfigüre edilir:

```svelte
<svelte:options customElement={{ tag: "jam-widget", shadow: "none" }} />

<script>
  let { title = "Varsayılan" } = $props();
  let active = $state(false);
</script>

<button onclick={() => active = !active}>
  {title}: {active ? 'Aktif' : 'Pasif'}
</button>
```

## Shadow DOM Kararı

JamSite'da `shadow: "none"` kullanıyoruz çünkü:

- Tailwind CSS global stylesheet olarak çalışır
- Shadow DOM içindeki elementler global stilleri alamaz
- Trade-off: Slot desteği kaybedilir ama Tailwind tam uyumlu çalışır

## Props ve Attributes

HTML attribute'ları otomatik olarak Svelte props'larına dönüşür:

```html
<jam-slider data-slides='[...]' autoplay="5000"></jam-slider>
```

```svelte
let { dataSlides = "[]", autoplay = "0" } = $props();
```

Kebab-case attribute'lar camelCase props'lara map'lenir.

Bu yaklaşım, Astro sayfalarından Svelte bileşenlerine veri geçişini son derece kolaylaştırır.
