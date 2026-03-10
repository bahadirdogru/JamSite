<script>
  let {
    layout = "grid",
    heading = "",
    subheading = "",
    features = [],
    image = "",
  } = $props();
</script>

<section class="py-16 md:py-24 bg-white dark:bg-slate-900 overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold font-heading text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
        {heading}
      </h2>
      {#if subheading}
        <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          {subheading}
        </p>
      {/if}
    </div>

    {#if layout === "screenshot"}
      <div class="space-y-16">
        <div class="relative">
          <div class="relative z-10 mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            {#if image}
              <img src={image} alt={heading} class="w-full h-auto" />
            {:else}
              <div class="aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                Görsel Alanı
              </div>
            {/if}
          </div>
          <div class="absolute -inset-4 bg-primary/10 dark:bg-primary/20 blur-3xl rounded-[3rem] -z-10 opacity-50"></div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          {#each features as item}
            <div class="p-6">
              {#if item.icon}
                <div class="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 text-xl" aria-hidden="true">
                  {item.icon}
                </div>
              {/if}
              <h3 class="font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">
                {item.title}
              </h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <!-- Grid Layout -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {#each features as item}
          <div
            class="group p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-primary/40 transition-all duration-300"
          >
            {#if item.icon}
              <div
                class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-6 text-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                aria-hidden="true"
              >
                {item.icon}
              </div>
            {/if}
            <h3 class="font-bold text-xl text-slate-900 dark:text-slate-100 mb-3">
              {item.title}
            </h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>


