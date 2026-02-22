<svelte:options customElement={{ tag: "jam-reading-list-btn", shadow: "none" }} />

<script>
  import IconBookmarkSimpleRegular from "phosphor-icons-svelte/IconBookmarkSimpleRegular.svelte";
  import IconBookmarkSimpleFill from "phosphor-icons-svelte/IconBookmarkSimpleFill.svelte";

  let {
    post_id = "",
    post_title = "",
    post_url = "",
    post_date = "",
    post_excerpt = "",
    add_text = "Read Later",
    added_text = "Saved",
    remove_text = "Remove"
  } = $props();

  let isSaved = $state(false);

  const STORAGE_KEY = "jam_reading_list";

  function getItems() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("jam:reading-list-updated", { detail: { items } }));
  }

  $effect(() => {
    if (post_id) {
      const items = getItems();
      isSaved = items.some((i) => i.id === post_id);
    }
  });

  function toggle() {
    let items = getItems();
    const idx = items.findIndex((i) => i.id === post_id);

    if (idx > -1) {
      items.splice(idx, 1);
      isSaved = false;
      window.dispatchEvent(
        new CustomEvent("jam:toast", {
          detail: { message: remove_text, type: "info" },
        })
      );
    } else {
      items.push({
        id: post_id,
        title: post_title,
        url: post_url,
        date: post_date,
        excerpt: post_excerpt,
        savedAt: Date.now(),
        isRead: false,
      });
      isSaved = true;
      window.dispatchEvent(
        new CustomEvent("jam:toast", {
          detail: { message: added_text, type: "success" },
        })
      );
    }

    saveItems(items);
  }
</script>

<button
  onclick={toggle}
  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
         {isSaved
           ? 'bg-jam-primary text-white'
           : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-jam-primary/10 hover:text-jam-primary'}"
  aria-pressed={isSaved}
>
  {#if isSaved}
    <IconBookmarkSimpleFill class="w-4 h-4" />
  {:else}
    <IconBookmarkSimpleRegular class="w-4 h-4" />
  {/if}
  {isSaved ? added_text : add_text}
</button>
