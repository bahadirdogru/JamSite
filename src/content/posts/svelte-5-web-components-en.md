---
title: "Web Components with Svelte 5"
description: "Using Svelte 5 in Custom Elements mode and creating reactive components with runes API."
date: 2026-02-20
image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80"
tags: [svelte, javascript, web-components]
categories: [development]
ref: svelte5-web-components
lang: en
---

Svelte 5 marks an important milestone in web development. With the new runes API, reactivity becomes more explicit and understandable, while Custom Elements support makes it easier to use in hybrid architectures.

## Runes API

The most important innovation in Svelte 5 is the runes system. Reactive values and side effects are defined with `$state`, `$derived` and `$effect`:

```javascript
let count = $state(0);
let doubled = $derived(count * 2);

$effect(() => {
  console.log(`Count changed: ${count}`);
});
```

This syntax explicitly indicates whether variables are reactive, improving code readability.

## Custom Element Definition

In JamSite, Svelte components are compiled as Web Components. Each component is configured with `<svelte:options>`:

```svelte
<svelte:options customElement={{ tag: "jam-widget", shadow: "none" }} />

<script>
  let { title = "Default" } = $props();
  let active = $state(false);
</script>

<button onclick={() => active = !active}>
  {title}: {active ? 'Active' : 'Inactive'}
</button>
```

## Shadow DOM Decision

We use `shadow: "none"` in JamSite because:

- Tailwind CSS works as a global stylesheet
- Elements inside Shadow DOM cannot receive global styles
- Trade-off: Slot support is lost but Tailwind works fully compatible

## Props and Attributes

HTML attributes automatically convert to Svelte props:

```html
<jam-slider data-slides='[...]' autoplay="5000"></jam-slider>
```

```svelte
let { dataSlides = "[]", autoplay = "0" } = $props();
```

Kebab-case attributes map to camelCase props.

This approach makes it extremely easy to pass data from Jekyll's Liquid templates to Svelte components.
