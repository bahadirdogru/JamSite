<svelte:options customElement={{ tag: "jam-reading-list", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconBookmarkSimpleRegular from "phosphor-icons-svelte/IconBookmarkSimpleRegular.svelte";
  import IconCheckRegular from "phosphor-icons-svelte/IconCheckRegular.svelte";
  import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte";

  let {
    empty_text = "No saved articles",
    mark_read_text = "Mark as read",
    mark_unread_text = "Mark as unread",
    export_text = "Export",
    clear_text = "Clear all"
  } = $props();

  let items = $state([]);

  const STORAGE_KEY = "jam_reading_list";

  function load() {
    try {
      items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      items = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("jam:reading-list-updated", { detail: { items } }));
  }

  onMount(() => {
    load();

    const handler = () => load();
    window.addEventListener("jam:reading-list-updated", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("jam:reading-list-updated", handler);
      window.removeEventListener("storage", handler);
    };
  });

  function toggleRead(id) {
    const item = items.find((i) => i.id === id);
    if (item) {
      item.isRead = !item.isRead;
      items = [...items];
      save();
    }
  }

  function remove(id) {
    items = items.filter((i) => i.id !== id);
    save();
  }

  function clearAll() {
    if (confirm("Clear all saved articles?")) {
      items = [];
      save();
    }
  }

  function exportList() {
    const markdown = items
      .map((i) => `- [${i.title}](${i.url})${i.isRead ? " ✓" : ""}`)
      .join("\n");

    const blob = new Blob([`# Reading List\n\n${markdown}`], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reading-list.md";
    a.click();
    URL.revokeObjectURL(url);

    window.dispatchEvent(
      new CustomEvent("jam:toast", {
        detail: { message: "Exported!", type: "success" },
      })
    );
  }

  let unreadCount = $derived(items.filter((i) => !i.isRead).length);
  let readCount = $derived(items.filter((i) => i.isRead).length);
</script>

<div class="jam-reading-list">
  {#if items.length === 0}
    <div class="text-center py-16 text-slate-500 dark:text-slate-400">
      <IconBookmarkSimpleRegular class="w-16 h-16 mx-auto mb-4 opacity-50" />
      <p>{empty_text}</p>
    </div>
  {:else}
    <!-- Header stats -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4 text-sm">
        <span class="px-3 py-1 bg-jam-primary/10 text-jam-primary rounded-full">
          {unreadCount} unread
        </span>
        <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
          {readCount} read
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button
          onclick={exportList}
          class="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-jam-primary border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
        >
          {export_text}
        </button>
        <button
          onclick={clearAll}
          class="px-3 py-1.5 text-sm text-red-500 hover:text-red-600 border border-red-200 dark:border-red-800 rounded-lg transition-colors"
        >
          {clear_text}
        </button>
      </div>
    </div>

    <!-- Items list -->
    <div class="space-y-4">
      {#each items as item (item.id)}
        <article class="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-jam-border dark:border-jam-border-dark {item.isRead ? 'opacity-60' : ''}">
          <div class="flex-1 min-w-0">
            <a
              href={item.url}
              class="font-semibold text-jam-text dark:text-jam-text-dark hover:text-jam-primary transition-colors line-clamp-1 {item.isRead ? 'line-through' : ''}"
            >
              {item.title}
            </a>
            {#if item.excerpt}
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.excerpt}</p>
            {/if}
            <div class="flex items-center gap-3 mt-2 text-xs text-slate-400">
              {#if item.date}
                <span>{item.date}</span>
              {/if}
              <span>Saved {new Date(item.savedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <button
              onclick={() => toggleRead(item.id)}
              class="w-8 h-8 flex items-center justify-center rounded-full
                     {item.isRead
                       ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                       : 'bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-green-600'}"
              title={item.isRead ? mark_unread_text : mark_read_text}
            >
              <IconCheckRegular class="w-4 h-4" />
            </button>
            <button
              onclick={() => remove(item.id)}
              class="w-8 h-8 flex items-center justify-center rounded-full
                     bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-red-500"
              aria-label="Remove"
            >
              <IconXRegular class="w-4 h-4" />
            </button>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</div>
