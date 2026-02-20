---
title: "About"
description: "About JamSite"
ref: about
lang: en
permalink: /en/about/
---

<section class="max-w-3xl mx-auto px-4 py-12">

## What is JamSite?

JamSite is a hybrid boilerplate that bridges static site generation with modern frontend technologies. It unites Jekyll's content management power, Svelte 5's reactive component architecture, and Tailwind CSS 4's design system under a single roof.

## Design Philosophy

JamSite is built upon these core principles:

- **Progressive Enhancement** — Content remains readable without JavaScript. Interactive features enrich the experience but never create a dependency.
- **JAMstack Approach** — No server-side processing. All content compiles to static HTML at build time and is served instantly via CDN.
- **Zero-Config Deployment** — GitHub Pages' standard Jekyll pipeline is all you need. No GitHub Actions, custom CI/CD, or extra servers required.
- **Convention over Configuration** — The file and directory structure is self-documenting. Adding a new language, product, or post requires no code changes; just add a file.
- **Separation of Concerns** — Jekyll handles content and SEO, Svelte handles interactivity, Tailwind handles presentation. Each layer operates and evolves independently.
- **Content-First** — Content before presentation. Data is entered via Markdown and YAML; templates automatically transform it into pages.
- **Web Standards** — Svelte components compile to Web Components (Custom Elements). There is no framework lock-in; the browser's native APIs are used.
- **Performance by Default** — A single JS bundle, a single CSS bundle. No unnecessary dependencies. Lighthouse scores stay high out of the box.
- **i18n as a First-Class Citizen** — Multilanguage support is not a bolt-on plugin but a foundational pillar of the architecture. Every content piece is linked via `ref`, and SEO hreflang tags are generated automatically.

## Technology Stack

- **Jekyll 3.9** — GitHub Pages default static site generator
- **Svelte 5** — Modern UI framework compiled as Web Components
- **Tailwind CSS 4** — Utility-first styles with CSS-first configuration
- **Vite** — Fast development and production builds

## Who Made This?

This project was designed and developed by [Bahadır Doğru](https://bahadirdogru.com).

## Contact

For more information and inquiries, visit [bahadirdogru.com](https://bahadirdogru.com).

<jam-counter></jam-counter>

</section>
