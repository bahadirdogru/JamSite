<script>
  import Fuse from "fuse.js";
  import IconMagnifyingGlassRegular from "phosphor-icons-svelte/IconMagnifyingGlassRegular.svelte";

  let { lang = "tr", baseurl = "", placeholder = "Ara...", noResultsText = "Sonuç bulunamadı" } = $props();

  let open = $state(false);
  let query = $state("");
  let results = $state([]);
  let index = $state([]);
  let fuse = $state(null);
  let selectedIdx = $state(0);
  let inputEl = $state();

  async function loadIndex() {
    if (index.length > 0) return;
    try {
      const res = await fetch(`${baseurl}/search-index.json`);
      const data = await res.json();
      index = data.filter((d) => d.lang === lang);
      fuse = new Fuse(index, {
        keys: ["title", "description", "content"],
        threshold: 0.4,
        includeMatches: false,
      });
    } catch (e) {
      console.error("Search index error:", e);
    }
  }

  function search(q) {
    if (!fuse || !q.trim()) {
      results = [];
      return;
    }
    const found = fuse.search(q.trim());
    results = found.slice(0, 10).map((r) => r.item);
    selectedIdx = 0;
  }

  function handleKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      toggle();
    }
    if (!open) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIdx = Math.min(selectedIdx + 1, results.length - 1);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIdx = Math.max(selectedIdx - 1, 0);
    }
    if (e.key === "Enter" && results[selectedIdx]) {
      window.location.href = results[selectedIdx].url;
    }
  }

  function toggle() {
    if (open) close();
    else openModal();
  }

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

  $effect(() => {
    search(query);
  });

  $effect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  });

  const typeColors = {
    post: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    product: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    page: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  };
</script>

<button
  onclick={openModal}
  aria-label="Search"
  class="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
>
  <IconMagnifyingGlassRegular class="w-5 h-5 text-slate-600 dark:text-slate-300" />
</button>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50" onclick={close}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="w-full max-w-xl mx-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
      onclick={(e) => e.stopPropagation()}
    >
      <div class="flex items-center gap-3 px-4 border-b border-slate-200 dark:border-slate-700">
        <IconMagnifyingGlassRegular class="w-5 h-5 text-slate-400 shrink-0" />
        <input
          bind:this={inputEl}
          bind:value={query}
          type="text"
          placeholder={placeholder}
          class="w-full py-4 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
        />
        <kbd class="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 rounded text-slate-500 shrink-0">ESC</kbd>
      </div>

      {#if query.trim() && results.length === 0}
        <div class="px-4 py-8 text-center text-slate-400">
          {noResultsText}
        </div>
      {/if}

      {#if results.length > 0}
        <ul class="max-h-80 overflow-y-auto py-2">
          {#each results as result, i}
            <li>
              <a
                href={result.url}
                class="flex items-center gap-3 px-4 py-3 transition-colors {i === selectedIdx ? 'bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}"
              >
                <span
                  class="px-2 py-0.5 text-xs rounded-full shrink-0 {typeColors[result.type] ?? typeColors.page}"
                >
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


