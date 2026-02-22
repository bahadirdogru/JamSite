---
layout: default
title: Favoriler
lang: tr
ref: favorites
permalink: /tr/favorites/
---

<div class="max-w-5xl mx-auto px-4 py-12">
  <h1 class="text-3xl font-bold font-heading mb-8">{{ page.title }}</h1>
  <jam-favorites-list
    empty_text="{{ site.data.i18n.tr.no_favorites }}"
    clear_text="{{ site.data.i18n.tr.clear_all }}"
    clear_confirm="{{ site.data.i18n.tr.clear_confirm }}"
  ></jam-favorites-list>
</div>
