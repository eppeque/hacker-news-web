<script lang="ts">
  import { page } from "$app/stores";
  import StoryList from "$lib/StoryList.svelte";
  import { stars } from "$lib/stars.js";

  export let data;

  $: title =
    $page.url.searchParams.get("type") === "new"
      ? "New Stories"
      : "Top Stories";

  stars.set(data.stars);
</script>

<svelte:head>
  <title>{title} - Hacker News</title>
</svelte:head>

<h1 class="py-2 text-5xl text-orange-600">{title}</h1>
<StoryList stories={data.stories} />
