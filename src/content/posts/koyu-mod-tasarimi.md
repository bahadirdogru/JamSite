---
title: "Koyu Mod Tasarımı"
description: "Web sitelerinde koyu mod implementasyonu ve kullanıcı deneyimi üzerine düşünceler."
date: 2026-02-18
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
tags: [tasarim, css, tailwind]
categories: [tasarım]
ref: dark-mode-design
lang: tr
---

Koyu mod artık bir trend değil, bir standart. Kullanıcıların büyük çoğunluğu cihazlarında koyu mod kullanıyor ve web sitelerinin de buna uyum sağlamasını bekliyor. Peki koyu modu doğru şekilde nasıl implement ederiz?

## FOUC Problemi

Flash of Unstyled Content (FOUC), sayfa yüklenirken tema değişikliğinin gözle görülür bir şekilde yaşanmasıdır. Bu durum profesyonel olmayan bir izlenim bırakır. JamSite bu sorunu inline script ile çözer:

```javascript
(function(){
  var t = localStorage.getItem("theme");
  if (t === "dark" || (!t && matchMedia("(prefers-color-scheme:dark)").matches))
    document.documentElement.classList.add("dark");
})();
```

Bu script `<head>` içinde, CSS yüklenmeden önce çalışarak `.dark` class'ını anında ekler.

## Tailwind ile Koyu Mod

Tailwind CSS 4, koyu mod için CSS-native bir çözüm sunar:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Bu tanımlama ile tüm `dark:` prefix'li utility class'ları kullanabilirsiniz:

```html
<div class="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
  İçerik
</div>
```

## Tasarım İpuçları

Koyu mod tasarlarken dikkat edilmesi gerekenler:

- **Kontrast**: Metin ve arka plan arasında yeterli kontrast sağlayın
- **Renk seçimi**: Saf siyah (#000) yerine koyu gri tonları kullanın
- **Görseller**: Koyu modda çok parlak görüntüler göz yorar
- **Gölgeler**: Koyu modda gölge yerine subtle border'lar kullanın

JamSite'ın tema değiştirici bileşeni bu prensipleri uygulayarak sorunsuz bir deneyim sunar.
