<svelte:options customElement={{ tag: "jam-keyboard-shortcuts", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconKeyboardRegular from "phosphor-icons-svelte/IconKeyboardRegular.svelte";
  import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte";

  let { title = "Keyboard Shortcuts" } = $props();

  let isOpen = $state(false);

  const shortcuts = [
    { keys: ["?"], desc: "Show keyboard shortcuts" },
    { keys: ["Cmd/Ctrl", "K"], desc: "Open search" },
    { keys: ["/"], desc: "Focus search" },
    { keys: ["Esc"], desc: "Close modal" },
    { keys: ["↑", "↓"], desc: "Navigate search results" },
    { keys: ["Enter"], desc: "Select search result" },
    { keys: ["←", "→"], desc: "Navigate lightbox/stories" },
    { keys: ["+", "-"], desc: "Zoom in/out lightbox" },
    { keys: ["0"], desc: "Reset zoom" },
  ];

  onMount(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) {
        return;
      }

      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        isOpen = true;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  function close() {
    isOpen = false;
  }

  function handleKeydown(e) {
    if (e.key === "Escape" && isOpen) close();
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) close();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    onclick={handleBackdropClick}
  >
    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-[scaleIn_0.2s_ease-out]">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold font-heading text-jam-text dark:text-jam-text-dark flex items-center gap-2">
          <IconKeyboardRegular class="w-5 h-5 text-jam-primary" />
          {title}
        </h2>
        <button
          onclick={close}
          class="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-700
                 dark:text-slate-400 dark:hover:text-white rounded-full
                 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <IconXRegular class="w-5 h-5" />
        </button>
      </div>

      <div class="space-y-3">
        {#each shortcuts as shortcut}
          <div class="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
            <span class="text-sm text-slate-600 dark:text-slate-400">{shortcut.desc}</span>
            <div class="flex items-center gap-1">
              {#each shortcut.keys as key, i}
                {#if i > 0}
                  <span class="text-slate-400 text-xs">+</span>
                {/if}
                <kbd class="px-2 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800
                           text-slate-700 dark:text-slate-300 rounded border
                           border-slate-200 dark:border-slate-700 min-w-[24px] text-center">
                  {key}
                </kbd>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      <p class="mt-6 text-xs text-slate-500 dark:text-slate-500 text-center">
        Press <kbd class="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-mono">Esc</kbd> to close
      </p>
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
