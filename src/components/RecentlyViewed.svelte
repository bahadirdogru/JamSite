<svelte:options customElement={{ tag: "jam-recently-viewed", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconCubeRegular from "phosphor-icons-svelte/IconCubeRegular.svelte";

  let {
    title = "Recently Viewed",
    max_items = "10",
    product_id = "",
    product_title = "",
    product_url = "",
    product_price = "",
    product_image = ""
  } = $props();

  let items = $state([]);
  let maxCount = 10;

  const STORAGE_KEY = "jam_recently_viewed";

  function load() {
    try {
      items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      items = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function addCurrent() {
    if (!product_id) return;

    items = items.filter((i) => i.id !== product_id);
    items.unshift({
      id: product_id,
      title: product_title,
      url: product_url,
      price: product_price,
      image: product_image,
      viewedAt: Date.now(),
    });

    if (items.length > maxCount) {
      items = items.slice(0, maxCount);
    }

    save();
  }

  onMount(() => {
    maxCount = parseInt(max_items, 10) || 10;
    load();
    addCurrent();
  });

  $effect(() => {
    load();
  });
</script>

{#if items.length > 1}
  <section class="mt-12">
    <h3 class="text-lg font-bold font-heading text-jam-text dark:text-jam-text-dark mb-4">
      {title}
    </h3>
    <div class="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
      {#each items.filter(i => i.id !== product_id).slice(0, 6) as item (item.id)}
        <a
          href={item.url}
          class="flex-none w-36 snap-start group"
        >
          <div class="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2">
            {#if item.image}
              <img src={item.image} alt={item.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            {:else}
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-jam-primary to-jam-accent">
                <IconCubeRegular class="w-10 h-10 text-white/60" />
              </div>
            {/if}
          </div>
          <h4 class="text-sm font-medium text-jam-text dark:text-jam-text-dark line-clamp-1 group-hover:text-jam-primary transition-colors">
            {item.title}
          </h4>
          {#if item.price}
            <p class="text-sm text-jam-primary font-semibold">{item.price}</p>
          {/if}
        </a>
      {/each}
    </div>
  </section>
{/if}
