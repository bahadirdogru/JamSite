---
title: "Ana Sayfa"
description: "JamSite - Modern Jekyll + Svelte 5 hibrit statik site"
ref: home
lang: tr
permalink: /
---

{% assign slides = site.data.slides[page.lang] %}
{% if slides %}
<section class="max-w-6xl mx-auto px-4 pt-8">
  <jam-slider data-slides="{{ slides | jsonify | escape }}" autoplay="5000"></jam-slider>
</section>
{% endif %}

{% assign t = site.data.i18n[page.lang] %}

{% assign cat_gradients = "from-rose-500 to-orange-500,from-emerald-500 to-teal-500,from-violet-500 to-purple-500,from-sky-500 to-blue-500,from-amber-500 to-yellow-500" | split: "," %}
{% assign cat_icons = "🛍️,🏠,💻,🎨,⚡" | split: "," %}
{% assign all_cats = "" %}
{% for pe in site.data.products %}{% assign p = pe[1] %}{% if p.active %}{% for cat in p.categories %}{% unless all_cats contains cat %}{% if all_cats != "" %}{% assign all_cats = all_cats | append: "|" %}{% endif %}{% assign all_cats = all_cats | append: cat %}{% endunless %}{% endfor %}{% endif %}{% endfor %}
{% assign cats_array = all_cats | split: "|" %}
{% assign csep = "" %}
{% capture category_stories %}[{% for cat in cats_array %}{% assign cat_count = 0 %}{% for pe in site.data.products %}{% assign p = pe[1] %}{% if p.active and p.categories contains cat %}{% assign cat_count = cat_count | plus: 1 %}{% endif %}{% endfor %}{% assign cgi = forloop.index0 | modulo: cat_gradients.size %}{{ csep }}{"title":"{{ cat }}","subtitle":"{{ cat_count }} ürün","gradient":"{{ cat_gradients[cgi] }}","icon":"{{ cat_icons[cgi] }}","link":"/categories/"}{% assign csep = "," %}{% endfor %}]{% endcapture %}

<section class="max-w-6xl mx-auto px-4 pt-6">
  <jam-stories data-items="{{ category_stories | strip_newlines | escape }}" duration="4000" label="{{ t.stories_categories | default: 'Kategoriler' }}"></jam-stories>
</section>

{% assign prod_gradients = "from-blue-500 to-indigo-600,from-emerald-500 to-teal-600,from-rose-500 to-pink-600,from-amber-500 to-orange-600,from-violet-500 to-purple-600" | split: "," %}
{% assign psep = "" %}
{% assign pgi = 0 %}
{% capture carousel_products %}[{% for pe in site.data.products %}{% assign p = pe[1] %}{% assign info = p[page.lang] %}{% if info and p.active %}{% assign pgmod = pgi | modulo: prod_gradients.size %}{{ psep }}{"title":{{ info.title | jsonify }},"image":{{ p.image | jsonify }},"description":{{ info.description | truncatewords: 12 | jsonify }},"price":"{{ p.price }} {{ p.currency }}","link":"/products/{{ info.slug | default: p.sku }}/","tags":{{ p.tags | jsonify }},"gradient":"{{ prod_gradients[pgmod] }}"}{% assign psep = "," %}{% assign pgi = pgi | plus: 1 %}{% endif %}{% endfor %}]{% endcapture %}

<section class="max-w-6xl mx-auto px-4 py-10">
  <jam-product-carousel data-products="{{ carousel_products | strip_newlines | escape }}" autoplay="6000" label="{{ t.products_title | default: 'Ürünler' }}"></jam-product-carousel>
</section>

<section class="max-w-6xl mx-auto px-4 py-16 border-t border-jam-border dark:border-jam-border-dark">
  <h2 class="text-2xl font-bold font-heading mb-8 text-center">Son Yazılar</h2>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {% assign lang_posts = site.posts | where: "lang", page.lang %}
    {% for post in lang_posts limit:3 %}
    <article class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-jam-border dark:border-jam-border-dark overflow-hidden hover:shadow-md transition-shadow">
      <div class="p-6">
        <div class="text-xs text-slate-500 dark:text-slate-400 mb-2">{{ post.date | date: "%d.%m.%Y" }}</div>
        <h3 class="font-semibold text-lg mb-2">
          <a href="{{ post.url | prepend: site.baseurl }}" class="hover:text-jam-primary transition-colors">{{ post.title }}</a>
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{{ post.description | default: post.excerpt | strip_html | truncatewords: 25 }}</p>
        {% if post.tags.size > 0 %}
        <div class="flex flex-wrap gap-1.5 mt-3">
          {% for tag in post.tags limit:3 %}
          <span class="px-2 py-0.5 text-xs bg-jam-primary/10 text-jam-primary rounded-full">{{ tag }}</span>
          {% endfor %}
        </div>
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</section>
