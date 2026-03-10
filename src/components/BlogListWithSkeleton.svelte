<script>
  import SkeletonListItem from "./SkeletonListItem.svelte";
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
  <ul class="space-y-6" aria-busy="true" aria-label="Loading">
    <SkeletonListItem />
    <SkeletonListItem />
    <SkeletonListItem />
    <SkeletonListItem />
  </ul>
{:else}
  <slot />
{/if}


