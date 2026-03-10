<svelte:options customElement={{ tag: "jam-search", shadow: "none",
  props: { lang: { reflect: true, attribute: "lang" },
           baseurl: { reflect: true, attribute: "baseurl" } }
}} />

<script>
  import lunr from "lunr";
  import stemmerSupport from "lunr-languages/lunr.stemmer.support.js";
  import tr from "lunr-languages/lunr.tr.js";
  import IconMagnifyingGlassRegular from "phosphor-icons-svelte/IconMagnifyingGlassRegular.svelte";
  
  stemmerSupport(lunr);
  tr(lunr);

  let { lang = "tr", baseurl = "" } = $props();
  let open = $state(false);
  let query = $state("");
  let results = $state([]);
  let index = $state(null);
  let docs = $state([]);
  let selectedIdx = $state(0);
  let inputEl;
  let modalEl;

  async function loadIndex() {
    if (index) return;
    try {
      const res = await fetch(`${baseurl}/search.json`);
      const data = await res.json();
      docs = data.filter(d => d.lang === lang);
      console.log("Search docs loaded:", docs.length, "for lang:", lang);
      index = lunr(function () {
        if (lang === "tr") this.use(lunr.tr);
        this.ref("url");
        this.field("title", { boost: 10 });
        this.field("content");
        this.field("tags", { boost: 5 });
        this.field("categories", { boost: 5 });
        docs.forEach(doc => {
          this.add({
            url: doc.url,
            title: doc.title || "",
            content: doc.content || "",
            tags: (doc.tags || []).join(" "),
            categories: (doc.categories || []).join(" ")
          });
        });
      });
      console.log("Lunr index built successfully");
    } catch (e) {
      console.error("Search index error:", e);
    }
  }

  function search(q) {
    if (!index || !q.trim()) { results = []; return; }
    try {
      const sanitized = q.trim().replace(/[+\-:^~*]/g, " ").trim();
      if (!sanitized) { results = []; return; }
      let hits = index.search(sanitized + "*");
      if (hits.length === 0) {
        hits = index.search(sanitized);
      }
      if (hits.length === 0) {
        hits = index.search("*" + sanitized + "*");
      }
      console.log("Search query:", sanitized, "hits:", hits.length);
      results = hits.slice(0, 10).map(h => docs.find(d => d.url === h.ref)).filter(Boolean);
    } catch (e) {
      console.error("Search error:", e);
      results = [];
    }
    selectedIdx = 0;
  }

  function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      toggle();
    }
    if (!open) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowDown") { e.preventDefault(); selectedIdx = Math.min(selectedIdx + 1, results.length - 1); }
    if (e.key === "ArrowUp") { e.preventDefault(); selectedIdx = Math.max(selectedIdx - 1, 0); }
    if (e.key === "Enter" && results[selectedIdx]) {
      window.location.href = results[selectedIdx].url;
    }
  }

  function toggle() { open ? close() : openModal(); }

  async function openModal() {
    open = true;
    await loadIndex();
    requestAnimationFrame(() => inputEl?.focus());
  }

  function close() {
    open = false;
    query = "";
    results = [];
  }

  $effect(() => { search(query); });
  $effect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  });

  const typeColors = {
    post: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    product: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    page: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
  };
</script>

<button onclick={openModal} aria-label="Search"
  class="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
  <IconMagnifyingGlassRegular class="w-5 h-5 text-slate-600 dark:text-slate-300" />
</button>

{#if open}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50" onclick={close}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div bind:this={modalEl}
    class="w-full max-w-xl mx-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
    onclick={(e) => e.stopPropagation()}>

    <div class="flex items-center gap-3 px-4 border-b border-slate-200 dark:border-slate-700">
      <IconMagnifyingGlassRegular class="w-5 h-5 text-slate-400 shrink-0" />
      <input bind:this={inputEl} bind:value={query} type="text" placeholder="Ara..."
        class="w-full py-4 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400" />
      <kbd class="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 rounded text-slate-500 shrink-0">ESC</kbd>
    </div>

    {#if query.trim() && results.length === 0}
      <div class="px-4 py-8 text-center text-slate-400">
        Sonuç bulunamadı
      </div>
    {/if}

    {#if results.length > 0}
      <ul class="max-h-80 overflow-y-auto py-2">
        {#each results as result, i}
          <li>
            <a href={result.url}
              class="flex items-center gap-3 px-4 py-3 transition-colors {i === selectedIdx ? 'bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}">
              <span class="px-2 py-0.5 text-xs rounded-full shrink-0 {typeColors[result.type] || typeColors.page}">
                {result.type}
              </span>
              <span class="text-slate-900 dark:text-slate-100 truncate">{result.title}</span>
            </a>
          </li>
        {/each}
      </ul>
    {/if}

    <div class="flex items-center gap-4 px-4 py-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-400">
      <span><kbd class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">↑↓</kbd> gezin</span>
      <span><kbd class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">↵</kbd> aç</span>
      <span><kbd class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded">esc</kbd> kapat</span>
    </div>
  </div>
</div>
{/if}


