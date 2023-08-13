<script lang="ts">
  import { get } from "svelte/store";
  import { formatTime, type StoryType } from "./StoryType";
  import { stars } from "./stars";

  export let story: StoryType;
  export let index: number;
  export let isStarred: boolean | undefined;

  let formattedTime = formatTime(story.time);

  async function updateStar() {
    if (isStarred) {
      await removeStar();
    } else {
      await addStar();
    }
  }

  async function addStar() {
    const response = await fetch("/stars/create", {
      method: "POST",
      body: JSON.stringify({ storyId: story.id }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      const newStars = get(stars)!;
      newStars.push(story);
      stars.set(newStars);
    }
  }

  async function removeStar() {
    const response = await fetch("/stars/delete", {
      method: "POST",
      body: JSON.stringify({ storyId: story.id }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.ok) {
      const newStars = get(stars)!;
      const index = newStars.findIndex((s) => s.id === story.id);
      newStars.splice(index, 1);
      stars.set(newStars);
    }
  }
</script>

<li class="p-5 md:p-10 bg-gray-100 rounded-lg">
  <div class="flex items-center">
    <span class="text-3xl lg:text-4xl text-orange-600">{index}.</span>
    <div class="w-10" />
    <h3 class="text-2xl lg:text-3xl">
      <a
        href={story.url}
        class="hover:text-orange-600 hover:underline visited:text-gray-600"
        >{story.title}</a
      >
    </h3>
  </div>
  <div class="flex items-center gap-2">
    <p class="py-2 text-lg lg:text-xl">
      By {story.by} | {story.score} points | {formattedTime}
    </p>
    {#if isStarred !== undefined}
      <button
        class:text-yellow-400={isStarred}
        title="Star this story"
        class="px-2 material-icons"
        on:click={updateStar}
        >{isStarred ? "star" : "star_outlined"}
      </button>
    {/if}
  </div>
</li>
