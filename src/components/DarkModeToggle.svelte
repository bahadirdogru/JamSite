<script>
  import IconSunRegular from "phosphor-icons-svelte/IconSunRegular.svelte";
  import IconMoonRegular from "phosphor-icons-svelte/IconMoonRegular.svelte";

  let dark = $state(
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  function applyTheme(isDark) {
    dark = isDark;
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }

  function toggle() {
    const next = !dark;
    applyTheme(next);
    if (typeof document !== "undefined") {
      localStorage.setItem("theme", next ? "dark" : "light");
    }
  }

  $effect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e) => {
      if (e.key === "theme") {
        const v = e.newValue ?? localStorage.getItem("theme");
        applyTheme(v === "dark");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  });
</script>

<button
  onclick={toggle}
  aria-label="Toggle dark mode"
  class="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
>
  {#if dark}
    <IconSunRegular class="w-5 h-5 text-yellow-400" />
  {:else}
    <IconMoonRegular class="w-5 h-5 text-slate-600 dark:text-slate-300" />
  {/if}
</button>
