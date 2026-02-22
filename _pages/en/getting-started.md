---
title: "Getting Started"
description: "Set up JamSite and get it running in minutes - step by step installation guide"
image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80"
ref: getting-started
lang: en
permalink: /en/getting-started/
---

<div class="max-w-3xl mx-auto px-4 py-12">

<header class="mb-12">
  <h1 class="text-4xl font-bold font-heading mb-4">Getting Started</h1>
  <p class="text-xl text-slate-600 dark:text-slate-400">
    Set up JamSite in minutes and start customizing.
  </p>
</header>

<nav class="mb-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
  <h2 class="font-semibold mb-3 flex items-center gap-2">
    {% include icon.html name="list" class="w-5 h-5" %}
    Contents
  </h2>
  <ul class="space-y-2 text-sm">
    <li><a href="#requirements" class="text-jam-primary hover:underline">1. Requirements</a></li>
    <li><a href="#installation" class="text-jam-primary hover:underline">2. Installation</a></li>
    <li><a href="#development" class="text-jam-primary hover:underline">3. Development</a></li>
    <li><a href="#adding-content" class="text-jam-primary hover:underline">4. Adding Content</a></li>
    <li><a href="#deployment" class="text-jam-primary hover:underline">5. Deployment</a></li>
    <li><a href="#customization" class="text-jam-primary hover:underline">6. Customization</a></li>
  </ul>
</nav>

<section id="requirements" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">1</span>
    Requirements
  </h2>
  
  <div class="space-y-3">
    <div class="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span><strong>Node.js</strong> (v18 or higher)</span>
      <a href="https://nodejs.org/" target="_blank" rel="noopener" class="ml-auto text-jam-primary text-sm hover:underline">Download</a>
    </div>
    <div class="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {% include icon.html name="check-circle" class="w-5 h-5 text-green-500" %}
      <span><strong>Git</strong></span>
      <a href="https://git-scm.com/" target="_blank" rel="noopener" class="ml-auto text-jam-primary text-sm hover:underline">Download</a>
    </div>
    <div class="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      {% include icon.html name="info" class="w-5 h-5 text-blue-500" %}
      <span><strong>Ruby/Jekyll</strong> - Not required for local development (GitHub Pages runs it automatically)</span>
    </div>
  </div>
</section>

<section id="installation" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">2</span>
    Installation
  </h2>

  <div class="space-y-4">
    <div class="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm overflow-x-auto">
      <div class="text-slate-400 mb-2"># Clone the project</div>
      <div>git clone https://github.com/bahadirdogru/JamSite.git</div>
      <div class="mt-3 text-slate-400"># Enter the project folder</div>
      <div>cd JamSite</div>
      <div class="mt-3 text-slate-400"># Install dependencies</div>
      <div>npm install</div>
    </div>

    <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
      <div class="flex gap-3">
        {% include icon.html name="info" class="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" %}
        <div class="text-sm">
          <strong class="text-amber-800 dark:text-amber-200">Tip:</strong>
          <span class="text-amber-700 dark:text-amber-300">For your own project, first fork on GitHub, then clone your own repo.</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="development" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">3</span>
    Development
  </h2>

  <div class="space-y-4">
    <p class="text-slate-600 dark:text-slate-400">Start the Vite dev server to edit Svelte components:</p>
    
    <div class="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm">
      <div>npm run dev</div>
    </div>

    <p class="text-slate-600 dark:text-slate-400">This command:</p>
    <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 ml-4">
      <li>Starts the Vite development server</li>
      <li>Hot reload for instant changes</li>
      <li>Compiles Svelte components</li>
    </ul>

    <div class="mt-6 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-3">Create production build:</h4>
      <div class="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-sm">
        npm run build
      </div>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">
        This creates bundle.js and bundle.css in the <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">assets/dist/</code> folder.
      </p>
    </div>
  </div>
</section>

