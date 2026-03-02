<script>
  let { message = "Yeni sürüm var. Sayfayı yenile.", buttonLabel = "Yenile" } = $props();
  let show = $state(false);

  $effect(() => {
    if (typeof navigator === "undefined" || !navigator.serviceWorker) return;
    const check = (reg) => {
      if (reg.waiting) {
        show = true;
        return;
      }
      reg.addEventListener("updatefound", () => {
        const w = reg.installing;
        if (!w) return;
        w.addEventListener("statechange", () => {
          if (w.state === "installed" && navigator.serviceWorker.controller) show = true;
        });
      });
    };
    navigator.serviceWorker.getRegistration().then((reg) => reg && check(reg));
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  });

  function refresh() {
    if (typeof navigator === "undefined" || !navigator.serviceWorker) return;
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (reg?.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
    });
  }
</script>

{#if show}
  <div
    class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 flex items-center justify-between gap-3 p-4 rounded-xl bg-jam-primary text-white shadow-lg"
    role="alert"
  >
    <span class="text-sm">{message}</span>
    <button
      type="button"
      onclick={refresh}
      class="shrink-0 px-4 py-2 rounded-lg bg-white text-jam-primary font-medium hover:bg-slate-100 transition-colors"
    >
      {buttonLabel}
    </button>
  </div>
{/if}
