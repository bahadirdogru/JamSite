---
title: "Svelte 5 ile Web Components"
description: "Svelte 5'in Custom Elements modunda kullanımı ve runes API ile reaktif bileşenler oluşturma."
date: 2026-02-20
tags: [svelte, javascript, web-components]
categories: [geliştirme]
ref: svelte5-web-components
lang: tr
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum semper porta. Nunc diam velit, adipiscing et, hendrerit at, vulputate vitae, nisl.

## Runes API

Aenean dignissim pellentesque felis. Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam.

```javascript
let count = $state(0);
let doubled = $derived(count * 2);
```

Sed arcu. Cras consequat. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.

## Custom Element Tanımlama

Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.

```svelte
<svelte:options customElement={{ tag: "jam-widget", shadow: "none" }} />
```

Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
