---
title: "Hakkında"
description: "JamSite hakkında bilgi edinin - modern, hızlı ve çok dilli statik site üretim platformu"
image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
ref: about
lang: tr
permalink: /about/
---

<div class="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert prose-headings:font-heading">

<h1 class="text-4xl font-bold mb-6">JamSite Nedir?</h1>

<p class="lead text-lg text-slate-600 dark:text-slate-400 mb-8">
JamSite, statik site üretimi ile modern frontend teknolojilerini birleştiren hibrit bir boilerplate projesidir. Jekyll'in içerik yönetimi gücünü, Svelte 5'in reaktif bileşen mimarisini ve Tailwind CSS 4'ün tasarım sistemini tek bir çatı altında toplar.
</p>

<div class="grid gap-6 md:grid-cols-2 my-10">
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-jam-primary to-jam-secondary flex items-center justify-center text-white text-2xl mb-4">⚡</div>
    <h3 class="font-bold text-lg mb-2">Hızlı</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Statik HTML + tek bundle JS/CSS. Lighthouse 95+ puan garantisi.</p>
  </div>
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl mb-4">🌍</div>
    <h3 class="font-bold text-lg mb-2">Çok Dilli</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">i18n mimariyle doğar. Yeni dil eklemek için sadece dosya eklenir.</p>
  </div>
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-4">🔧</div>
    <h3 class="font-bold text-lg mb-2">Sıfır Yapılandırma</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">GitHub Pages'e push et, otomatik yayınlansın. CI/CD gerekmez.</p>
  </div>
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white text-2xl mb-4">🎨</div>
    <h3 class="font-bold text-lg mb-2">Modern UI</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Svelte 5 + Tailwind 4 ile reaktif ve güzel bileşenler.</p>
  </div>
</div>

<h2 class="text-2xl font-bold mt-12 mb-6">Tasarım Felsefesi</h2>

<div class="space-y-4">
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">🚀</span>
    <div>
      <h4 class="font-semibold">Progressive Enhancement</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">İçerik JavaScript olmadan da okunabilir kalır. Etkileşimli özellikler deneyimi zenginleştirir, bağımlılık yaratmaz.</p>
    </div>
  </div>
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">📦</span>
    <div>
      <h4 class="font-semibold">JAMstack Yaklaşımı</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Sunucu tarafı işlem yok. Tüm içerik build aşamasında statik HTML'e dönüşür; CDN üzerinden hızlıca sunulur.</p>
    </div>
  </div>
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">🔗</span>
    <div>
      <h4 class="font-semibold">Separation of Concerns</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Jekyll içerik ve SEO'dan, Svelte etkileşimden, Tailwind görünümden sorumludur. Her katman bağımsız çalışır.</p>
    </div>
  </div>
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">📝</span>
    <div>
      <h4 class="font-semibold">Content-First</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Önce içerik, sonra sunum. Markdown ve YAML ile veri girişi yapılır; şablonlar bunu otomatik olarak sayfaya dönüştürür.</p>
    </div>
  </div>
  <div class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
    <span class="text-2xl">🌐</span>
    <div>
      <h4 class="font-semibold">Web Standards</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Svelte bileşenleri Web Components olarak derlenir. Framework bağımlılığı yoktur; tarayıcının native API'leri kullanılır.</p>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold mt-12 mb-6">Teknoloji Yığını</h2>

<div class="flex flex-wrap gap-3 mb-8">
  <span class="px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium text-sm">Jekyll 3.9</span>
  <span class="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium text-sm">Svelte 5</span>
  <span class="px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 font-medium text-sm">Tailwind CSS 4</span>
  <span class="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium text-sm">Vite</span>
  <span class="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium text-sm">Lunr.js</span>
  <span class="px-4 py-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 font-medium text-sm">Motion</span>
</div>

<h2 class="text-2xl font-bold mt-12 mb-6">Kim Yaptı?</h2>

<div class="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-jam-primary/10 to-jam-secondary/10 dark:from-jam-primary/20 dark:to-jam-secondary/20">
  <div class="w-20 h-20 rounded-full bg-gradient-to-br from-jam-primary to-jam-secondary flex items-center justify-center text-white text-3xl font-bold shrink-0">BD</div>
  <div>
    <h3 class="font-bold text-xl">Bahadır Doğru</h3>
    <p class="text-slate-600 dark:text-slate-400 mb-2">Full-stack geliştirici ve tasarımcı</p>
    <a href="https://bahadirdogru.com" target="_blank" rel="noopener" class="inline-flex items-center gap-1 text-jam-primary hover:underline font-medium">
      bahadirdogru.com
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
    </a>
  </div>
</div>

<div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
  <p class="text-slate-500 dark:text-slate-400 text-sm">Sorularınız mı var?</p>
  <a href="https://bahadirdogru.com" target="_blank" rel="noopener" class="inline-flex items-center gap-2 mt-3 px-6 py-3 rounded-full bg-jam-primary text-white font-medium hover:bg-jam-primary/90 transition-colors">
    İletişime Geç
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
  </a>
</div>

</div>
