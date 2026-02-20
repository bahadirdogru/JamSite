<svelte:options customElement={{ tag: "jam-stories", shadow: "none",
  props: { dataItems: { reflect: true, attribute: "data-items" },
           duration: { reflect: true, attribute: "duration" },
           label: { reflect: true, attribute: "label" } }
}} />

<script>
  let { dataItems = "[]", duration = "5000", label = "" } = $props();
  let items = $derived(JSON.parse(dataItems));
  let viewerOpen = $state(false);
  let activeIndex = $state(0);
  let progress = $state(0);
  let timer = null;
  let raf = null;
  let startTime = 0;
  let paused = $state(false);
  let pausedProgress = 0;

  function openStory(index) {
    activeIndex = index;
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

  function nextStory() {
    stopProgress();
    if (activeIndex < items.length - 1) {
      activeIndex++;
      progress = 0;
      startProgress();
    } else {
      closeViewer();
    }
  }

  function prevStory() {
    stopProgress();
    if (progress > 0.2) {
      progress = 0;
      startProgress();
    } else if (activeIndex > 0) {
      activeIndex--;
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
      if (progress >= 1) {
        nextStory();
        return;
      }
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
      if (progress >= 1) {
        nextStory();
        return;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
  }

  function handleViewerClick(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.3) {
      prevStory();
    } else if (x > rect.width * 0.7) {
      nextStory();
    }
  }

  function handleKeydown(e) {
    if (!viewerOpen) return;
    if (e.key === "Escape") closeViewer();
    else if (e.key === "ArrowRight") nextStory();
    else if (e.key === "ArrowLeft") prevStory();
  }

  $effect(() => {
    if (viewerOpen) {
      window.addEventListener("keydown", handleKeydown);
      return () => window.removeEventListener("keydown", handleKeydown);
    }
  });

  $effect(() => {
    return () => {
      stopProgress();
      document.body.style.overflow = "";
    };
  });
</script>

{#if items.length > 0}
<div>
  {#if label}
    <h3 class="text-lg font-semibold mb-3 text-jam-text dark:text-jam-text-dark">{label}</h3>
  {/if}

  <!-- Story Bubbles -->
  <div class="flex gap-4 overflow-x-auto pb-3 scrollbar-hide" style="scrollbar-width: none; -ms-overflow-style: none;">
    {#each items as item, i}
      <button onclick={() => openStory(i)}
        class="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
        <div class="w-[72px] h-[72px] rounded-full p-[3px] bg-gradient-to-br from-jam-accent via-rose-500 to-jam-primary
                    {i <= activeIndex && !viewerOpen ? 'opacity-50' : ''}">
          <div class="w-full h-full rounded-full overflow-hidden border-[3px] border-white dark:border-jam-surface-dark">
            {#if item.image}
              <img src={item.image} alt={item.title}
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200" />
            {:else}
              <div class="w-full h-full flex items-center justify-center text-white text-lg font-bold
                          bg-gradient-to-br {item.gradient || 'from-jam-primary to-jam-secondary'}">
                {item.title?.charAt(0) || "?"}
              </div>
            {/if}
          </div>
        </div>
        <span class="text-[11px] text-slate-600 dark:text-slate-400 max-w-[72px] truncate text-center leading-tight">
          {item.title}
        </span>
      </button>
    {/each}
  </div>
</div>

<!-- Fullscreen Viewer -->
{#if viewerOpen}
  <div class="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
       role="dialog" aria-modal="true" aria-label="Story viewer">

    <!-- Progress Bars -->
    <div class="absolute top-0 left-0 right-0 z-50 flex gap-1 p-3 pt-4">
      {#each items as _, i}
        <div class="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden">
          <div class="h-full bg-white rounded-full transition-none"
            style="width: {i < activeIndex ? '100' : i === activeIndex ? progress * 100 : '0'}%">
          </div>
        </div>
      {/each}
    </div>

    <!-- Header -->
    <div class="absolute top-8 left-0 right-0 z-50 flex items-center justify-between px-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full overflow-hidden border border-white/30 shrink-0">
          {#if items[activeIndex]?.image}
            <img src={items[activeIndex].image} alt="" class="w-full h-full object-cover" />
          {:else}
            <div class="w-full h-full flex items-center justify-center text-white text-xs font-bold
                        bg-gradient-to-br {items[activeIndex]?.gradient || 'from-jam-primary to-jam-secondary'}">
              {items[activeIndex]?.title?.charAt(0) || ""}
            </div>
          {/if}
        </div>
        <span class="text-white text-sm font-medium drop-shadow">{items[activeIndex]?.title}</span>
        {#if items[activeIndex]?.badge}
          <span class="text-white/70 text-xs bg-white/20 px-2 py-0.5 rounded-full">{items[activeIndex].badge}</span>
        {/if}
      </div>
      <button onclick={closeViewer} aria-label="Close"
        class="text-white/80 hover:text-white p-1 cursor-pointer">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Story Content -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="absolute inset-0 flex items-center justify-center"
         onclick={handleViewerClick}
         onpointerdown={handlePause}
         onpointerup={handleResume}
         role="button" tabindex="-1">

      {#if items[activeIndex]?.image}
        <img src={items[activeIndex].image} alt={items[activeIndex]?.title || ""}
          class="max-w-full max-h-full object-contain" />
      {:else}
        <div class="w-full h-full flex items-center justify-center
                    bg-gradient-to-br {items[activeIndex]?.gradient || 'from-jam-primary to-jam-secondary'}">
          <div class="text-center text-white px-8">
            {#if items[activeIndex]?.icon}
              <div class="text-6xl mb-6">{items[activeIndex].icon}</div>
            {:else}
              <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                <span class="text-4xl font-bold">{items[activeIndex]?.title?.charAt(0) || ""}</span>
              </div>
            {/if}
            <h2 class="text-3xl font-bold mb-2">{items[activeIndex]?.title}</h2>
            {#if items[activeIndex]?.subtitle}
              <p class="text-lg text-white/80">{items[activeIndex].subtitle}</p>
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <!-- Bottom Info Card -->
    <div class="absolute bottom-0 left-0 right-0 z-50 p-5
                bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <div class="max-w-lg mx-auto">
        {#if items[activeIndex]?.description}
          <p class="text-white/90 text-sm mb-3 line-clamp-2">{items[activeIndex].description}</p>
        {/if}
        {#if items[activeIndex]?.price}
          <p class="text-white font-bold text-xl mb-3">{items[activeIndex].price}</p>
        {/if}
        {#if items[activeIndex]?.link}
          <a href={items[activeIndex].link}
             onclick={(e) => e.stopPropagation()}
             class="inline-flex items-center gap-2 bg-white text-slate-900 font-medium text-sm px-5 py-2.5 rounded-full
                    hover:bg-white/90 transition-colors">
            {items[activeIndex]?.cta || "Görüntüle"}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        {/if}
      </div>
    </div>

    <!-- Side Navigation Hints -->
    <div class="absolute left-3 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      {#if activeIndex > 0}
        <button onclick={prevStory} aria-label="Previous story"
          class="text-white/50 hover:text-white p-2 cursor-pointer transition-colors">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
      {/if}
    </div>
    <div class="absolute right-3 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      {#if activeIndex < items.length - 1}
        <button onclick={nextStory} aria-label="Next story"
          class="text-white/50 hover:text-white p-2 cursor-pointer transition-colors">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      {/if}
    </div>
  </div>
{/if}
{/if}
