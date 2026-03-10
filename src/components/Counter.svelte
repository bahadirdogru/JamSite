<svelte:options customElement={{ tag: "jam-counter", shadow: "none" }} />

<script>
  let count = $state(0);
</script>

<button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer font-medium"
  onclick={() => count++}>
  Count: {count}
</button>


