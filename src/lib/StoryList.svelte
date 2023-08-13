<script lang="ts">
  import Story from "./Story.svelte";
  import type { StoryType } from "./StoryType";
  import { stars } from "./stars";

  export let stories: StoryType[];
</script>

<ul class="py-4 flex flex-col gap-10 md:grid md:grid-cols-2">
  {#each stories as story, index (story.id)}
    <Story
      {story}
      index={index + 1}
      isStarred={$stars?.map((s) => s.id).includes(story.id)}
    />
  {:else}
    <h4 class="text-xl">You have no stars yet.</h4>
  {/each}
</ul>
