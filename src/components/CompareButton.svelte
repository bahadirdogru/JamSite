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
    const items = getItems();
    const idx = items.findIndex((i) => i.id === product_id);
    const isRemoving = idx > -1;
    const isAdding = !isRemoving && items.length < MAX_COMPARE;

    if (isRemoving) {
      isAdded = false;
      items.splice(idx, 1);
      saveItems(items);
    } else if (isAdding) {
      isAdded = true;
      items.push({
        id: product_id,
        title: product_title,
        url: product_url,
        price: product_price,
        image: product_image,
      });
      saveItems(items);
    } else {
      window.dispatchEvent(
        new CustomEvent("jam:toast", {
          detail: { message: `Max ${MAX_COMPARE} items`, type: "warning" },
        })
      );
    }
  }
</script>

<button
  onclick={toggle}
  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
         {isAdded
           ? 'bg-secondary text-white'
           : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-secondary/10 hover:text-secondary'}"
  aria-pressed={isAdded}
>
  <IconScalesRegular class="w-4 h-4" />
  {isAdded ? added_text : add_text}
</button>


