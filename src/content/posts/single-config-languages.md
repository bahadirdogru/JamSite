---
title: "Adding a New Language from a Single Config"
description: "In JamSite, the language list has a single source: src/config/site.js. Add German, Spanish, or any language by updating one file."
date: 2026-03-03
image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80"
tags: [i18n, astro, config, multilingual]
categories: [development]
ref: single-config-languages
lang: en
---

When you fork the project and want to add a new language (e.g. German), you used to change several places: Astro config, content collection schema, the layout’s language switcher. Now there is **one source of truth**: `src/config/site.js`.

## Single source: site.js

The full language list and default language live **only** in `src/config/site.js`:

```js
/** Single source: update this array to add a language (e.g. "de"). */
export const languages = ["tr", "en"];

/** Default language (root URL). */
export const defaultLang = "tr";
```

Everything below is derived from this file:

- **astro.config.mjs** — `i18n.locales` and `i18n.defaultLocale` are imported from here; you don’t touch Astro config when adding a language.
- **src/content/config.js** — The `lang` field in blog and page collections uses `z.enum(languages)`; no need to update the content schema elsewhere.
- **BaseLayout.astro** — Language switcher links, `og:locale`, and labels (`languageLabels`, `localeForOg`) are read from site.js.

So to add German, the **only required config change** is to add `"de"` to the `languages` array:

```js
export const languages = ["tr", "en", "de"];
```

## Extra steps (content)

Config is done. To make the language actually work:

1. **src/i18n/de.js** — Add translation keys for UI strings (nav, buttons, search placeholder, etc.); structure matches `tr.js` / `en.js`.
2. **src/pages/de/** — Create the same structure as `src/pages/en/`: `index.astro`, `about.astro`, `blog/`, `products/`, etc.
3. Optional: In **site.js**, add entries for `localeForOg` and `languageLabels` (e.g. `de: "de_DE"`, `de: "DE"`); they are already stubbed, so often adding the code to `languages` is enough.

Slides and product frontmatter are managed per language separately, so you’ll add content for the new language there too; **config sync** itself stays in one place.

## Summary

| What you do | Where you change it |
|-------------|---------------------|
| Add a new language code | Only `src/config/site.js` → `languages` |
| Astro i18n / content schema | Nowhere — derived from site.js |
| UI translations | `src/i18n/{lang}.js` |
| Page routes | `src/pages/{lang}/` |

So when you fork the project and add German, Spanish, or any other language, you start with a single config change; you no longer need to keep the language list in sync across multiple config files.
