<script>
  import ErrorBoundary from "./ErrorBoundary.svelte";
  /** Blog list with "Load more". postsJson: array of { id, title, description, date, dateFormatted }. */
  let {
    postsJson = "[]",
    base = "",
    langPrefix = "",
    initialCount = 6,
    loadMoreLabel = "Daha fazla",
    loadingLabel = "Yükleniyor...",
    errorMessage = "Bir hata oluştu.",
    retryLabel = "Tekrar dene",
  } = $props();

  let posts = $state([]);
  let visibleCount = $state(initialCount);

  $effect(() => {
    try {
      posts = JSON.parse(postsJson);
    } catch {
      posts = [];
    }
  });

  const visiblePosts = $derived(posts.slice(0, visibleCount));
  const hasMore = $derived(visibleCount < posts.length);
  const showLoadMore = $derived(hasMore && posts.length > initialCount);
</script>

<ErrorBoundary message={errorMessage} retryLabel={retryLabel}>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {#each visiblePosts as post}
    <article class="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700 flex flex-col">
      <a href="{base}{langPrefix}/blog/{post.id}/" class="group flex-1 flex flex-col">
        {#if post.image}
          <div class="aspect-video overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        {/if}
        <div class="p-5 flex-1 flex flex-col">
          <div class="flex items-center gap-2 mb-3">
            <time class="text-xs text-slate-500 dark:text-slate-400" datetime={post.date}>
              {post.dateFormatted}
            </time>
          </div>
          <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-tight">
            {post.title}
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
            {post.description}
          </p>
          <span class="text-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:underline">
            {loadMoreLabel === "Daha fazla" ? "Devamını Oku" : "Read More"}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" class="transition-transform group-hover:translate-x-1"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
          </span>
        </div>
      </a>
    </article>
  {/each}
</div>
{#if showLoadMore}
  <div class="flex justify-center pt-12">
    <button
      type="button"
      onclick={() => (visibleCount = Math.min(visibleCount + initialCount, posts.length))}
      class="px-8 py-3 rounded-full font-bold bg-primary text-white hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20"
    >
      {loadMoreLabel}
    </button>
  </div>
{/if}
</ErrorBoundary>


