<svelte:options customElement={{ tag: "jam-toast", shadow: "none" }} />

<script>
  import { onMount } from "svelte";
  import IconCheckCircleRegular from "phosphor-icons-svelte/IconCheckCircleRegular.svelte";
  import IconXCircleRegular from "phosphor-icons-svelte/IconXCircleRegular.svelte";
  import IconWarningRegular from "phosphor-icons-svelte/IconWarningRegular.svelte";
  import IconInfoRegular from "phosphor-icons-svelte/IconInfoRegular.svelte";
  import IconXRegular from "phosphor-icons-svelte/IconXRegular.svelte";

  let toasts = $state([]);
  let toastId = 0;

  onMount(() => {
    const handleToast = (e) => {
      const { message, type = "info", duration = 3000 } = e.detail || {};
      if (!message) return;

      const id = ++toastId;
      toasts = [...toasts, { id, message, type }];

      setTimeout(() => {
        toasts = toasts.filter((t) => t.id !== id);
      }, duration);
    };

    window.addEventListener("jam:toast", handleToast);
    return () => window.removeEventListener("jam:toast", handleToast);
  });

  function dismiss(id) {
    toasts = toasts.filter((t) => t.id !== id);
  }

  function getTypeClasses(type) {
    switch (type) {
      case "success":
        return "bg-green-600 text-white";
      case "error":
        return "bg-red-600 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      default:
        return "bg-slate-800 text-white dark:bg-slate-700";
    }
  }
</script>

<div class="fixed bottom-20 right-6 z-50 flex flex-col gap-2 pointer-events-none">
  {#each toasts as toast (toast.id)}
    <div
      class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl
             animate-[slideIn_0.3s_ease-out] {getTypeClasses(toast.type)}"
      role="alert"
    >
      {#if toast.type === "success"}
        <IconCheckCircleRegular class="w-5 h-5 flex-shrink-0" />
      {:else if toast.type === "error"}
        <IconXCircleRegular class="w-5 h-5 flex-shrink-0" />
      {:else if toast.type === "warning"}
        <IconWarningRegular class="w-5 h-5 flex-shrink-0" />
      {:else}
        <IconInfoRegular class="w-5 h-5 flex-shrink-0" />
      {/if}
      <span class="text-sm font-medium">{toast.message}</span>
      <button
        onclick={() => dismiss(toast.id)}
        class="ml-2 opacity-70 hover:opacity-100"
        aria-label="Dismiss"
      >
        <IconXRegular class="w-4 h-4" />
      </button>
    </div>
  {/each}
</div>

<style>
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>


