---
title: "Dark Mode Design"
description: "Thoughts on dark mode implementation and user experience in websites."
date: 2026-02-18
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80"
tags: [design, css, tailwind]
categories: [design]
ref: dark-mode-design
lang: en
---

Dark mode is no longer a trend, it's a standard. Most users use dark mode on their devices and expect websites to adapt. So how do we implement dark mode correctly?

## FOUC Problem

Flash of Unstyled Content (FOUC) is when theme change is visibly experienced while the page loads. This leaves an unprofessional impression. JamSite solves this with an inline script:

```javascript
(function(){
  var t = localStorage.getItem("theme");
  if (t === "dark" || (!t && matchMedia("(prefers-color-scheme:dark)").matches))
    document.documentElement.classList.add("dark");
})();
```

This script runs in `<head>`, before CSS loads, adding the `.dark` class instantly.

## Dark Mode with Tailwind

Tailwind CSS 4 offers a CSS-native solution for dark mode:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

With this definition, you can use all `dark:` prefixed utility classes:

```html
<div class="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
  Content
</div>
```

## Design Tips

Things to consider when designing dark mode:

- **Contrast**: Ensure sufficient contrast between text and background
- **Color choice**: Use dark gray tones instead of pure black (#000)
- **Images**: Very bright images tire the eyes in dark mode
- **Shadows**: Use subtle borders instead of shadows in dark mode

JamSite's theme toggle component applies these principles to provide a seamless experience.
