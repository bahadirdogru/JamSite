<svelte:options customElement={{ tag: "jam-stories", shadow: "none",
  props: { dataItems: { reflect: true, attribute: "data-items" },
           duration: { reflect: true, attribute: "duration" },
           label: { reflect: true, attribute: "label" },
           viewText: { reflect: true, attribute: "view-text" } }
}} />

<script>
  import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte";
  import IconCaretLeftRegular from "phosphor-icons-svelte/IconCaretLeftRegular.svelte";
  import IconCaretRightRegular from "phosphor-icons-svelte/IconCaretRightRegular.svelte";
  import IconCubeRegular from "phosphor-icons-svelte/IconCubeRegular.svelte";
  import IconArrowRightRegular from "phosphor-icons-svelte/IconArrowRightRegular.svelte";

  let { dataItems = "[]", duration = "4000", label = "", viewText = "Görüntüle" } = $props();
  let categories = $derived(JSON.parse(dataItems));

  let viewerOpen = $state(false);
  let activeCat = $state(0);
  let activeProduct = $state(0);
  let progress = $state(0);
  let paused = $state(false);
  let pausedProgress = 0;
  let raf = null;
  let startTime = 0;

  let currentProducts = $derived(categories[activeCat]?.products || []);

  function openStory(catIndex) {
    activeCat = catIndex;
    activeProduct = 0;
    progress = 0;
    viewerOpen = true;
    paused = false;
    document.body.style.overflow = "hidden";
    startProgress();
  }

  function closeViewer() {
    viewerOpen = false;
    stopProgress();
    progress = 0;
    document.body.style.overflow = "";
  }

  function nextSlide() {
    stopProgress();
    if (activeProduct < currentProducts.length - 1) {
      activeProduct++;
      progress = 0;
      startProgress();
    } else if (activeCat < categories.length - 1) {
      activeCat++;
      activeProduct = 0;
      progress = 0;
      startProgress();
    } else {
      closeViewer();
    }
  }

  function prevSlide() {
    stopProgress();
    if (progress > 0.15) {
      progress = 0;
      startProgress();
    } else if (activeProduct > 0) {
      activeProduct--;
      progress = 0;
      startProgress();
    } else if (activeCat > 0) {
      activeCat--;
      activeProduct = (categories[activeCat]?.products?.length || 1) - 1;
      progress = 0;
      startProgress();
    }
  }

  function startProgress() {
    const ms = parseInt(duration);
    if (ms <= 0) return;
    startTime = performance.now();
    pausedProgress = 0;
    function tick(now) {
      if (!viewerOpen || paused) return;
      const elapsed = now - startTime;
      progress = Math.min((pausedProgress * ms + elapsed) / ms, 1);
      if (progress >= 1) { nextSlide(); return; }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
  }

  function stopProgress() {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  function handlePause() {
    paused = true;
    pausedProgress = progress;
    stopProgress();
  }

  function handleResume() {
    paused = false;
    startTime = performance.now();
    const ms = parseInt(duration);
    function tick(now) {
      if (!viewerOpen || paused) return;
      const elapsed = now - startTime;
      progress = Math.min(pausedProgress + elapsed / ms, 1);
      if (progress >= 1) { nextSlide(); return; }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
  }

  function handleViewerClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.3) prevSlide();
    else if (x > rect.width * 0.7) nextSlide();
  }

  function handleKeydown(e) {
    if (!viewerOpen) return;
    if (e.key === "Escape") closeViewer();
    else if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  }

  $effect(() => {
    if (viewerOpen) {
      window.addEventListener("keydown", handleKeydown);
      return () => window.removeEventListener("keydown", handleKeydown);
    }
  });

  $effect(() => {
    return () => { stopProgress(); document.body.style.overflow = ""; };
  });
</script>

{#if categories.length > 0}
<div>
  {#if label}
    <h3 class="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">{label}</h3>
  {/if}

  <!-- Category Bubbles -->
  <div class="flex gap-4 overflow-x-auto pb-3" style="scrollbar-width: none; -ms-overflow-style: none;">
    {#each categories as cat, i}
      <button onclick={() => openStory(i)}
        class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
        <div class="w-[72px] h-[72px] rounded-full p-[3px] bg-gradient-to-br from-accent via-rose-500 to-primary">
          <div class="w-full h-full rounded-full overflow-hidden border-[3px] border-white dark:border-slate-900">
            <div class="w-full h-full flex items-center justify-center text-white text-lg font-bold
                        bg-gradient-to-br {cat.gradient || 'from-primary to-secondary'}">
              {#if cat.icon}
                <span class="text-2xl">{cat.icon}</span>
              {:else}
                {cat.title?.charAt(0) || "?"}
              {/if}
            </div>
          </div>
        </div>
        <span class="text-[11px] text-slate-600 dark:text-slate-400 max-w-[72px] truncate text-center leading-tight">
          {cat.title}
        </span>
        {#if cat.products?.length}
          <span class="text-[10px] text-slate-400 dark:text-slate-500 -mt-1">{cat.products.length}</span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<!-- Fullscreen Viewer -->
{#if viewerOpen && currentProducts.length > 0}
  {@const product = currentProducts[activeProduct]}
  <div class="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
       role="dialog" aria-modal="true" aria-label="Category story viewer">

    <!-- Progress Bars (one per product in current category) -->
    <div class="absolute top-0 left-0 right-0 z-50 flex gap-1 p-3 pt-4">
      {#each currentProducts as _, i}
        <div class="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden">
          <div class="h-full bg-white rounded-full transition-none"
            style="width: {i < activeProduct ? '100' : i === activeProduct ? progress * 100 : '0'}%">
          </div>
        </div>
      {/each}
    </div>

    <!-- Header: category info -->
    <div class="absolute top-8 left-0 right-0 z-50 flex items-center justify-between px-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full overflow-hidden border border-white/30 shrink-0
                    flex items-center justify-center text-white text-sm font-bold
                    bg-gradient-to-br {categories[activeCat]?.gradient || 'from-primary to-secondary'}">
          {#if categories[activeCat]?.icon}
            <span class="text-base">{categories[activeCat].icon}</span>
          {:else}
            {categories[activeCat]?.title?.charAt(0) || ""}
          {/if}
        </div>
        <span class="text-white text-sm font-medium drop-shadow">{categories[activeCat]?.title}</span>
        <span class="text-white/50 text-xs">{activeProduct + 1}/{currentProducts.length}</span>
      </div>
      <button onclick={closeViewer} aria-label="Close"
        class="text-white/80 hover:text-white p-1 cursor-pointer">
        <IconXRegular class="w-6 h-6" />
      </button>
    </div>

    <!-- Product Content -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="absolute inset-0 flex items-center justify-center"
         onclick={handleViewerClick}
         onpointerdown={handlePause}
         onpointerup={handleResume}
         role="button" tabindex="-1">

      {#if product.image}
        <img src={product.image} alt={product.title || ""}
          class="max-w-full max-h-full object-contain" />
      {:else}
        <div class="w-full h-full flex items-center justify-center pb-48
                    bg-gradient-to-br {product.gradient || categories[activeCat]?.gradient || 'from-primary to-secondary'}">
          <div class="w-32 h-32 rounded-3xl bg-white/15 backdrop-blur flex items-center justify-center">
            <IconCubeRegular class="w-16 h-16 text-white/60" />
          </div>
        </div>
      {/if}
    </div>

    <!-- Bottom Product Card -->
    <div class="absolute bottom-0 left-0 right-0 z-50 p-5
                bg-gradient-to-t from-black/90 via-black/60 to-transparent">
      <div class="max-w-lg mx-auto">
        <h3 class="text-white font-bold text-lg mb-1">{product.title}</h3>
        {#if product.description}
          <p class="text-white/70 text-sm mb-2 line-clamp-2">{product.description}</p>
        {/if}
        <div class="flex items-center justify-between mt-3">
          {#if product.price}
            <span class="text-white font-bold text-xl">{product.price}</span>
          {/if}
          {#if product.link}
            <a href={product.link}
               onclick={(e) => e.stopPropagation()}
               class="inline-flex items-center gap-2 bg-white text-slate-900 font-medium text-sm px-5 py-2.5 rounded-full
                      hover:bg-white/90 transition-colors">
              {viewText}
              <IconArrowRightRegular class="w-4 h-4" />
            </a>
          {/if}
        </div>
        {#if product.tags?.length}
          <div class="flex gap-1.5 mt-3">
            {#each product.tags.slice(0, 3) as tag}
              <span class="px-2 py-0.5 text-[11px] bg-white/15 text-white/80 rounded-full">{tag}</span>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- Side Navigation -->
    <div class="absolute left-3 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      {#if activeProduct > 0 || activeCat > 0}
        <button onclick={prevSlide} aria-label="Previous"
          class="text-white/50 hover:text-white p-2 cursor-pointer transition-colors">
          <IconCaretLeftRegular class="w-8 h-8" />
        </button>
      {/if}
    </div>
    <div class="absolute right-3 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      {#if activeProduct < currentProducts.length - 1 || activeCat < categories.length - 1}
        <button onclick={nextSlide} aria-label="Next"
          class="text-white/50 hover:text-white p-2 cursor-pointer transition-colors">
          <IconCaretRightRegular class="w-8 h-8" />
        </button>
      {/if}
    </div>
  </div>
{/if}
{/if}


