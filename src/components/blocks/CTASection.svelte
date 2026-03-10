<script>
  let {
    variant = "simple",
    title = "",
    description = "",
    ctaText = "",
    ctaHref = "#",
    image = "",
  } = $props();
</script>

<section class="py-16 md:py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if variant === "panel"}
      <div class="relative bg-primary rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 p-8 md:p-16 lg:flex lg:items-center lg:gap-12">
        <!-- Decoration -->
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-black/10 rounded-full blur-3xl"></div>

        <div class="relative z-10 lg:flex-1">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {title}
          </h2>
          {#if description}
            <p class="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">
              {description}
            </p>
          {/if}
          <a
            href={ctaHref}
            class="inline-flex items-center px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-lg"
          >
            {ctaText}
          </a>
        </div>

        {#if image}
          <div class="relative z-10 mt-12 lg:mt-0 lg:w-1/3 flex justify-center">
            <img
              src={image}
              alt=""
              class="w-full max-w-sm h-auto rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        {/if}
      </div>
    {:else}
      <div class="text-center bg-slate-50 dark:bg-slate-800 rounded-3xl p-12 md:p-20 border border-slate-200 dark:border-slate-700">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
          {title}
        </h2>
        {#if description}
          <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            {description}
          </p>
        {/if}
        <a
          href={ctaHref}
          class="inline-flex items-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          {ctaText}
        </a>
      </div>
    {/if}
  </div>
</section>
