<script>
  import IconCaretLeftLight from "phosphor-icons-svelte/IconCaretLeftLight.svelte";
  import IconCaretRightLight from "phosphor-icons-svelte/IconCaretRightLight.svelte";
  import IconShoppingCartSimpleBold from "phosphor-icons-svelte/IconShoppingCartSimpleBold.svelte";
  import IconMagnifyingGlassBold from "phosphor-icons-svelte/IconMagnifyingGlassBold.svelte";
  import IconCubeRegular from "phosphor-icons-svelte/IconCubeRegular.svelte";

  let { products = [], autoplay = 0, label = "" } = $props();

  let trackEl;
  let currentPage = $state(0);
  let isDragging = $state(false);
  let startX = 0;
  let startScroll = 0;
  let interval;

  let perView = $state(4);

  function updatePerView() {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    if (w < 640) perView = 2;
    else if (w < 1024) perView = 3;
    else perView = 4;
  }

  let totalPages = $derived(Math.max(1, Math.ceil(products.length / perView)));

  function goTo(page) {
    currentPage = Math.max(0, Math.min(page, totalPages - 1));
    scrollToPage();
  }

  function next() {
    goTo(currentPage >= totalPages - 1 ? 0 : currentPage + 1);
  }

  function prev() {
    goTo(currentPage <= 0 ? totalPages - 1 : currentPage - 1);
  }

  function scrollToPage() {
    if (!trackEl) return;
    const scrollWidth = trackEl.scrollWidth - trackEl.clientWidth;
    const targetScroll = (currentPage / (totalPages - 1 || 1)) * scrollWidth;
    trackEl.scrollTo({ left: targetScroll, behavior: "smooth" });
  }

  function handleScroll() {
    if (!trackEl || isDragging) return;
    const scrollPercent = trackEl.scrollLeft / (trackEl.scrollWidth - trackEl.clientWidth || 1);
    const page = Math.round(scrollPercent * (totalPages - 1));
    currentPage = Math.max(0, Math.min(page, totalPages - 1));
  }

  function handlePointerDown(e) {
    isDragging = true;
    startX = e.clientX;
    startScroll = trackEl.scrollLeft;
    trackEl.style.scrollSnapType = "none";
    trackEl.style.cursor = "grabbing";
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    trackEl.scrollLeft = startScroll - dx;
  }

  function handlePointerUp() {
    if (!isDragging) return;
    isDragging = false;
    trackEl.style.scrollSnapType = "";
    trackEl.style.cursor = "";
    handleScroll();
  }

  $effect(() => {
    updatePerView();
    const onResize = () => { updatePerView(); scrollToPage(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });

  $effect(() => {
    const ms = typeof autoplay === "number" ? autoplay : parseInt(autoplay);
    if (ms > 0 && products.length > perView) {
      interval = setInterval(next, ms);
      return () => clearInterval(interval);
    }
  });
</script>

{#if products.length > 0}
<div class="relative group/carousel py-8">
  <div class="flex items-center justify-between mb-8">
    {#if label}
      <h3 class="text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">{label}</h3>
    {/if}
    
    {#if totalPages > 1}
      <div class="flex items-center gap-2">
        <button onclick={prev} class="p-2 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <IconCaretLeftLight class="w-5 h-5" />
        </button>
        <button onclick={next} class="p-2 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
          <IconCaretRightLight class="w-5 h-5" />
        </button>
      </div>
    {/if}
  </div>

  <!-- Carousel Track -->
  <div bind:this={trackEl}
    class="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-1"
    style="scrollbar-width: none; -ms-overflow-style: none; scroll-snap-type: x mandatory;"
    onscroll={handleScroll}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointerleave={handlePointerUp}
    role="list">

    {#each products as product, i}
      <div class="shrink-0 scroll-snap-align-start w-[calc(50%-0.75rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] group/item">
        <div class="relative overflow-hidden bg-white dark:bg-slate-900 mb-4 rounded-lg shadow-sm group-hover/item:shadow-md transition-shadow duration-300">
          <!-- Image -->
          <a href={product.url} class="block aspect-[3/4] overflow-hidden">
            {#if product.img}
              <img src={product.img} alt={product.name}
                class="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
            {:else}
              <div class="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800">
                <IconCubeRegular class="w-12 h-12 text-slate-300" />
              </div>
            {/if}
          </a>

          <!-- Hover Actions -->
          <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 translate-y-12 group-hover/item:translate-y-0 transition-transform duration-300 px-4">
            <button class="bg-white text-slate-900 p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors">
              <IconShoppingCartSimpleBold class="w-5 h-5" />
            </button>
            <button class="bg-white text-slate-900 p-3 rounded-full shadow-lg hover:bg-slate-900 hover:text-white transition-colors">
              <IconMagnifyingGlassBold class="w-5 h-5" />
            </button>
          </div>

          <!-- Badges -->
          <div class="absolute top-3 left-3 flex flex-col gap-2">
            {#if product.is_new}
              <span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">NEW</span>
            {/if}
            {#if product.is_discounted}
              <span class="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm">%{Math.round((1 - product.price_sale/product.price_old)*100)} OFF</span>
            {/if}
          </div>
        </div>

        <!-- Info -->
        <div class="text-center">
          <a href={product.url} class="block mb-2 no-underline">
            <h4 class="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover/item:text-primary transition-colors line-clamp-2 min-h-[40px]">
              {product.name}
            </h4>
          </a>
          <div class="flex flex-col items-center">
            {#if product.price_old}
              <span class="text-xs text-slate-400 line-through mb-0.5">{product.price_old} TRY</span>
            {/if}
            <span class="text-base font-bold text-slate-900 dark:text-white">{product.price_sale} TRY</span>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
{/if}


