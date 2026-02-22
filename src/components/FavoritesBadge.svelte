<svelte:options customElement={{ tag: "jam-favorites-badge", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte";

  let { href = "/favorites/" } = $props();

  let count = $state(0);

  const STORAGE_KEY = "jam_favorites";

  function updateCount() {
    try {
      const favs = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      count = favs.length;
    } catch {
      count = 0;
    }
  }

  onMount(() => {
    updateCount();

    const handler = () => updateCount();
    window.addEventListener("jam:favorites-updated", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("jam:favorites-updated", handler);
      window.removeEventListener("storage", handler);
    };
  });
</script>

<a
  {href}
  class="relative flex items-center justify-center w-10 h-10 rounded-full
         text-slate-600 dark:text-slate-400 hover:text-jam-primary
         hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
  aria-label="Favorites ({count})"
>
  <IconHeartRegular class="w-5 h-5" />
  {#if count > 0}
    <span class="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center
                 bg-red-500 text-white text-xs font-bold rounded-full">
      {count > 99 ? "99+" : count}
    </span>
  {/if}
</a>
