<script>
  import IconShareRegular from "phosphor-icons-svelte/IconShareRegular.svelte";

  let {
    title = "",
    text = "",
    url = typeof window !== "undefined" ? window.location.href : "",
    labelShare = "Share",
    labelCopy = "Copy link",
    labelCopied = "Link copied!",
  } = $props();

  let copied = $state(false);

  async function share() {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
    const shareTitle = title || (typeof document !== "undefined" ? document.title : "");
    const shareText = text || shareTitle;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") copyLink(shareUrl);
      }
    } else {
      copyLink(shareUrl);
    }
  }

  function copyLink(link) {
    const u = link || (typeof window !== "undefined" ? window.location.href : "");
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(u).then(() => {
      copied = true;
      setTimeout(() => (copied = false), 2000);
    });
  }
</script>

<button
  onclick={share}
  class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors"
  aria-label={labelShare}
>
  <IconShareRegular class="w-4 h-4" />
  {copied ? labelCopied : labelShare}
</button>


