<svelte:options customElement={{ tag: "jam-favorites-list", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte";
  import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte";
  import IconImageRegular from "phosphor-icons-svelte/IconImageRegular.svelte";

  let {
    empty_text = "No favorites yet",
    clear_text = "Clear all",
    clear_confirm = "Clear all favorites?"
  } = $props();

  let favorites = $state([]);

  const STORAGE_KEY = "jam_favorites";

  function loadFavorites() {
    try {
      favorites = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      favorites = [];
    }
  }

  onMount(() => {
    loadFavorites();

    const handler = () => loadFavorites();
    window.addEventListener("jam:favorites-updated", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("jam:favorites-updated", handler);
      window.removeEventListener("storage", handler);
    };
  });

  function remove(id) {
    favorites = favorites.filter((f) => f.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new CustomEvent("jam:favorites-updated", { detail: { favorites } }));
  }

  function clearAll() {
    if (confirm(clear_confirm)) {
      favorites = [];
      localStorage.setItem(STORAGE_KEY, "[]");
      window.dispatchEvent(new CustomEvent("jam:favorites-updated", { detail: { favorites: [] } }));
    }
  }
</script>

<div class="jam-favorites-list">
  {#if favorites.length === 0}
    <div class="text-center py-12 text-slate-500 dark:text-slate-400">
      <IconHeartRegular class="w-16 h-16 mx-auto mb-4 opacity-50" />
      <p>{empty_text}</p>
    </div>
  {:else}
    <div class="flex justify-end mb-4">
      <button
        onclick={clearAll}
        class="text-sm text-red-500 hover:text-red-600 transition-colors"
      >
        {clear_text}
      </button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each favorites as item (item.id)}
        <div class="relative group bg-white dark:bg-slate-800 rounded-xl border border-jam-border dark:border-jam-border-dark overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <a href={item.url} class="block">
            {#if item.image}
              <img src={item.image} alt={item.title} class="w-full h-40 object-cover" />
            {:else}
              <div class="w-full h-40 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <IconImageRegular class="w-12 h-12 text-slate-400" />
              </div>
            {/if}
            <div class="p-4">
              <h3 class="font-semibold text-jam-text dark:text-jam-text-dark line-clamp-1">{item.title}</h3>
              {#if item.price}
                <p class="text-jam-primary font-bold mt-1">{item.price}</p>
              {/if}
            </div>
          </a>
          <button
            onclick={() => remove(item.id)}
            class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center
                   bg-white/90 dark:bg-slate-800/90 rounded-full
                   text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100
                   transition-all shadow"
            aria-label="Remove from favorites"
          >
            <IconXRegular class="w-4 h-4" />
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>