<section id="adding-content" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">4</span>
    Adding Content
  </h2>

  <div class="space-y-6">
    <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
        {% include icon.html name="newspaper" class="w-5 h-5 text-jam-primary" %}
        Add Blog Post
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
        Add a new markdown file to the <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_posts/en/</code> folder:
      </p>
      <div class="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
        <div class="text-slate-400"># _posts/en/2026-02-20-new-post.md</div>
        <div class="mt-2">---</div>
        <div>title: "Post Title"</div>
        <div>description: "Short description"</div>
        <div>date: 2026-02-20</div>
        <div>tags: [svelte, web]</div>
        <div>categories: [development]</div>
        <div>ref: new-post</div>
        <div>---</div>
        <div class="mt-2">Post content here...</div>
      </div>
    </div>

    <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
        {% include icon.html name="cube" class="w-5 h-5 text-jam-accent" %}
        Add Product
      </h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
        Add a new YAML file to the <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_data/products/</code> folder:
      </p>
      <div class="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
        <div class="text-slate-400"># _data/products/sku002.yml</div>
        <div class="mt-2">sku: "sku002"</div>
        <div>price: 49.99</div>
        <div>currency: "USD"</div>
        <div>image: /assets/img/products/sku002.jpg</div>
        <div>tags: [electronics]</div>
        <div>categories: [technology]</div>
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
        Then run <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">npm run build</code>. Product pages are auto-generated.
      </p>
    </div>

    <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h3 class="font-bold text-lg mb-3 flex items-center gap-2">
        <span class="text-xl">🌍</span>
        Add New Language
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
        <li>Add language code to <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">languages</code> array in <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_config.yml</code></li>
        <li>Create <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_data/i18n/{lang}.yml</code> (UI translations)</li>
        <li>Create <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_data/slides/{lang}.yml</code> (slider content)</li>
        <li>Create <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_pages/{lang}/</code> folder and add pages</li>
        <li>Create <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">_posts/{lang}/</code> folder</li>
      </ol>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-3">
        hreflang tags and language switcher automatically detect the new language.
      </p>
    </div>
  </div>
</section>

<section id="deployment" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">5</span>
    Deployment
  </h2>

  <div class="space-y-4">
    <p class="text-slate-600 dark:text-slate-400">Push your changes to GitHub:</p>
    
    <div class="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm">
      <div class="text-slate-400"># Build</div>
      <div>npm run build</div>
      <div class="mt-3 text-slate-400"># Commit and push</div>
      <div>git add -A</div>
      <div>git commit -m "content update"</div>
      <div>git push</div>
    </div>

    <div class="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
      <div class="flex gap-3">
        {% include icon.html name="check-circle" class="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" %}
        <div class="text-sm">
          <strong class="text-green-800 dark:text-green-200">Automatic deployment:</strong>
          <span class="text-green-700 dark:text-green-300">GitHub Pages automatically runs Jekyll after push and updates the site.</span>
        </div>
      </div>
    </div>

    <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">GitHub Pages Settings</h4>
      <ol class="list-decimal list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
        <li>On GitHub: repo → Settings → Pages</li>
        <li>Source: "Deploy from a branch"</li>
        <li>Branch: main (or master)</li>
        <li>Folder: / (root)</li>
      </ol>
    </div>
  </div>
</section>

<section id="customization" class="mb-12">
  <h2 class="text-2xl font-bold font-heading mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-full bg-jam-primary text-white flex items-center justify-center text-sm font-bold">6</span>
    Customization
  </h2>

  <div class="grid gap-4 md:grid-cols-2">
    <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">Colors</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Edit the <code>@theme</code> block in <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">src/app.css</code>.
      </p>
    </div>
    <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">Site Info</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Update title, description, url in <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">_config.yml</code>.
      </p>
    </div>
    <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">Navbar/Footer</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Edit <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">_includes/navbar.html</code> and <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">footer.html</code>.
      </p>
    </div>
    <div class="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <h4 class="font-semibold mb-2">Components</h4>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Edit Svelte files in <code class="px-1 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">src/components/</code>.
      </p>
    </div>
  </div>
</section>

<div class="mt-16 p-8 rounded-2xl bg-gradient-to-br from-jam-primary/10 to-jam-secondary/10 dark:from-jam-primary/20 dark:to-jam-secondary/20 text-center">
  <h3 class="text-xl font-bold mb-2">Need help?</h3>
  <p class="text-slate-600 dark:text-slate-400 mb-4">For detailed documentation and examples</p>
  <div class="flex flex-wrap justify-center gap-3">
    <a href="{{ site.baseurl }}/en/features/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium hover:border-jam-primary transition-colors">
      {% include icon.html name="list" class="w-4 h-4" %}
      Features
    </a>
    <a href="{{ site.baseurl }}/en/about/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium hover:border-jam-primary transition-colors">
      {% include icon.html name="info" class="w-4 h-4" %}
      About
    </a>
  </div>
</div>

</div>
