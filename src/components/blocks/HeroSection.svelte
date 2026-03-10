<script>
  let {
    layout = "centered",
    badge = "",
    title = "",
    subtitle = "",
    primaryCtaText = "",
    primaryCtaHref = "#",
    secondaryCtaText = "",
    secondaryCtaHref = "",
    image = "",
    imageAlt = "",
  } = $props();
</script>

<section class="relative py-16 md:py-28 overflow-hidden bg-white dark:bg-slate-900">
  <!-- Decorative background elements -->
  <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
    <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if layout === "split"}
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          {#if badge}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              {badge}
            </span>
          {/if}
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 dark:text-slate-100 mb-6 tracking-tight leading-tight">
            {title}
          </h1>
          {#if subtitle}
            <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          {/if}
          <div class="flex flex-wrap items-center gap-4">
            <a
              href={primaryCtaHref}
              class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
            >
              {primaryCtaText}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            {#if secondaryCtaText && secondaryCtaHref}
              <a
                href={secondaryCtaHref}
                class="inline-flex items-center px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                {secondaryCtaText}
              </a>
            {/if}
          </div>
        </div>
        <div class="relative lg:mt-0 mt-12">
          {#if image}
            <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
              <img
                src={image}
                alt={imageAlt || ""}
                class="w-full h-auto object-cover aspect-[4/3] lg:aspect-auto"
              />
            </div>
            <!-- Glow effect behind image -->
            <div class="absolute -inset-4 bg-primary/20 dark:bg-primary/30 blur-2xl rounded-[3rem] -z-10 opacity-50"></div>
          {:else}
            <!-- Placeholder if no image -->
            <div class="aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
              <span class="text-slate-400">Görsel Alanı</span>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <!-- Centered Layout -->
      <div class="max-w-4xl mx-auto text-center">
        {#if badge}
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
            {badge}
          </span>
        {/if}
        <h1 class="text-4xl md:text-5xl lg:text-7xl font-extrabold font-heading text-slate-900 dark:text-slate-100 mb-6 tracking-tight leading-tight">
          {title}
        </h1>
        {#if subtitle}
          <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        {/if}
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a
            href={primaryCtaHref}
            class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95"
          >
            {primaryCtaText}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          {#if secondaryCtaText && secondaryCtaHref}
            <a
              href={secondaryCtaHref}
              class="inline-flex items-center px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              {secondaryCtaText}
            </a>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>


