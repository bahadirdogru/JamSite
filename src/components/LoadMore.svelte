<svelte:options customElement={{ tag: "jam-load-more", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconSpinnerRegular from "phosphor-icons-svelte/IconSpinnerRegular.svelte";

  let {
    data_url = "",
    items_per_page = "6",
    load_more_text = "Load More",
    loading_text = "Loading...",
    no_more_text = "No more items",
    auto_load = "false",
    container_selector = ""
  } = $props();

  let allItems = $state([]);
  let displayedItems = $state([]);
  let isLoading = $state(false);
  let hasMore = $state(true);
  let currentPage = $state(0);
  let perPage = 6;
  let autoLoadEnabled = false;
  let observerEl;

  onMount(async () => {
    perPage = parseInt(items_per_page, 10) || 6;
    autoLoadEnabled = auto_load === "true";

    if (data_url) {
      await fetchData();
    }

    if (autoLoadEnabled && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            loadMore();
          }
        },
        { rootMargin: "100px" }
      );

      if (observerEl) observer.observe(observerEl);

      return () => observer.disconnect();
    }
  });

  async function fetchData() {
    try {
      isLoading = true;
      const response = await fetch(data_url);
      if (response.ok) {
        const data = await response.json();
        allItems = Array.isArray(data) ? data : data.items || [];
        loadMore();
      }
    } catch (err) {
      console.error("LoadMore fetch error:", err);
    } finally {
      isLoading = false;
    }
  }

  function loadMore() {
    if (!hasMore || isLoading) return;

    isLoading = true;

    const start = currentPage * perPage;
    const end = start + perPage;
    const newItems = allItems.slice(start, end);

    if (newItems.length > 0) {
      displayedItems = [...displayedItems, ...newItems];
      currentPage++;
    }

    if (end >= allItems.length) {
      hasMore = false;
    }

    isLoading = false;

    if (container_selector) {
      window.dispatchEvent(
        new CustomEvent("jam:items-loaded", {
          detail: { items: displayedItems, hasMore },
        })
      );
    }
  }
</script>

<div class="jam-load-more">
  {#if displayedItems.length > 0}
    <slot items={displayedItems}></slot>
  {/if}

  <div bind:this={observerEl} class="h-1"></div>

  {#if hasMore}
    <div class="flex justify-center mt-8">
      <button
        onclick={loadMore}
        disabled={isLoading}
        class="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium
               rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed
               flex items-center gap-2"
      >
        {#if isLoading}
          <IconSpinnerRegular class="w-5 h-5 animate-spin" />
          {loading_text}
        {:else}
          {load_more_text}
        {/if}
      </button>
    </div>
  {:else if displayedItems.length > 0}
    <p class="text-center text-slate-500 dark:text-slate-400 mt-8">{no_more_text}</p>
  {/if}
</div>


