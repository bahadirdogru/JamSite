---
title: "Features"
description: "All features of JamSite - blog, product catalog, search, multilanguage support and more"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
ref: features
lang: en
permalink: /en/features/
---

<div class="max-w-4xl mx-auto px-4 py-12">

<header class="text-center mb-16">
  <h1 class="text-4xl md:text-5xl font-bold font-heading mb-4">Features</h1>
  <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
    JamSite provides everything you need for a modern website in one package.
  </p>
</header>

<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
      {% include icon.html name="newspaper" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Blog System</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Blog posts organized with tags and categories. Easy content creation with Markdown.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
      {% include icon.html name="cube" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Product Catalog</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">SKU-based product management. All languages in one YAML file. E-commerce ready structure.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
      {% include icon.html name="magnifying-glass" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Site Search</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Spotlight-style search modal. Instant access with Cmd+K. Turkish stemmer support.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
      {% include icon.html name="sun" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Dark/Light Mode</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">FOUC-free theme switching. Auto-detects OS preference, remembers with localStorage.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mb-4">
      {% include icon.html name="image" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Dynamic Slider</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Data-driven slider. Hero and image types. Autoplay and touch support.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
      <span class="text-2xl">🌍</span>
    </div>
    <h3 class="font-bold text-lg mb-2">Multilanguage</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Add new language with zero code changes. SEO-friendly hreflang tags.</p>
  </div>
</div>

<h2 class="text-2xl font-bold font-heading mb-8 text-center">Interactive Components</h2>

<div class="grid gap-6 md:grid-cols-2 mb-16">
  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="heart" class="w-6 h-6 text-red-500 shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Favorites System</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Add products to favorites, view your list. Persisted with localStorage.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="scales" class="w-6 h-6 text-jam-primary shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Product Comparison</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Compare multiple products side by side.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="bookmark" class="w-6 h-6 text-jam-accent shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Reading List</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Save blog posts to read later.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="eye" class="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Quick View</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Preview product details without leaving the page.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="funnel" class="w-6 h-6 text-violet-500 shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Advanced Filtering</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Filter products by category, tags, and price range.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="keyboard" class="w-6 h-6 text-slate-500 shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Keyboard Shortcuts</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Press ? to view all shortcuts.</p>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold font-heading mb-8 text-center">SEO & Performance</h2>

<div class="grid gap-4 md:grid-cols-3 mb-16">
  <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
    <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">95+</div>
    <div class="text-sm text-slate-600 dark:text-slate-400">Lighthouse Score</div>
  </div>
  <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
    <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">0</div>
    <div class="text-sm text-slate-600 dark:text-slate-400">Server Dependencies</div>
  </div>
  <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-800">
    <div class="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">PWA</div>
    <div class="text-sm text-slate-600 dark:text-slate-400">Offline Support</div>
  </div>
</div>

<div class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-16">
  <h3 class="font-bold text-lg mb-4">Built-in SEO Tools</h3>
  <ul class="space-y-3">
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>Automatic meta tags (Open Graph, Twitter Cards)</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>JSON-LD structured data</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>Automatic sitemap.xml generation</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>RSS/Atom feed support</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>Canonical URL management</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>hreflang multilingual SEO tags</span>
    </li>
  </ul>
</div>

<div class="text-center">
  <p class="text-slate-600 dark:text-slate-400 mb-4">Ready to get started with JamSite?</p>
  <a href="{{ site.baseurl }}/en/getting-started/" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-jam-primary text-white font-medium hover:bg-jam-primary/90 transition-colors">
    Getting Started Guide
    {% include icon.html name="arrow-right" class="w-4 h-4" %}
  </a>
</div>

</div>
