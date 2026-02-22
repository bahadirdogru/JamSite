---
title: "Özellikler"
description: "JamSite'ın sunduğu tüm özellikler - blog, ürün kataloğu, arama, çok dil desteği ve daha fazlası"
image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
ref: features
lang: tr
permalink: /features/
---

<div class="max-w-4xl mx-auto px-4 py-12">

<header class="text-center mb-16">
  <h1 class="text-4xl md:text-5xl font-bold font-heading mb-4">Özellikler</h1>
  <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
    JamSite, modern bir web sitesi için ihtiyacınız olan her şeyi tek pakette sunar.
  </p>
</header>

<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
      {% include icon.html name="newspaper" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Blog Sistemi</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Etiketler ve kategorilerle organize blog yazıları. Markdown ile kolay içerik oluşturma.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
      {% include icon.html name="cube" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Ürün Kataloğu</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">SKU tabanlı ürün yönetimi. Tek YAML dosyasında tüm diller. E-ticaret hazır yapı.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
      {% include icon.html name="magnifying-glass" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Site İçi Arama</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Spotlight tarzı arama modali. Cmd+K ile anında erişim. Türkçe stemmer desteği.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
      {% include icon.html name="sun" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Karanlık/Aydınlık Mod</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">FOUC-free tema değiştirme. OS tercihini otomatik algılar, localStorage ile hatırlar.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center mb-4">
      {% include icon.html name="image" class="w-7 h-7 text-white" %}
    </div>
    <h3 class="font-bold text-lg mb-2">Dinamik Slider</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Veri tabanlı slider. Hero ve image tipleri. Otomatik oynatma ve dokunmatik destek.</p>
  </div>

  <div class="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-jam-primary/50 transition-all">
    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
      <span class="text-2xl">🌍</span>
    </div>
    <h3 class="font-bold text-lg mb-2">Çok Dil Desteği</h3>
    <p class="text-sm text-slate-600 dark:text-slate-400">Sıfır kod değişikliği ile yeni dil ekleme. SEO uyumlu hreflang etiketleri.</p>
  </div>
</div>

<h2 class="text-2xl font-bold font-heading mb-8 text-center">Etkileşimli Bileşenler</h2>

<div class="grid gap-6 md:grid-cols-2 mb-16">
  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="heart" class="w-6 h-6 text-red-500 shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Favori Sistemi</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Ürünleri favorilere ekle, listeyi görüntüle. localStorage ile kalıcı.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="scales" class="w-6 h-6 text-jam-primary shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Ürün Karşılaştırma</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Birden fazla ürünü yan yana karşılaştır.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="bookmark" class="w-6 h-6 text-jam-accent shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Okuma Listesi</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Blog yazılarını sonra okumak için kaydet.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="eye" class="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Hızlı Görüntüleme</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Sayfa değiştirmeden ürün detaylarını incele.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="funnel" class="w-6 h-6 text-violet-500 shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Gelişmiş Filtreleme</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">Kategori, etiket ve fiyat aralığına göre ürün filtrele.</p>
    </div>
  </div>

  <div class="flex gap-4 items-start p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
    {% include icon.html name="keyboard" class="w-6 h-6 text-slate-500 shrink-0 mt-0.5" %}
    <div>
      <h4 class="font-semibold mb-1">Klavye Kısayolları</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">? tuşu ile tüm kısayolları görüntüle.</p>
    </div>
  </div>
</div>

<h2 class="text-2xl font-bold font-heading mb-8 text-center">SEO ve Performans</h2>

<div class="grid gap-4 md:grid-cols-3 mb-16">
  <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
    <div class="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">95+</div>
    <div class="text-sm text-slate-600 dark:text-slate-400">Lighthouse Puanı</div>
  </div>
  <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
    <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">0</div>
    <div class="text-sm text-slate-600 dark:text-slate-400">Sunucu Bağımlılığı</div>
  </div>
  <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-800">
    <div class="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">PWA</div>
    <div class="text-sm text-slate-600 dark:text-slate-400">Çevrimdışı Destek</div>
  </div>
</div>

<div class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 mb-16">
  <h3 class="font-bold text-lg mb-4">Dahili SEO Araçları</h3>
  <ul class="space-y-3">
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>Otomatik meta etiketler (Open Graph, Twitter Cards)</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>JSON-LD yapılandırılmış veri</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>Otomatik sitemap.xml üretimi</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>RSS/Atom feed desteği</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>Canonical URL yönetimi</span>
    </li>
    <li class="flex items-center gap-3">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span>hreflang çoklu dil SEO etiketleri</span>
    </li>
  </ul>
</div>

<div class="text-center">
  <p class="text-slate-600 dark:text-slate-400 mb-4">JamSite'ı kullanmaya başlamak için</p>
  <a href="{{ site.baseurl }}/getting-started/" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-jam-primary text-white font-medium hover:bg-jam-primary/90 transition-colors">
    Kurulum Rehberi
    {% include icon.html name="arrow-right" class="w-4 h-4" %}
  </a>
</div>

</div>
