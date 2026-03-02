<svelte:options customElement={{ tag: "jam-favorite-btn", shadow: "none" }} />

<script>
  import IconHeartRegular from "phosphor-icons-svelte/IconHeartRegular.svelte";
  import IconHeartFill from "phosphor-icons-svelte/IconHeartFill.svelte";

  let {
    product_id = "",
    product_title = "",
    product_url = "",
    product_price = "",
    product_image = "",
    added_text = "Added to favorites",
    removed_text = "Removed from favorites"
  } = $props();

  let isFavorite = $state(false);

  const STORAGE_KEY = "jam_favorites";

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveFavorites(favs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    window.dispatchEvent(new CustomEvent("jam:favorites-updated", { detail: { favorites: favs } }));
  }

  $effect(() => {
    if (product_id) {
      const favs = getFavorites();
      isFavorite = favs.some((f) => f.id === product_id);
    }
  });

  function toggle() {
    const nextFavorite = !isFavorite;
    isFavorite = nextFavorite;
    const favs = getFavorites();
    const idx = favs.findIndex((f) => f.id === product_id);

    if (idx > -1) {
      favs.splice(idx, 1);
      window.dispatchEvent(
        new CustomEvent("jam:toast", {
          detail: { message: removed_text, type: "info" },
        })
      );
    } else {
      favs.push({
        id: product_id,
        title: product_title,
        url: product_url,
        price: product_price,
        image: product_image,
        addedAt: Date.now(),
      });
      window.dispatchEvent(
        new CustomEvent("jam:toast", {
          detail: { message: added_text, type: "success" },
        })
      );
    }

    saveFavorites(favs);
  }
</script>

<button
  onclick={toggle}
  class="group flex items-center justify-center w-10 h-10 rounded-full
         border-2 transition-all duration-200
         {isFavorite
           ? 'bg-red-500 border-red-500 text-white'
           : 'border-slate-300 dark:border-slate-600 text-slate-400 hover:border-red-400 hover:text-red-500'}"
  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
  aria-pressed={isFavorite}
>
  {#if isFavorite}
    <IconHeartFill class="w-5 h-5 transition-transform scale-110" />
  {:else}
    <IconHeartRegular class="w-5 h-5 transition-transform group-hover:scale-110" />
  {/if}
</button>
