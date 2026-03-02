<script>
  import ErrorBoundary from "./ErrorBoundary.svelte";
  /** Client-side filter and sort for product list. Receives productsJson (string) and base/langPrefix for links. */
  let {
    productsJson = "[]",
    base = "",
    langPrefix = "",
    loadMoreLabel = "Daha fazla",
    errorMessage = "Bir hata oluştu.",
    retryLabel = "Tekrar dene",
    sortLabel = "Sırala",
    sortNameAsc = "Ad A-Z",
    sortNameDesc = "Ad Z-A",
    sortPriceAsc = "Fiyat (düşük-yüksek)",
    sortPriceDesc = "Fiyat (yüksek-düşük)",
    categoriesLabel = "Kategoriler",
    tagsLabel = "Etiketler",
    clearLabel = "Temizle",
  } = $props();

  let products = $state([]);
  let sortBy = $state("name_asc");
  let selectedCategories = $state([]);
  let selectedTags = $state([]);

  $effect(() => {
    try {
      products = JSON.parse(productsJson);
    } catch {
      products = [];
    }
  });

  const allCategories = $derived(
    [...new Set(products.flatMap(({ product }) => product.categories || []))].sort()
  );
  const allTags = $derived(
    [...new Set(products.flatMap(({ product }) => product.tags || []))].sort()
  );

  const filteredAndSorted = $derived.by(() => {
    let list = [...products];
    const lang = langPrefix === "/en" ? "en" : "tr";
    list = list.filter(({ product, info }) => {
      if (!info) return false;
      if (selectedCategories.length && !(product.categories || []).some((c) => selectedCategories.includes(c)))
        return false;
      if (selectedTags.length && !(product.tags || []).some((t) => selectedTags.includes(t))) return false;
      return true;
    });
    const priceNum = (p) => parseFloat(String(p.product?.price || 0).replace(/[^\d.-]/g, "")) || 0;
    list.sort((a, b) => {
      const ta = a.info?.title ?? "";
      const tb = b.info?.title ?? "";
      switch (sortBy) {
        case "name_asc":
          return ta.localeCompare(tb);
        case "name_desc":
          return tb.localeCompare(ta);
        case "price_asc":
          return priceNum(a) - priceNum(b);
        case "price_desc":
          return priceNum(b) - priceNum(a);
        default:
          return 0;
      }
    });
    return list;
  });

  function toggleCategory(cat) {
    selectedCategories = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
  }

  function toggleTag(tag) {
    selectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
  }

  function clearFilters() {
    selectedCategories = [];
    selectedTags = [];
    sortBy = "name_asc";
  }

  const hasFilters = $derived(
    selectedCategories.length > 0 || selectedTags.length > 0 || sortBy !== "name_asc"
  );

  let visibleCount = $state(9);
  const displayList = $derived(filteredAndSorted.slice(0, visibleCount));
  const hasMore = $derived(visibleCount < filteredAndSorted.length);

</script>

<ErrorBoundary message={errorMessage} retryLabel={retryLabel}>
<div class="space-y-6">
  <div class="flex flex-wrap items-center gap-4">
    <label class="flex items-center gap-2 text-sm font-medium text-jam-text dark:text-jam-text-dark">
      {sortLabel}
      <select
        bind:value={sortBy}
        class="ml-2 px-3 py-2 bg-white dark:bg-slate-800 border border-jam-border dark:border-jam-border-dark rounded-lg text-sm"
      >
        <option value="name_asc">{sortNameAsc}</option>
        <option value="name_desc">{sortNameDesc}</option>
        <option value="price_asc">{sortPriceAsc}</option>
        <option value="price_desc">{sortPriceDesc}</option>
      </select>
    </label>
    {#if allCategories.length > 0}
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm text-slate-500 dark:text-slate-400">{categoriesLabel}:</span>
        {#each allCategories as cat}
          <button
            type="button"
            onclick={() => toggleCategory(cat)}
            class="px-2.5 py-1 text-xs rounded-full transition-colors
              {selectedCategories.includes(cat)
                ? 'bg-jam-primary text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-jam-primary/10'}"
          >
            {cat}
          </button>
        {/each}
      </div>
    {/if}
    {#if allTags.length > 0}
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-sm text-slate-500 dark:text-slate-400">{tagsLabel}:</span>
        {#each allTags as tag}
          <button
            type="button"
            onclick={() => toggleTag(tag)}
            class="px-2.5 py-1 text-xs rounded-full transition-colors
              {selectedTags.includes(tag)
                ? 'bg-jam-accent text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-jam-accent/10'}"
          >
            {tag}
          </button>
        {/each}
      </div>
    {/if}
    {#if hasFilters}
      <button
        type="button"
        onclick={clearFilters}
        class="text-sm text-red-500 hover:text-red-600 dark:text-red-400"
      >
        {clearLabel}
      </button>
    {/if}
  </div>

  <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each displayList as { product, info }}
      <li>
        <a
          href="{base}{langPrefix}/products/{info.slug}/"
          class="block p-4 rounded-xl border border-jam-border dark:border-jam-border-dark hover:border-jam-primary transition-colors"
        >
          {#if product.image}
            <img
              src={product.image}
              alt={info.title}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              class="w-full aspect-square object-cover rounded-lg mb-3"
            />
          {:else}
            <div class="w-full aspect-square rounded-lg bg-slate-200 dark:bg-slate-700 mb-3"></div>
          {/if}
          <h2 class="font-semibold text-lg text-jam-text dark:text-jam-text-dark">{info.title}</h2>
          <p class="text-jam-primary font-bold mt-1">{product.price} {product.currency}</p>
        </a>
      </li>
    {/each}
  </ul>
  {#if hasMore}
    <div class="flex justify-center pt-8">
      <button
        type="button"
        onclick={() => (visibleCount = visibleCount + 9)}
        class="px-6 py-3 rounded-lg font-medium bg-jam-primary text-white hover:bg-blue-600 transition-colors"
      >
        {loadMoreLabel}
      </button>
    </div>
  {/if}
</div>
</ErrorBoundary>
