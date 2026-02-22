<svelte:options customElement={{ tag: "jam-product-filter", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconFunnelRegular from "phosphor-icons-svelte/IconFunnelRegular.svelte";
  import IconCaretDownRegular from "phosphor-icons-svelte/IconCaretDownRegular.svelte";

  let {
    categories_label = "Categories",
    tags_label = "Tags",
    price_label = "Price Range",
    sort_label = "Sort by",
    clear_label = "Clear filters",
    sort_options = "name_asc:Name A-Z,name_desc:Name Z-A,price_asc:Price Low to High,price_desc:Price High to Low"
  } = $props();

  let products = $state([]);
  let filteredProducts = $state([]);
  let allCategories = $state([]);
  let allTags = $state([]);
  let minPrice = $state(0);
  let maxPrice = $state(1000);

  let selectedCategories = $state([]);
  let selectedTags = $state([]);
  let priceRange = $state([0, 1000]);
  let sortBy = $state("name_asc");
  let isOpen = $state(false);

  let sortOptionsList = [];

  onMount(() => {
    sortOptionsList = sort_options.split(",").map((o) => {
      const [value, label] = o.split(":");
      return { value, label };
    });

    const handler = (e) => {
      products = e.detail?.products || [];
      extractFilters();
      applyFilters();
    };

    window.addEventListener("jam:products-loaded", handler);

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("categories")) {
      selectedCategories = urlParams.get("categories")?.split(",") || [];
    }
    if (urlParams.has("tags")) {
      selectedTags = urlParams.get("tags")?.split(",") || [];
    }
    if (urlParams.has("sort")) {
      sortBy = urlParams.get("sort") || "name_asc";
    }

    return () => window.removeEventListener("jam:products-loaded", handler);
  });

  function extractFilters() {
    const cats = new Set();
    const tags = new Set();
    let min = Infinity;
    let max = -Infinity;

    for (const p of products) {
      if (p.categories) p.categories.forEach((c) => cats.add(c));
      if (p.tags) p.tags.forEach((t) => tags.add(t));
      if (p.priceNum) {
        min = Math.min(min, p.priceNum);
        max = Math.max(max, p.priceNum);
      }
    }

    allCategories = Array.from(cats).sort();
    allTags = Array.from(tags).sort();
    minPrice = min === Infinity ? 0 : min;
    maxPrice = max === -Infinity ? 1000 : max;
    priceRange = [minPrice, maxPrice];
  }

  function applyFilters() {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        p.categories?.some((c) => selectedCategories.includes(c))
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        p.tags?.some((t) => selectedTags.includes(t))
      );
    }

    result = result.filter(
      (p) => !p.priceNum || (p.priceNum >= priceRange[0] && p.priceNum <= priceRange[1])
    );

    result.sort((a, b) => {
      switch (sortBy) {
        case "name_asc":
          return (a.title || "").localeCompare(b.title || "");
        case "name_desc":
          return (b.title || "").localeCompare(a.title || "");
        case "price_asc":
          return (a.priceNum || 0) - (b.priceNum || 0);
        case "price_desc":
          return (b.priceNum || 0) - (a.priceNum || 0);
        default:
          return 0;
      }
    });

    filteredProducts = result;

    window.dispatchEvent(
      new CustomEvent("jam:products-filtered", { detail: { products: filteredProducts } })
    );

    updateURL();
  }

  function updateURL() {
    const params = new URLSearchParams();
    if (selectedCategories.length) params.set("categories", selectedCategories.join(","));
    if (selectedTags.length) params.set("tags", selectedTags.join(","));
    if (sortBy !== "name_asc") params.set("sort", sortBy);

    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    history.replaceState(null, "", newURL);
  }

  function toggleCategory(cat) {
    if (selectedCategories.includes(cat)) {
      selectedCategories = selectedCategories.filter((c) => c !== cat);
    } else {
      selectedCategories = [...selectedCategories, cat];
    }
    applyFilters();
  }

  function toggleTag(tag) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
    applyFilters();
  }

  function clearFilters() {
    selectedCategories = [];
    selectedTags = [];
    priceRange = [minPrice, maxPrice];
    sortBy = "name_asc";
    applyFilters();
  }

  $effect(() => {
    applyFilters();
  });

  let activeFiltersCount = $derived(
    selectedCategories.length + selectedTags.length + (sortBy !== "name_asc" ? 1 : 0)
  );
</script>

<div class="jam-product-filter">
  <!-- Mobile filter toggle -->
  <button
    onclick={() => isOpen = !isOpen}
    class="md:hidden w-full flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4"
  >
    <span class="flex items-center gap-2 text-sm font-medium text-jam-text dark:text-jam-text-dark">
      <IconFunnelRegular class="w-5 h-5" />
      Filters
      {#if activeFiltersCount > 0}
        <span class="w-5 h-5 flex items-center justify-center bg-jam-primary text-white text-xs rounded-full">{activeFiltersCount}</span>
      {/if}
    </span>
    <IconCaretDownRegular class="w-5 h-5 text-slate-500 transition-transform {isOpen ? 'rotate-180' : ''}" />
  </button>

  <!-- Filter panel -->
  <div class="space-y-6 {isOpen ? 'block' : 'hidden md:block'}">
    <!-- Sort -->
    <div>
      <label class="block text-sm font-medium text-jam-text dark:text-jam-text-dark mb-2">{sort_label}</label>
      <select
        bind:value={sortBy}
        onchange={applyFilters}
        class="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-jam-border dark:border-jam-border-dark rounded-lg text-sm"
      >
        {#each sortOptionsList as opt}
          <option value={opt.value}>{opt.label}</option>
        {/each}
      </select>
    </div>

    <!-- Categories -->
    {#if allCategories.length > 0}
      <div>
        <h4 class="text-sm font-medium text-jam-text dark:text-jam-text-dark mb-3">{categories_label}</h4>
        <div class="space-y-2">
          {#each allCategories as cat}
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onchange={() => toggleCategory(cat)}
                class="w-4 h-4 rounded border-slate-300 text-jam-primary focus:ring-jam-primary"
              />
              <span class="text-sm text-slate-600 dark:text-slate-400">{cat}</span>
            </label>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Tags -->
    {#if allTags.length > 0}
      <div>
        <h4 class="text-sm font-medium text-jam-text dark:text-jam-text-dark mb-3">{tags_label}</h4>
        <div class="flex flex-wrap gap-2">
          {#each allTags as tag}
            <button
              onclick={() => toggleTag(tag)}
              class="px-3 py-1 text-xs rounded-full transition-colors
                     {selectedTags.includes(tag)
                       ? 'bg-jam-accent text-white'
                       : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-jam-accent/10'}"
            >
              {tag}
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Clear filters -->
    {#if activeFiltersCount > 0}
      <button
        onclick={clearFilters}
        class="w-full py-2 text-sm text-red-500 hover:text-red-600 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        {clear_label}
      </button>
    {/if}
  </div>
</div>
