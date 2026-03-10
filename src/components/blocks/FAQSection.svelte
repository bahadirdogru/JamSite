<script>
  let {
    layout = "list",
    heading = "",
    items = [],
  } = $props();

  let openIndex = $state(-1);

  function toggle(index) {
    openIndex = openIndex === index ? -1 : index;
  }
</script>

<section class="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
  <div class="max-w-3xl mx-auto px-4">
    {#if heading}
      <h2 class="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 dark:text-slate-100 mb-12 text-center tracking-tight">
        {heading}
      </h2>
    {/if}

    {#if layout === "accordion"}
      <div class="space-y-4">
        {#each items as item, i}
          <div class="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-all hover:border-primary/30">
            <button
              class="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
              onclick={() => toggle(i)}
              aria-expanded={openIndex === i}
            >
              <span class="font-bold text-lg text-slate-900 dark:text-slate-100">
                {item.question}
              </span>
              <svg
                class="w-5 h-5 text-slate-400 transition-transform duration-300 {openIndex === i ? 'rotate-180' : ''}"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {#if openIndex === i}
              <div class="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.answer}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {:else}
      <!-- List Layout -->
      <div class="space-y-12">
        {#each items as item}
          <div class="group">
            <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex gap-4">
              <span class="text-primary" aria-hidden="true">?</span>
              {item.question}
            </h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed pl-8 border-l-2 border-slate-100 dark:border-slate-800 group-hover:border-primary/30 transition-colors">
            </p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</section>


