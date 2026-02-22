---
layout: default
title: Okuma Listem
lang: tr
ref: reading-list
permalink: /tr/reading-list/
---

<div class="max-w-4xl mx-auto px-4 py-12">
  <h1 class="text-3xl font-bold font-heading mb-8">{{ page.title }}</h1>
  <jam-reading-list
    empty_text="{{ site.data.i18n.tr.no_saved_articles }}"
    mark_read_text="{{ site.data.i18n.tr.mark_as_read }}"
    mark_unread_text="{{ site.data.i18n.tr.mark_as_unread }}"
    export_text="{{ site.data.i18n.tr.export }}"
    clear_text="{{ site.data.i18n.tr.clear_all }}"
  ></jam-reading-list>
</div>
