---
title: "Tek Bir Config'ten Yeni Dil Eklemek"
description: "JamSite'da dil listesi artık tek kaynak: src/config/site.js. Almanca, İspanyolca vb. eklemek için sadece bir dosyayı güncellemeniz yeterli."
date: 2026-03-03
image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80"
tags: [i18n, astro, config, çok-dilli]
categories: [geliştirme]
ref: tek-config-dil
lang: tr
---

Projeyi fork edip yeni bir dil (örneğin Almanca) eklemek istediğinizde eskiden birkaç yerde değişiklik yapmanız gerekirdi: Astro config, content collection şeması, layout’taki dil değiştirici… Artık **tek bir kaynak** var: `src/config/site.js`.

## Tek kaynak: site.js

Tüm dil listesi ve varsayılan dil **sadece** `src/config/site.js` içinde tanımlı:

```js
/** Tek kaynak: Yeni dil eklemek için sadece bu diziyi güncelle (örn. "de" ekle). */
export const languages = ["tr", "en"];

/** Varsayılan dil (root URL). */
export const defaultLang = "tr";
```

Buradan otomatik türeyenler:

- **astro.config.mjs** — `i18n.locales` ve `i18n.defaultLocale` bu dosyadan import edilir; yeni dil eklediğinizde Astro config’e dokunmanız gerekmez.
- **src/content/config.js** — Blog ve sayfa koleksiyonlarındaki `lang` alanı `z.enum(languages)` ile bu diziyi kullanır; content schema’yı ayrıca güncellemezsiniz.
- **BaseLayout.astro** — Dil değiştirici linkleri, `og:locale` ve dil etiketleri (`languageLabels`, `localeForOg`) site.js’den okunur.

Yani Almanca eklemek için **tek yapmanız gereken** `languages` dizisine `"de"` eklemek:

```js
export const languages = ["tr", "en", "de"];
```

## Ek adımlar (içerik tarafı)

Config tarafı bu kadar. Dilin gerçekten çalışması için:

1. **src/i18n/de.js** — Arayüz metinleri (nav, butonlar, arama placeholder’ı vb.) için çeviri anahtarlarını ekleyin; yapı `tr.js` / `en.js` ile aynı.
2. **src/pages/de/** — İngilizce için `src/pages/en/` nasılsa, Almanca sayfalar için `index.astro`, `about.astro`, `blog/`, `products/` vb. oluşturun.
3. İsteğe bağlı: **site.js** içinde `localeForOg` ve `languageLabels` objelerine `de: "de_DE"`, `de: "DE"` ekleyebilirsiniz (zaten örnek olarak tanımlı; sadece `languages`’a eklemeniz yeterli).

Slider, ürün frontmatter’ı gibi içerikler dil bazlı ayrıca yönetildiği için, onları da yeni dilde doldurmanız gerekir; ancak **config senkronizasyonu** artık tek yerden yapılıyor.

## Özet

| Ne yapıyorsunuz? | Nereyi güncelliyorsunuz? |
|------------------|--------------------------|
| Yeni dil kodu eklemek | Sadece `src/config/site.js` → `languages` |
| Astro i18n / content schema | Hiçbir şey — site.js’den türetiliyor |
| UI çevirileri | `src/i18n/{lang}.js` |
| Sayfa route’ları | `src/pages/{lang}/` |

Böylece fork’ladığınız projede Almanca, İspanyolca veya başka bir dil eklemek tek config değişikliğiyle başlıyor; diğer config dosyalarında tekrar dil listesini tutmanıza gerek kalmıyor.
