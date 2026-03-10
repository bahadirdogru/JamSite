<svelte:options customElement={{ tag: "jam-back-to-top", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconArrowUpRegular from "phosphor-icons-svelte/IconArrowUpRegular.svelte";

  let visible = $state(false);

  onMount(() => {
    const checkScroll = () => {
      visible = window.scrollY > 400;
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", checkScroll);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<button
  onclick={scrollToTop}
  class="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full
         bg-primary text-white shadow-lg
         flex items-center justify-center
         transition-all duration-300
         hover:bg-primary/90 hover:scale-110
         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
         {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}"
  aria-label="Scroll to top"
>
  <IconArrowUpRegular class="w-5 h-5" />
</button>


