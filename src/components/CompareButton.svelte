<svelte:options customElement={{ tag: "jam-compare-btn", shadow: "none" }} />

<script>
  import IconScalesRegular from "phosphor-icons-svelte/IconScalesRegular.svelte";

  let {
    product_id = "",
    product_title = "",
    product_url = "",
    product_price = "",
    product_image = "",
    add_text = "Compare",
    added_text = "Added"
  } = $props();

  let isAdded = $state(false);

  const STORAGE_KEY = "jam_compare";
  const MAX_COMPARE = 4;

  function getItems() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("jam:compare-updated", { detail: { items } }));
  }

  $effect(() => {
    if (product_id) {
      const items = getItems();
      isAdded = items.some((i) => i.id === product_id);
    }
  });

  function toggle() {
    let items = getItems();
    const idx = items.findIndex((i) => i.id === product_id);

    if (idx > -1) {
      items.splice(idx, 1);
      isAdded = false;
    } else {
      if (items.length >= MAX_COMPARE) {
        window.dispatchEvent(
          new CustomEvent("jam:toast", {
            detail: { message: `Max ${MAX_COMPARE} items`, type: "warning" },
          })
        );
        return;
      }
      items.push({
        id: product_id,
        title: product_title,
        url: product_url,
        price: product_price,
        image: product_image,
      });
      isAdded = true;
    }

    saveItems(items);
  }
</script>

<button
  onclick={toggle}
  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
         {isAdded
           ? 'bg-jam-secondary text-white'
           : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-jam-secondary/10 hover:text-jam-secondary'}"
  aria-pressed={isAdded}
>
  <IconScalesRegular class="w-4 h-4" />
  {isAdded ? added_text : add_text}
</button>
