<svelte:options customElement={{ tag: "jam-theme-toggle", shadow: "none" }} />

<script>
  import IconSunRegular from "phosphor-icons-svelte/IconSunRegular.svelte";
  import IconMoonRegular from "phosphor-icons-svelte/IconMoonRegular.svelte";

  let dark = $state(document.documentElement.classList.contains("dark"));

  function toggle() {
    dark = !dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }
</script>

<button onclick={toggle} aria-label="Toggle dark mode"
  class="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
  {#if dark}
    <IconSunRegular class="w-5 h-5 text-yellow-400" />
  {:else}
    <IconMoonRegular class="w-5 h-5 text-slate-600 dark:text-slate-300" />
  {/if}
</button>
