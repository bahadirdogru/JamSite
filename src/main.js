import "./app.css";
import "./components/ThemeToggle.svelte";
import "./components/Slider.svelte";
import "./components/Counter.svelte";
import "./components/Search.svelte";
import "./components/Stories.svelte";
import "./components/ProductCarousel.svelte";

if (document.startViewTransition) {
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a[href]");
    if (!anchor || anchor.origin !== location.origin) return;
    e.preventDefault();
    document.startViewTransition(() => {
      location.href = anchor.href;
    });
  });
}
