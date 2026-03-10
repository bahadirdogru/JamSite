<script>
  import IconCaretLeftRegular from "phosphor-icons-svelte/IconCaretLeftRegular.svelte";
  import IconCaretRightRegular from "phosphor-icons-svelte/IconCaretRightRegular.svelte";

  let { slides = [], autoplay = 0 } = $props();
  let current = $state(0);
  let interval;

  function next() { current = (current + 1) % slides.length; }
  function prev() { current = (current - 1 + slides.length) % slides.length; }
  function goTo(i) { current = i; }

  $effect(() => {
    const ms = typeof autoplay === "number" ? autoplay : parseInt(autoplay);
    if (ms > 0 && slides.length > 1) {
      interval = setInterval(next, ms);
      return () => clearInterval(interval);
    }
  });
</script>

{#if slides.length > 0}
<div class="relative overflow-hidden rounded-xl">
  {#each slides as slide, i}
    {#if i === current}
      <div class="w-full">
        {#if slide.type === "hero"}
          <div class="relative h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
            {#if slide.image}
              <img src={slide.image} alt="" class="absolute inset-0 w-full h-full object-cover" />
            {/if}
            <div class="absolute inset-0 bg-black/40"></div>
            <div class="relative z-10 text-center text-white px-4">
              <h2 class="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
              <p class="text-base md:text-lg mb-6 max-w-xl mx-auto">{slide.description}</p>
              {#if slide.cta_text}
                <a href={slide.cta_link}
                   class="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                  {slide.cta_text}
                </a>
              {/if}
            </div>
          </div>
        {:else if slide.type === "image"}
          <img src={slide.image} alt={slide.alt || ""} class="w-full h-80 md:h-96 object-cover" />
        {:else if slide.type === "content"}
          <div class="h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-secondary to-accent px-8">
            <div class="text-center text-white max-w-2xl">
              <h2 class="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
              <p class="text-base md:text-lg">{slide.description}</p>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  {/each}

  {#if slides.length > 1}
    <button onclick={prev} aria-label="Previous"
      class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer">
      <IconCaretLeftRegular class="w-5 h-5" />
    </button>
    <button onclick={next} aria-label="Next"
      class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer">
      <IconCaretRightRegular class="w-5 h-5" />
    </button>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {#each slides as _, i}
        <button onclick={() => goTo(i)} aria-label="Go to slide {i + 1}"
          class="w-3 h-3 rounded-full transition-colors cursor-pointer {i === current ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}"></button>
      {/each}
    </div>
  {/if}
</div>
{/if}


