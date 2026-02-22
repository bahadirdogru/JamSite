<svelte:options customElement={{ tag: "jam-compare-bar", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconCaretDownRegular from "phosphor-icons-svelte/IconCaretDownRegular.svelte";
  import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte";
  import IconCubeRegular from "phosphor-icons-svelte/IconCubeRegular.svelte";

  let { compare_text = "Compare", clear_text = "Clear" } = $props();

  let items = $state([]);
  let isExpanded = $state(false);

  const STORAGE_KEY = "jam_compare";

  function load() {
    try {
      items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      items = [];
    }
  }

  onMount(() => {
    load();

    const handler = () => load();
    window.addEventListener("jam:compare-updated", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("jam:compare-updated", handler);
      window.removeEventListener("storage", handler);
    };
  });

  function remove(id) {
    items = items.filter((i) => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("jam:compare-updated", { detail: { items } }));
  }

  function clearAll() {
    items = [];
    localStorage.setItem(STORAGE_KEY, "[]");
    window.dispatchEvent(new CustomEvent("jam:compare-updated", { detail: { items: [] } }));
  }

  function compare() {
    isExpanded = true;
  }
</script>

{#if items.length > 0}
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-jam-border dark:border-jam-border-dark shadow-2xl transition-transform {isExpanded ? '' : 'translate-y-0'}">
    <!-- Mini bar -->
    {#if !isExpanded}
      <div class="flex items-center justify-between px-4 py-3 max-w-5xl mx-auto">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-jam-text dark:text-jam-text-dark">
            {items.length} items to compare
          </span>
          <div class="flex -space-x-2">
            {#each items.slice(0, 4) as item}
              <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 overflow-hidden">
                {#if item.image}
                  <img src={item.image} alt={item.title} class="w-full h-full object-cover" />
                {:else}
                  <div class="w-full h-full bg-gradient-to-br from-jam-primary to-jam-accent"></div>
                {/if}
              </div>
            {/each}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            onclick={clearAll}
            class="px-3 py-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors"
          >
            {clear_text}
          </button>
          <button
            onclick={compare}
            class="px-4 py-2 bg-jam-secondary text-white text-sm font-medium rounded-lg hover:bg-jam-secondary/90 transition-colors"
          >
            {compare_text}
          </button>
        </div>
      </div>
    {/if}

    <!-- Expanded comparison view -->
    {#if isExpanded}
      <div class="max-h-[70vh] overflow-auto">
        <div class="flex items-center justify-between px-4 py-3 border-b border-jam-border dark:border-jam-border-dark sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h3 class="font-bold text-jam-text dark:text-jam-text-dark">{compare_text}</h3>
          <button
            onclick={() => isExpanded = false}
            class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Minimize"
          >
            <IconCaretDownRegular class="w-5 h-5" />
          </button>
        </div>

        <div class="grid gap-4 p-4" style="grid-template-columns: repeat({items.length}, minmax(200px, 1fr))">
          {#each items as item (item.id)}
            <div class="relative bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <button
                onclick={() => remove(item.id)}
                class="absolute top-2 right-2 w-6 h-6 flex items-center justify-center
                       text-slate-400 hover:text-red-500 bg-white dark:bg-slate-900 rounded-full shadow"
                aria-label="Remove"
              >
                <IconXRegular class="w-4 h-4" />
              </button>

              {#if item.image}
                <img src={item.image} alt={item.title} class="w-full aspect-square object-cover rounded-lg mb-3" />
              {:else}
                <div class="w-full aspect-square bg-gradient-to-br from-jam-primary to-jam-accent rounded-lg mb-3 flex items-center justify-center">
                  <IconCubeRegular class="w-12 h-12 text-white/60" />
                </div>
              {/if}

              <h4 class="font-semibold text-jam-text dark:text-jam-text-dark text-sm line-clamp-2 mb-2">{item.title}</h4>
              <p class="text-jam-primary font-bold">{item.price}</p>

              <a
                href={item.url}
                class="block mt-3 text-center py-2 px-4 bg-jam-primary text-white text-sm font-medium rounded-lg hover:bg-jam-primary/90 transition-colors"
              >
                View
              </a>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
{/if}
