<svelte:options customElement={{ tag: "jam-copy-code", shadow: "none" }} />

<script>
  import { onMount } from "svelte";

  let { copied_text = "Copied!", copy_text = "Copy" } = $props();

  onMount(() => {
    const codeBlocks = document.querySelectorAll("pre > code");

    codeBlocks.forEach((code) => {
      const pre = code.parentElement;
      if (!pre || pre.querySelector(".copy-btn")) return;

      pre.style.position = "relative";

      const btn = document.createElement("button");
      btn.className = `copy-btn absolute top-2 right-2 px-2 py-1 text-xs
                       bg-slate-700 hover:bg-slate-600 text-slate-300
                       rounded opacity-0 group-hover:opacity-100 transition-opacity
                       focus:outline-none focus:ring-2 focus:ring-jam-primary`;
      btn.textContent = copy_text;
      btn.setAttribute("aria-label", copy_text);

      pre.classList.add("group");

      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.textContent || "");
          btn.textContent = copied_text;
          window.dispatchEvent(
            new CustomEvent("jam:toast", {
              detail: { message: copied_text, type: "success" },
            })
          );
          setTimeout(() => {
            btn.textContent = copy_text;
          }, 2000);
        } catch {
          window.dispatchEvent(
            new CustomEvent("jam:toast", {
              detail: { message: "Copy failed", type: "error" },
            })
          );
        }
      });

      pre.appendChild(btn);
    });
  });
</script>
