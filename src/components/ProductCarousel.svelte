<svelte:options customElement={{ tag: "jam-product-carousel", shadow: "none",
  props: { dataProducts: { reflect: true, attribute: "data-products" },
           autoplay: { reflect: true, attribute: "autoplay" },
           label: { reflect: true, attribute: "label" } }
}} />

<script>
  let { dataProducts = "[]", autoplay = "0", label = "" } = $props();
  let products = $derived(JSON.parse(dataProducts));

  let trackEl;
  let currentPage = $state(0);
  let isDragging = $state(false);
  let startX = 0;
  let startScroll = 0;
  let interval;

  let perView = $state(3);

  function updatePerView() {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    if (w < 640) perView = 1;
    else if (w < 1024) perView = 2;
    else perView = 3;
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
    const cardWidth = trackEl.scrollWidth / products.length;
    trackEl.scrollTo({ left: currentPage * perView * cardWidth, behavior: "smooth" });
  }

  function handleScroll() {
    if (!trackEl || isDragging) return;
    const cardWidth = trackEl.scrollWidth / products.length;
    const page = Math.round(trackEl.scrollLeft / (perView * cardWidth));
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
    const ms = parseInt(autoplay);
    if (ms > 0 && products.length > perView) {
      interval = setInterval(next, ms);
      return () => clearInterval(interval);
    }
  });
</script>

{#if products.length > 0}
<div class="relative group/carousel">
  {#if label}
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-xl font-bold text-jam-text dark:text-jam-text-dark">{label}</h3>
      {#if totalPages > 1}
        <div class="flex items-center gap-1.5">
          {#each Array(totalPages) as _, i}
            <button onclick={() => goTo(i)}
              aria-label="Page {i + 1}"
              class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
                     {i === currentPage ? 'bg-jam-primary w-6' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'}">
            </button>
          {/each}
        </div>
      {/if}
    </div>
  {/if}

  <!-- Carousel Track -->
  <div bind:this={trackEl}
    class="flex gap-4 overflow-x-auto scroll-smooth pb-2"
    style="scrollbar-width: none; -ms-overflow-style: none; scroll-snap-type: x mandatory;"
    onscroll={handleScroll}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointerleave={handlePointerUp}
    role="list">

    {#each products as product, i}
      <a href={product.link}
        class="shrink-0 scroll-snap-align-start rounded-xl overflow-hidden
               bg-white dark:bg-slate-800 border border-jam-border dark:border-jam-border-dark
               shadow-sm hover:shadow-lg transition-shadow duration-300 block no-underline
               w-[calc(100%-1rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
        style="scroll-snap-align: start;">

        <!-- Image -->
        <div class="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-700 relative">
          {#if product.image}
            <img src={product.image} alt={product.title}
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          {:else}
            <div class="w-full h-full flex flex-col items-center justify-center
                        bg-gradient-to-br {product.gradient || 'from-jam-primary/80 to-jam-secondary/80'}">
              <svg class="w-16 h-16 text-white/60 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              <span class="text-white/80 text-sm font-medium">{product.title}</span>
            </div>
          {/if}
          {#if product.badge}
            <span class="absolute top-3 left-3 bg-jam-accent text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              {product.badge}
            </span>
          {/if}
        </div>

        <!-- Info -->
        <div class="p-4">
          <h4 class="font-semibold text-base text-jam-text dark:text-jam-text-dark mb-1 truncate">
            {product.title}
          </h4>
          {#if product.description}
            <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">{product.description}</p>
          {/if}
          <div class="flex items-center justify-between">
            <span class="text-jam-primary font-bold text-lg">{product.price}</span>
            {#if product.tags && product.tags.length > 0}
              <div class="flex gap-1">
                {#each product.tags.slice(0, 2) as tag}
                  <span class="px-2 py-0.5 text-[10px] bg-jam-accent/10 text-jam-accent rounded-full">{tag}</span>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </a>
    {/each}
  </div>

  <!-- Navigation Arrows -->
  {#if products.length > perView}
    <button onclick={prev} aria-label="Previous"
      class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3
             w-10 h-10 rounded-full bg-white dark:bg-slate-800
             shadow-lg border border-jam-border dark:border-jam-border-dark
             flex items-center justify-center
             opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300
             hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer z-10">
      <svg class="w-5 h-5 text-jam-text dark:text-jam-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>
    <button onclick={next} aria-label="Next"
      class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3
             w-10 h-10 rounded-full bg-white dark:bg-slate-800
             shadow-lg border border-jam-border dark:border-jam-border-dark
             flex items-center justify-center
             opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300
             hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer z-10">
      <svg class="w-5 h-5 text-jam-text dark:text-jam-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>
  {/if}
</div>
{/if}
