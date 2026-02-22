<svelte:options customElement={{ tag: "jam-toc", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconListRegular from "phosphor-icons-svelte/IconListRegular.svelte";
  import IconCaretDownRegular from "phosphor-icons-svelte/IconCaretDownRegular.svelte";

  let { title = "Contents", selector = "article h2, article h3" } = $props();

  let headings = $state([]);
  let activeId = $state("");
  let isExpanded = $state(true);

  onMount(() => {
    const elements = document.querySelectorAll(selector);

    headings = Array.from(elements).map((el, idx) => {
      if (!el.id) {
        el.id = `heading-${idx}`;
      }
      return {
        id: el.id,
        text: el.textContent?.trim() || "",
        level: el.tagName === "H2" ? 2 : 3,
      };
    });

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  }
</script>

{#if headings.length > 0}
  <nav class="jam-toc bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-jam-border dark:border-jam-border-dark">
    <button
      onclick={() => isExpanded = !isExpanded}
      class="w-full flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
    >
      <span class="flex items-center gap-2">
        <IconListRegular class="w-4 h-4" />
        {title}
      </span>
      <IconCaretDownRegular class="w-4 h-4 transition-transform {isExpanded ? 'rotate-180' : ''}" />
    </button>

    {#if isExpanded}
      <ul class="space-y-1 text-sm">
        {#each headings as heading}
          <li>
            <button
              onclick={() => scrollTo(heading.id)}
              class="w-full text-left py-1.5 px-2 rounded transition-colors
                     {heading.level === 3 ? 'pl-6' : ''}
                     {activeId === heading.id
                       ? 'bg-jam-primary/10 text-jam-primary font-medium'
                       : 'text-slate-600 dark:text-slate-400 hover:text-jam-primary hover:bg-slate-100 dark:hover:bg-slate-700'}"
            >
              {heading.text}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </nav>
{/if}
