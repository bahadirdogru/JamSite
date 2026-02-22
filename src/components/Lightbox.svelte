<svelte:options customElement={{ tag: "jam-lightbox", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte";
  import IconMinusRegular from "phosphor-icons-svelte/IconMinusRegular.svelte";
  import IconPlusRegular from "phosphor-icons-svelte/IconPlusRegular.svelte";
  import IconCaretLeftRegular from "phosphor-icons-svelte/IconCaretLeftRegular.svelte";
  import IconCaretRightRegular from "phosphor-icons-svelte/IconCaretRightRegular.svelte";

  let isOpen = $state(false);
  let currentSrc = $state("");
  let currentAlt = $state("");
  let images = $state([]);
  let currentIndex = $state(0);
  let zoom = $state(1);
  let isDragging = $state(false);
  let dragStart = { x: 0, y: 0 };
  let offset = $state({ x: 0, y: 0 });

  onMount(() => {
    const selector = "article img, .lightbox-trigger, [data-lightbox]";

    function collectImages() {
      const imgs = document.querySelectorAll(selector);
      images = Array.from(imgs).map((img) => ({
        src: img.src || img.dataset.src || img.href,
        alt: img.alt || img.title || "",
      }));
    }

    function handleClick(e) {
      const img = e.target.closest(selector);
      if (!img) return;

      e.preventDefault();
      collectImages();

      const src = img.src || img.dataset.src || img.href;
      currentIndex = images.findIndex((i) => i.src === src);
      if (currentIndex === -1) currentIndex = 0;

      currentSrc = images[currentIndex]?.src || src;
      currentAlt = images[currentIndex]?.alt || "";
      zoom = 1;
      offset = { x: 0, y: 0 };
      isOpen = true;
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  });

  function close() {
    isOpen = false;
    zoom = 1;
    offset = { x: 0, y: 0 };
  }

  function prev() {
    if (images.length <= 1) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    currentSrc = images[currentIndex].src;
    currentAlt = images[currentIndex].alt;
    zoom = 1;
    offset = { x: 0, y: 0 };
  }

  function next() {
    if (images.length <= 1) return;
    currentIndex = (currentIndex + 1) % images.length;
    currentSrc = images[currentIndex].src;
    currentAlt = images[currentIndex].alt;
    zoom = 1;
    offset = { x: 0, y: 0 };
  }

  function handleKeydown(e) {
    if (!isOpen) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "+" || e.key === "=") zoom = Math.min(zoom + 0.5, 4);
    if (e.key === "-") zoom = Math.max(zoom - 0.5, 0.5);
    if (e.key === "0") {
      zoom = 1;
      offset = { x: 0, y: 0 };
    }
  }

  function handleWheel(e) {
    if (!isOpen) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    zoom = Math.max(0.5, Math.min(4, zoom + delta));
  }

  function handlePointerDown(e) {
    if (zoom <= 1) return;
    isDragging = true;
    dragStart = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    offset = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
  }

  function handlePointerUp() {
    isDragging = false;
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
    onwheel={handleWheel}
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointerleave={handlePointerUp}
  >
    <!-- Close button -->
    <button
      onclick={close}
      class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center
             text-white/70 hover:text-white bg-white/10 hover:bg-white/20
             rounded-full transition-colors"
      aria-label="Close"
    >
      <IconXRegular class="w-6 h-6" />
    </button>

    <!-- Zoom controls -->
    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2
                bg-white/10 rounded-full px-3 py-1.5">
      <button
        onclick={() => zoom = Math.max(0.5, zoom - 0.5)}
        class="text-white/70 hover:text-white transition-colors"
        aria-label="Zoom out"
      >
        <IconMinusRegular class="w-5 h-5" />
      </button>
      <span class="text-white/70 text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
      <button
        onclick={() => zoom = Math.min(4, zoom + 0.5)}
        class="text-white/70 hover:text-white transition-colors"
        aria-label="Zoom in"
      >
        <IconPlusRegular class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation arrows -->
    {#if images.length > 1}
      <button
        onclick={prev}
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12
               flex items-center justify-center
               text-white/70 hover:text-white bg-white/10 hover:bg-white/20
               rounded-full transition-colors"
        aria-label="Previous image"
      >
        <IconCaretLeftRegular class="w-6 h-6" />
      </button>
      <button
        onclick={next}
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12
               flex items-center justify-center
               text-white/70 hover:text-white bg-white/10 hover:bg-white/20
               rounded-full transition-colors"
        aria-label="Next image"
      >
        <IconCaretRightRegular class="w-6 h-6" />
      </button>
    {/if}

    <!-- Image -->
    <img
      src={currentSrc}
      alt={currentAlt}
      class="max-w-[90vw] max-h-[85vh] object-contain select-none
             transition-transform duration-200 {isDragging ? 'cursor-grabbing' : zoom > 1 ? 'cursor-grab' : ''}"
      style="transform: scale({zoom}) translate({offset.x / zoom}px, {offset.y / zoom}px)"
      draggable="false"
    />

    <!-- Counter -->
    {#if images.length > 1}
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    {/if}

    <!-- Alt text -->
    {#if currentAlt}
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/90 text-sm
                  bg-black/50 px-4 py-2 rounded-lg max-w-md text-center">
        {currentAlt}
      </div>
    {/if}
  </div>
{/if}
