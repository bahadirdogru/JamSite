# Design & style reference

**AI-optimized.** Styles and design reference for AI: Tailwind theme, colors, typography, component patterns, animation, dark mode. For architecture see ARCHITECTURE.md; for project summary see CLAUDE.md; for features/todo see PROCESS.md.

## Tasarım sistemi

Proje Tailwind CSS 4 ile stillenir. Ayrı bir token dosyası yok; tüm kararlar `src/styles/global.css` içindeki `@theme` ve bileşenlerdeki utility sınıfları ile verilir. Özel CSS yalnızca zorunlu kaldığında kullanılır ve bu dosyada dokümante edilir.

## Tailwind CSS 4 yapılandırması

Yapılandırma `src/styles/global.css` içinde. `tailwind.config.js` yok.

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
@source "./**/*.astro";
@source "./**/*.svelte";

@theme {
  --color-primary: var(--color-blue-600);
  --color-secondary: var(--color-emerald-500);
  --color-accent: var(--color-amber-500);
  --font-heading: "Inter", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

`@custom-variant dark` ile `.dark` sınıfına göre koyu tema; `@theme` ile primary, secondary ve accent renkleri ile font token’ları tanımlanır. Bu token’lar `bg-primary`, `text-primary`, `font-heading` gibi utility’lere dönüşür. Yüzey, metin ve çerçeve renkleri için doğrudan Tailwind'in `slate` paleti (`slate-50`, `slate-900` vb.) kullanılır.

## Renk paleti

### Aydınlık mod

| Token | Değer | Kullanım |
|-------|-------|----------|
| primary | blue-600 | Butonlar, linkler, vurgular |
| secondary | emerald-500 | İkincil aksiyonlar, başarı |
| accent | amber-500 | Uyarı, rozetler |
| slate-50 | #f8fafc | Sayfa ve kart arka planı |
| slate-900 | #0f172a | Metin |
| slate-200 | #e2e8f0 | Çerçeve, ayırıcı |

### Koyu mod

| Token | Değer | Kullanım |
|-------|-------|----------|
| slate-900 | #0f172a | Arka plan |
| slate-100 | #f1f5f9 | Metin |
| slate-700 | #334155 | Çerçeve |

Primary, secondary ve accent her iki modda da aynı kalabilir; yüzey ve metin için ayrı koyu token’lar kullanılır.

## Tipografi

| Öğe | Sınıflar | Not |
|-----|----------|-----|
| Sayfa başlığı (h1) | `text-3xl font-bold font-heading` | Sayfada tek |
| Bölüm başlığı (h2) | `text-2xl font-semibold font-heading` | |
| Alt başlık (h3) | `text-xl font-medium` | |
| Gövde | `text-base font-body leading-relaxed` | Varsayılan paragraf |
| Küçük / caption | `text-sm text-slate-500 dark:text-slate-400` | Tarih, meta |
| Kod (inline) | `font-mono text-sm bg-slate-100 dark:bg-slate-800 px-1 rounded` | |

## Boşluk

Tailwind varsayılan spacing kullanılır. Örnekler:

| Bağlam | Sınıf | Örnek |
|--------|--------|--------|
| Bölüm arası | `py-12`, `py-16` | Sayfa bölümleri |
| Kart içi | `p-6` | Kart padding |
| Flex/grid boşluk | `gap-4`, `gap-6` | Eleman araları |

## Bileşen kalıpları

### Butonlar

```html
<!-- Birincil -->
<button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
  Aksiyon
</button>

<!-- İkincil -->
<button class="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors">
  İkincil
</button>

<!-- Ghost -->
<button class="px-4 py-2 text-primary hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
  Ghost
</button>
```

### Kart

```html
<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
  <h3 class="text-xl font-semibold mb-2">Başlık</h3>
  <p class="text-slate-600 dark:text-slate-300 leading-relaxed">İçerik.</p>
</div>
```

### Sayfa konteyneri

```html
<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- İçerik -->
</div>
```

### Slider

Slider stilleri `Slider.svelte` içinde. Arka plan overlay için `bg-black/40`, oklar için `bg-white/80 dark:bg-slate-800/80` kullanılır.

### Ürün kartı

```html
<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group">
  <div class="aspect-square overflow-hidden">
    <img src="..." alt="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>
  <div class="p-4">
    <h3 class="font-semibold mb-1">Ürün adı</h3>
    <p class="text-primary font-bold">299.99 TRY</p>
    <div class="flex flex-wrap gap-1 mt-2">
      <span class="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded-full">etiket</span>
    </div>
  </div>
</div>
```

### Etiket rozetleri

```html
<!-- Yazı etiketi -->
<span class="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">svelte</span>

<!-- Ürün etiketi -->
<span class="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">elektronik</span>

<!-- Kategori -->
<span class="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded-full">teknoloji</span>
```
---

## Modüler UI Blokları (Tailwind Plus Stili)

Bloklar `src/content/pages/*.md` frontmatter'ında tanımlanır ve `BlockRenderer.svelte` tarafından render edilir. Her blok türü farklı `layout` ve `variant` seçeneklerini destekler.

### Hero Bölümü
- **Layout**: `centered` (varsayılan), `split` (görselli).
- **Badge**: Yeni gelişmeler için üstte küçük rozet.
- **Typography**: Öne çıkan büyük başlık, alt başlık ve iki adet CTA butonu.

### Özellikler (Feature)
- **Layout**: `grid` (simge + başlık + açıklama), `screenshot` (yanda metin, ortada büyük görsel).

### CTA Bölümü
- **Layout**: `simple` (temiz, geniş), `panel` (renkli arka plan, görsel ve gradiyent).

### FAQ (SSS)
- **Layout**: `list` (basit liste), `accordion` (tıklayıp açılır başlıklar).

---

## İkonlar (Phosphor Icons)

[Svelte tarafında](https://phosphoricons.com/) `phosphor-icons-svelte` kullanılır:

```svelte
<script>
  import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte";
  import IconMagnifyingGlass from "phosphor-icons-svelte/IconMagnifyingGlass.svelte";
</script>

<IconHeartRegular class="w-5 h-5" />
```

Boyut: `w-4 h-4` (küçük), `w-5 h-5` (varsayılan), `w-6 h-6` (büyük). Renk `currentColor` ile kalıtılır.

## Arama modalı (SearchFuse)

- Arka plan: `bg-black/50`, `fixed inset-0 z-50`
- Modal: `max-w-xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl`
- Sonuç satırı vurgusu: `bg-primary/10`
- Açılış: Motion ile kısa opacity/scale
- **features.search** false ise nav’da gösterilmez (`src/config/site.js`).

## Responsive

Tailwind varsayılan breakpoint’ler, mobile-first:

| Breakpoint | Min genişlik | Kullanım |
|------------|---------------|----------|
| (varsayılan) | 0px | Mobil |
| sm: | 640px | Küçük tablet |
| md: | 768px | Tablet |
| lg: | 1024px | Masaüstü |
| xl: | 1280px | Geniş ekran |

## Animasyon

- Sayfa içi: Motion (`animate`, `inView`, `scroll`) Svelte bileşenlerinde.
- Sayfa geçişi: Astro `<ClientRouter />` (View Transitions).
- Basit hover/focus: Tailwind `transition-colors`, `transition-transform`.

### Giriş animasyonu (inView)

```js
import { animate, inView } from "motion";

inView(".card", (el) => {
  animate(el, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, easing: "ease-out" });
});
```

### Reduced motion

Animasyon öncesi tercih kontrolü yapılmalı:

```js
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  animate(el, { opacity: [0, 1], y: [20, 0] });
}
```

## Koyu mod

- `.dark` sınıfı `<html>` üzerinde; tüm `dark:` utility’leri buna göre çalışır.
- Başlangıç: `<head>` içindeki inline script (FOUC önleme).
- Toggle: `DarkModeToggle.svelte` — sınıf ve `localStorage.theme` günceller. (**features.darkMode** false ise nav'da gizlenir; `src/config/site.js`.)
- Tercih sırası: `localStorage` > `prefers-color-scheme` > aydınlık.

Kullanım: Hem aydınlık hem koyu sınıf verin:

```html
<div class="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
  <p class="text-slate-600 dark:text-slate-300">Metin</p>
  <div class="border-slate-200 dark:border-slate-700">Çerçeve</div>
</div>
```

## Stil kuralları

1. **Sadece Tailwind utility** — Mümkün olmayan durumlarda global.css ve bu doküman güncellenir.
2. **Inline `style` yok** — Sadece sınıflar veya `@theme` değişkenleri.
3. **@apply kullanılmaz** — Utility’ler doğrudan markup’ta.
4. **Sıralama**: Layout → boyut → boşluk → tipografi → renk → efekt. Örnek: `flex items-center gap-2 w-full p-4 text-sm text-slate-700 bg-white rounded-lg shadow-sm`.
5. **Svelte**: `shadow: "none"` yok; bileşenler global Tailwind ile uyumlu. Gerekmedikçe `<style>` kullanılmaz.
6. **Animasyon**: Motion kullanılır; basit geçişler için Tailwind `transition-*`.
7. **Reduced motion**: Motion kullanılan yerde kontrol edilir.

## Görseller

### Unsplash

Görseller doğrudan Unsplash URL’leri ile kullanılabilir:

```
https://images.unsplash.com/photo-{ID}?w={genişlik}&q={kalite}
```

Örnek boyutlar: hero/slider 1920, ürün 800, blog OG 1200, thumbnail 400; `q=80` yaygın.

### En-boy oranları

| Bağlam | Oran | Sınıf |
|--------|------|--------|
| Hero / slider | 16:9 | `aspect-video` |
| Ürün kartı | 1:1 | `aspect-square` |
| OG görsel | 1.91:1 | 1200×630 px |
