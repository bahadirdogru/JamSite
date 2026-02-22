<svelte:options customElement={{ tag: "jam-scroll-progress", shadow: "none" }} />

<script>
  import { onMount } from "svelte";

  let progress = $state(0);

  onMount(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  });
</script>

<div class="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
  <div
    class="h-full bg-gradient-to-r from-jam-primary to-jam-accent transition-[width] duration-75"
    style="width: {progress}%"
  ></div>
</div>
