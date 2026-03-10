<script>
  let {
    heading = "",
    testimonials = [],
  } = $props();
</script>

<section class="py-16 md:py-20 bg-white dark:bg-slate-900/50">
  <div class="max-w-6xl mx-auto px-4">
    {#if heading}
      <h2 class="text-3xl font-bold font-heading text-slate-900 dark:text-slate-100 text-center mb-12">
        {heading}
      </h2>
    {/if}
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each testimonials as t}
        <blockquote
          class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            "{t.quote}"
          </p>
          <footer>
            <cite class="not-italic font-semibold text-slate-900 dark:text-slate-100">
              {t.author}
            </cite>
            {#if t.role}
              <span class="text-sm text-slate-500 dark:text-slate-400 block">{t.role}</span>
            {/if}
          </footer>
        </blockquote>
      {/each}
    </div>
  </div>
</section>


