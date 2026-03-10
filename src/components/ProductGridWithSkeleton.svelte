<script>
  import SkeletonCard from "./SkeletonCard.svelte";
  let loading = $state(true);
  $effect(() => {
    if (typeof window === "undefined") return;
    const id = setTimeout(() => {
      loading = false;
    }, 80);
    return () => clearTimeout(id);
  });
</script>

{#if loading}
  <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading">
    <li><SkeletonCard /></li>
    <li><SkeletonCard /></li>
    <li><SkeletonCard /></li>
    <li><SkeletonCard /></li>
    <li><SkeletonCard /></li>
    <li><SkeletonCard /></li>
  </ul>
{:else}
  <slot />
{/if}


