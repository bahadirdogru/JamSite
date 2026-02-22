---
layout: default
title: Reading List
lang: en
ref: reading-list
permalink: /en/reading-list/
---

<div class="max-w-4xl mx-auto px-4 py-12">
  <h1 class="text-3xl font-bold font-heading mb-8">{{ page.title }}</h1>
  <jam-reading-list
    empty_text="{{ site.data.i18n.en.no_saved_articles }}"
    mark_read_text="{{ site.data.i18n.en.mark_as_read }}"
    mark_unread_text="{{ site.data.i18n.en.mark_as_unread }}"
    export_text="{{ site.data.i18n.en.export }}"
    clear_text="{{ site.data.i18n.en.clear_all }}"
  ></jam-reading-list>
</div>
