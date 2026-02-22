---
title: "About"
description: "Learn about JamSite - a modern, fast, and multilingual static site generation platform"
ref: about
lang: en
permalink: /en/about/
---

<div class="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert prose-headings:font-heading">

<h1 class="text-4xl font-bold mb-6">What is JamSite?</h1>

<p class="lead text-lg text-slate-600 dark:text-slate-400 mb-8">
JamSite is a hybrid boilerplate that bridges static site generation with modern frontend technologies. It unites Jekyll's content management power, Svelte 5's reactive component architecture, and Tailwind CSS 4's design system under a single roof.
</p>

<div class="grid gap-6 md:grid-cols-2 my-10">
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-jam-primary to-jam-secondary flex items-center justify-center text-white text-2xl mb-4">⚡</div>
    <h3 class="font-bold text-lg mb-2">Fast</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Static HTML + single bundle JS/CSS. Lighthouse 95+ score guaranteed.</p>
  </div>
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl mb-4">🌍</div>
    <h3 class="font-bold text-lg mb-2">Multilingual</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">i18n is baked in from the start. Adding a new language is just adding files.</p>
  </div>
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-4">🔧</div>
    <h3 class="font-bold text-lg mb-2">Zero Config</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Push to GitHub Pages and it deploys automatically. No CI/CD needed.</p>
  </div>
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white text-2xl mb-4">🎨</div>
    <h3 class="font-bold text-lg mb-2">Modern UI</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Reactive and beautiful components with Svelte 5 + Tailwind 4.</p>
  </div>
</div>

<h2 class="text-2xl font-bold mt-12 mb-6">Design Philosophy</h2>

<div class="space-y-4">
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">🚀</span>
    <div>
      <h4 class="font-semibold">Progressive Enhancement</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Content remains readable without JavaScript. Interactive features enrich the experience but never create a dependency.</p>
    </div>
  </div>
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">📦</span>
    <div>
      <h4 class="font-semibold">JAMstack Approach</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">No server-side processing. All content compiles to static HTML at build time and is served instantly via CDN.</p>
    </div>
  </div>
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">🔗</span>
    <div>
      <h4 class="font-semibold">Separation of Concerns</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Jekyll handles content and SEO, Svelte handles interactivity, Tailwind handles presentation. Each layer operates independently.</p>
    </div>
  </div>
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">📝</span>
    <div>
      <h4 class="font-semibold">Content-First</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Content before presentation. Data is entered via Markdown and YAML; templates automatically transform it into pages.</p>
    </div>
  </div>
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">🌐</span>
    <div>
      <h4 class="font-semibold">Web Standards</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Svelte components compile to Web Components. No framework lock-in; the browser's native APIs are used.</p>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mt-12 mb-6">Technology Stack</h2>

<div class="flex flex-wrap gap-3 mb-8">
  <span class="px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium text-sm">Jekyll 3.9</span>
  <span class="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium text-sm">Svelte 5</span>
  <span class="px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-medium text-sm">Tailwind CSS 4</span>
  <span class="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium text-sm">Vite</span>
  <span class="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium text-sm">Lunr.js</span>
  <span class="px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 font-medium text-sm">Motion</span>
</div>

<h2 class="text-2xl font-bold mt-12 mb-6">Who Made This?</h2>

<div class="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-jam-primary/10 to-jam-secondary/10 dark:from-jam-primary/20 dark:to-jam-secondary/20">
  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-jam-primary to-jam-secondary flex items-center justify-center text-white text-3xl font-bold shrink-0">BD</div>
  <div>
    <h3 class="font-bold text-xl">Bahadır Doğru</h3>
    <p class="text-slate-600 dark:text-slate-400 mb-2">Full-stack developer and designer</p>
    <a href="https://bahadirdogru.com" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-jam-primary hover:underline font-medium">
      bahadirdogru.com
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
    </a>
  </div>
</div>

<div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
  <p class="text-slate-500 dark:text-slate-400 text-sm">Have questions?</p>
  <a href="https://bahadirdogru.com" target="_blank" rel="noopener" class="inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-full bg-jam-primary text-white font-medium hover:bg-jam-primary/90 transition-colors">
    Get in Touch
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
  </a>
</div>

</div>
