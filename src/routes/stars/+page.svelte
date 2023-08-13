<script>
  import StoryList from "$lib/StoryList.svelte";
  import { stars } from "$lib/stars";
</script>

<svelte:head>
  <title>Your Stars - Hacker News</title>
</svelte:head>

<h1 class="py-2 text-5xl text-orange-600">Your Stars</h1>
<StoryList stories={$stars ?? []} />
