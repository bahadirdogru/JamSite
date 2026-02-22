<svelte:options customElement={{ tag: "jam-lazy-image", shadow: "none" }} />

<script>
  import { onMount } from "svelte";

  let {
    src = "",
    alt = "",
    placeholder = "",
    width = "",
    height = ""
  } = $props();

  let isLoaded = $state(false);
  let isInView = $state(false);
  let imgEl;

  onMount(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            isInView = true;
            observer.disconnect();
          }
        },
        { rootMargin: "100px" }
      );

      if (imgEl) observer.observe(imgEl);

      return () => observer.disconnect();
    } else {
      isInView = true;
    }
  });

  function handleLoad() {
    isLoaded = true;
  }
</script>

<div
  bind:this={imgEl}
  class="jam-lazy-image relative overflow-hidden bg-slate-100 dark:bg-slate-800"
  style={width ? `width: ${width}` : ""}
>
  {#if placeholder && !isLoaded}
    <img
      src={placeholder}
      {alt}
      class="absolute inset-0 w-full h-full object-cover blur-lg scale-105"
      style={height ? `height: ${height}` : ""}
      aria-hidden="true"
    />
  {:else if !isLoaded}
    <div
      class="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200
             dark:from-slate-700 dark:via-slate-800 dark:to-slate-700
             animate-[shimmer_1.5s_infinite]"
      style={height ? `height: ${height}` : "aspect-ratio: 16/9"}
    ></div>
  {/if}

  {#if isInView}
    <img
      {src}
      {alt}
      onload={handleLoad}
      class="w-full h-full object-cover transition-opacity duration-500
             {isLoaded ? 'opacity-100' : 'opacity-0'}"
      style={height ? `height: ${height}` : ""}
      loading="lazy"
      decoding="async"
    />
  {/if}
</div>

<style>
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>
