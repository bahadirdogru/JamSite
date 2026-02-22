import "./app.css";
import "./components/ThemeToggle.svelte";
import "./components/Slider.svelte";
import "./components/Counter.svelte";
import "./components/Search.svelte";
import "./components/Stories.svelte";
import "./components/ProductCarousel.svelte";
import "./components/ScrollProgress.svelte";
import "./components/BackToTop.svelte";
import "./components/Toast.svelte";
import "./components/CopyCode.svelte";
import "./components/Lightbox.svelte";
import "./components/TableOfContents.svelte";
import "./components/FavoriteButton.svelte";
import "./components/FavoritesList.svelte";
import "./components/FavoritesBadge.svelte";
import "./components/QuickView.svelte";
import "./components/RecentlyViewed.svelte";
import "./components/KeyboardShortcuts.svelte";
import "./components/CompareButton.svelte";
import "./components/CompareBar.svelte";
import "./components/ProductFilter.svelte";
import "./components/ReadingListButton.svelte";
import "./components/ReadingList.svelte";
import "./components/LazyImage.svelte";
import "./components/LoadMore.svelte";

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
