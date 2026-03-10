<script>
  let { stats = [] } = $props();
</script>

<section class="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-700">
  <div class="max-w-6xl mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {#each stats as stat}
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold font-heading text-primary mb-1">
            {stat.value}
          </div>
          <div class="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {stat.label}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>


