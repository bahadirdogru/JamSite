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
<ul class="space-y-6">
  {#each visiblePosts as post}
    <li class="border-b border-jam-border dark:border-jam-border-dark pb-6">
      <a href="{base}{langPrefix}/blog/{post.id}/" class="group">
        <h2 class="text-xl font-semibold text-jam-text dark:text-jam-text-dark group-hover:text-jam-primary transition-colors">
          {post.title}
        </h2>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{post.description}</p>
        <time class="text-xs text-slate-400 dark:text-slate-500" datetime={post.date}>
          {post.dateFormatted}
        </time>
      </a>
    </li>
  {/each}
</ul>
{#if showLoadMore}
  <div class="flex justify-center pt-8">
    <button
      type="button"
      onclick={() => (visibleCount = Math.min(visibleCount + initialCount, posts.length))}
      class="px-6 py-3 rounded-lg font-medium bg-jam-primary text-white hover:bg-blue-600 transition-colors"
    >
      {loadMoreLabel}
    </button>
  </div>
{/if}
</ErrorBoundary>
