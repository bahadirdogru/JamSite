<svelte:options customElement={{ tag: "jam-quick-view", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte";
  import IconCubeRegular from "phosphor-icons-svelte/IconCubeRegular.svelte";

  let { view_details = "View Details", close_text = "Close" } = $props();

  let isOpen = $state(false);
  let product = $state(null);

  onMount(() => {
    const handler = (e) => {
      product = e.detail;
      isOpen = true;
    };

    window.addEventListener("jam:quick-view", handler);
    return () => window.removeEventListener("jam:quick-view", handler);
  });

  function close() {
    isOpen = false;
    product = null;
  }

  function handleKeydown(e) {
    if (e.key === "Escape" && isOpen) close();
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) close();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen && product}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    onclick={handleBackdropClick}
  >
    <div class="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto animate-[scaleIn_0.2s_ease-out]">
      <button
        onclick={close}
        class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center
               text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white
               bg-slate-100 dark:bg-slate-800 rounded-full transition-colors"
        aria-label={close_text}
      >
        <IconXRegular class="w-5 h-5" />
      </button>

      <div class="grid md:grid-cols-2 gap-0">
        <!-- Image -->
        <div class="relative aspect-square bg-slate-100 dark:bg-slate-800">
          {#if product.image}
            <img src={product.image} alt={product.title} class="w-full h-full object-cover" />
          {:else}
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br {product.gradient || 'from-jam-primary to-jam-accent'}">
              <IconCubeRegular class="w-20 h-20 text-white/60" />
            </div>
          {/if}
        </div>

        <!-- Details -->
        <div class="p-6 flex flex-col">
          <h2 class="text-xl font-bold font-heading text-jam-text dark:text-jam-text-dark mb-2">
            {product.title}
          </h2>

          {#if product.price}
            <p class="text-2xl font-bold text-jam-primary mb-4">{product.price}</p>
          {/if}

          {#if product.description}
            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
              {product.description}
            </p>
          {/if}

          {#if product.tags && product.tags.length > 0}
            <div class="flex flex-wrap gap-2 mb-6">
              {#each product.tags as tag}
                <span class="px-2 py-1 text-xs bg-jam-accent/10 text-jam-accent rounded-full">{tag}</span>
              {/each}
            </div>
          {/if}

          <a
            href={product.url}
            class="w-full py-3 px-6 bg-jam-primary hover:bg-jam-primary/90 text-white
                   font-semibold rounded-xl text-center transition-colors"
          >
            {view_details}
          </a>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
