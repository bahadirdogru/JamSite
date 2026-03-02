<script>
  /** Wraps content in Svelte 5 boundary; shows fallback on render error. */
  let {
    message = "Bir hata oluştu. Lütfen sayfayı yenileyin.",
    retryLabel = "Tekrar dene",
  } = $props();
</script>

<svelte:boundary>
  <slot />
  {#snippet failed(error, reset)}
    <div class="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center">
      <p class="text-red-700 dark:text-red-300 mb-4">{message}</p>
      {#if error?.message}
        <p class="text-sm text-slate-500 dark:text-slate-400 mb-4 font-mono">{error.message}</p>
      {/if}
      <button
        type="button"
        onclick={reset}
        class="px-4 py-2 rounded-lg bg-jam-primary text-white hover:bg-blue-600 transition-colors"
      >
        {retryLabel}
      </button>
    </div>
  {/snippet}
</svelte:boundary>
