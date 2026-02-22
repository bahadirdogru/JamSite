---
title: "Başlangıç Rehberi"
description: "JamSite'ı kurun ve dakikalar içinde çalışır hale getirin - adım adım kurulum rehberi"
image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80"
ref: getting-started
lang: tr
permalink: /getting-started/
---

<div class="max-w-3xl mx-auto px-4 py-12">

<header class="mb-12">
  <h1 class="text-4xl font-bold font-heading mb-4">Başlangıç Rehberi</h1>
  <p class="text-xl text-slate-600 dark:text-slate-400">
    JamSite'ı birkaç dakika içinde kurun ve kişiselleştirmeye başlayın.
  </p>
</header>

<nav class="mb-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
  <h2 class="font-semibold mb-3 flex items-center gap-2">
    {% include icon.html name="list" class="w-5 h-5" %}
    İçindekiler
  </h2>
  <ul class="space-y-2 text-sm">
    <li><a href="#gereksinimler" class="text-jam-primary hover:underline">1. Gereksinimler</a></li>
    <li><a href="#kurulum" class="text-jam-primary hover:underline">2. Kurulum</a></li>
    <li><a href="#gelistirme" class="text-jam-primary hover:underline">3. Geliştirme</a></li>
    <li><a href="#icerik-ekleme" class="text-jam-primary hover:underline">4. İçerik Ekleme</a></li>
    <li><a href="#yayinlama" class="text-jam-primary hover:underline">5. Yayınlama</a></li>
    <li><a href="#ozellistirme" class="text-jam-primary hover:underline">6. Özelleştirme</a></li>
  </ul>
</nav>

<section id="gereksinimler" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">1</span>
    Gereksinimler
  </h2>
  
  <div class="space-y-3">
    <div class="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span><strong>Node.js</strong> (v18 veya üstü)</span>
      <a href="https://nodejs.org/" target="_blank" rel="noopener" class="ml-auto text-jam-primary text-sm hover:underline">İndir</a>
    </div>
    <div class="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span><strong>Git</strong></span>
      <a href="https://git-scm.com/" target="_blank" rel="noopener" class="ml-auto text-jam-primary text-sm hover:underline">İndir</a>
    </div>
    <div class="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {% include icon.html name="info" class="w-5 h-5 text-blue-500" %}
      <span><strong>Ruby/Jekyll</strong> - Yerel geliştirme için gerekli değil (GitHub Pages otomatik çalıştırır)</span>
    </div>
  </div>
</section>

<section id="kurulum" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">2</span>
    Kurulum
  </h2>

  <div class="space-y-4">
    <div class="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm overflow-x-auto">
      <div class="text-slate-400 mb-2"># Projeyi klonla</div>
      <div>git clone https://github.com/bahadirdogru/JamSite.git</div>
      <div class="mt-3 text-slate-400"># Proje klasörüne gir</div>
      <div>cd JamSite</div>
      <div class="mt-3 text-slate-400"># Bağımlılıkları yükle</div>
      <div>npm install</div>
    </div>

    <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
      <div class="flex gap-3">
        {% include icon.html name="info" class="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" %}
        <div class="text-sm">
          <strong class="text-amber-800 dark:text-amber-200">İpucu:</strong>
          <span class="text-amber-700 dark:text-amber-300">Kendi projeniz için önce GitHub'da fork yapın, sonra kendi repo'nuzu klonlayın.</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="gelistirme" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">3</span>
    Geliştirme
  </h2>

  <div class="space-y-4">
    <p class="text-slate-600 dark:text-slate-400">Svelte bileşenlerini düzenlemek için Vite dev server'ı başlatın:</p>
    
    <div class="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm">
      <div>npm run dev</div>
    </div>

    <p class="text-slate-600 dark:text-slate-400">Bu komut:</p>
    <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
      <li>Vite geliştirme sunucusunu başlatır</li>
      <li>Hot reload ile anlık değişiklik görüntüleme</li>
      <li>Svelte bileşenlerini derler</li>
    </ul>

    <div class="mt-6 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-3">Üretim build'i oluştur:</h4>
      <div class="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-sm">
        npm run build
      </div>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
        Bu komut <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">assets/dist/</code> klasörüne bundle.js ve bundle.css dosyalarını oluşturur.
      </p>
    </div>
  </div>
</section>

<section id="icerik-ekleme" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">4</span>
    İçerik Ekleme
  </h2>

  <div class="space-y-6">
    <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
        {% include icon.html name="newspaper" class="w-5 h-5 text-jam-primary" %}
        Blog Yazısı Ekle
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
        <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_posts/tr/</code> klasörüne yeni bir markdown dosyası ekleyin:
      </p>
      <div class="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
        <div class="text-slate-400"># _posts/tr/2026-02-20-yeni-yazi.md</div>
        <div class="mt-2">---</div>
        <div>title: "Yazı Başlığı"</div>
        <div>description: "Kısa açıklama"</div>
        <div>date: 2026-02-20</div>
        <div>tags: [svelte, web]</div>
        <div>categories: [geliştirme]</div>
        <div>ref: yeni-yazi</div>
        <div>---</div>
        <div class="mt-2">Yazı içeriği buraya...</div>
      </div>
    </div>

    <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
        {% include icon.html name="cube" class="w-5 h-5 text-jam-accent" %}
        Ürün Ekle
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
        <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_data/products/</code> klasörüne yeni bir YAML dosyası ekleyin:
      </p>
      <div class="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
        <div class="text-slate-400"># _data/products/sku002.yml</div>
        <div class="mt-2">sku: "sku002"</div>
        <div>price: 499.99</div>
        <div>currency: "TRY"</div>
        <div>image: /assets/img/products/sku002.jpg</div>
        <div>tags: [elektronik]</div>
        <div>categories: [teknoloji]</div>
        <div>active: true</div>
        <div class="mt-2">tr:</div>
        <div>  title: "Ürün Adı"</div>
        <div>  description: "Ürün açıklaması"</div>
        <div>  slug: "urun-adi"</div>
        <div class="mt-2">en:</div>
        <div>  title: "Product Name"</div>
        <div>  description: "Product description"</div>
        <div>  slug: "product-name"</div>
      </div>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-3">
        Sonra <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">npm run build</code> çalıştırın. Ürün sayfaları otomatik oluşturulur.
      </p>
    </div>

    <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
        <span class="text-xl">🌍</span>
        Yeni Dil Ekle
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li><code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_config.yml</code>'de <code>languages</code> array'ine dil kodunu ekle</li>
        <li><code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_data/i18n/{lang}.yml</code> oluştur (UI çevirileri)</li>
        <li><code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_data/slides/{lang}.yml</code> oluştur (slider içeriği)</li>
        <li><code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_pages/{lang}/</code> klasörü oluştur ve sayfaları ekle</li>
        <li><code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_posts/{lang}/</code> klasörü oluştur</li>
      </ol>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-3">
        hreflang etiketleri ve dil değiştirici otomatik olarak yeni dili algılar.
      </p>
    </div>
  </div>
</section>

<section id="yayinlama" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">5</span>
    Yayınlama
  </h2>

  <div class="space-y-4">
    <p class="text-slate-600 dark:text-slate-400">Değişikliklerinizi GitHub'a gönderin:</p>
    
    <div class="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm">
      <div class="text-slate-400"># Build al</div>
      <div>npm run build</div>
      <div class="mt-3 text-slate-400"># Commit ve push</div>
      <div>git add -A</div>
      <div>git commit -m "içerik güncelleme"</div>
      <div>git push</div>
    </div>

    <div class="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
      <div class="flex gap-3">
        {% include icon.html name="check-circle" class="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" %}
        <div class="text-sm">
          <strong class="text-green-800 dark:text-green-200">Otomatik yayınlama:</strong>
          <span class="text-green-700 dark:text-green-300">GitHub Pages, push'tan sonra Jekyll'i otomatik çalıştırır ve siteyi günceller.</span>
        </div>
      </div>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">GitHub Pages Ayarları</h4>
      <ol class="list-decimal list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
        <li>GitHub'da repo → Settings → Pages</li>
        <li>Source: "Deploy from a branch"</li>
        <li>Branch: main (veya master)</li>
        <li>Folder: / (root)</li>
      </ol>
    </div>
  </div>
</section>

<section id="ozellistirme" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">6</span>
    Özelleştirme
  </h2>

  <div class="grid gap-4 md:grid-cols-2">
    <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">Renkler</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">src/app.css</code> dosyasındaki <code>@theme</code> bloğunu düzenleyin.
      </p>
    </div>
    <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">Site Bilgileri</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">_config.yml</code> dosyasında title, description, url değerlerini güncelleyin.
      </p>
    </div>
    <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">Navbar/Footer</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">_includes/navbar.html</code> ve <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">footer.html</code> dosyalarını düzenleyin.
      </p>
    </div>
    <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">Bileşenler</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">src/components/</code> klasöründeki Svelte dosyalarını düzenleyin.
      </p>
    </div>
  </div>
</section>

<div class="mt-16 p-8 rounded-2xl bg-gradient-to-br from-jam-primary/10 to-jam-secondary/10 dark:from-jam-primary/20 dark:to-jam-secondary/20 text-center">
  <h3 class="text-xl font-bold mb-2">Yardıma mı ihtiyacınız var?</h3>
  <p class="text-slate-600 dark:text-slate-400 mb-4">Detaylı dokümantasyon ve örnekler için</p>
  <div class="flex flex-wrap justify-center gap-3">
    <a href="{{ site.baseurl }}/features/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium hover:border-jam-primary transition-colors">
      {% include icon.html name="list" class="w-4 h-4" %}
      Özellikler
    </a>
    <a href="{{ site.baseurl }}/about/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium hover:border-jam-primary transition-colors">
      {% include icon.html name="info" class="w-4 h-4" %}
      Hakkında
    </a>
  </div>
</div>

</div>
