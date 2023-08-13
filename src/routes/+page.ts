import type { StoryType } from "$lib/StoryType";

enum Story {
  New,
  Top,
}

export async function load({ url, fetch, data }) {
  const ids = await fetchIds(
    url.searchParams.get("type") === "new" ? Story.New : Story.Top,
    fetch
  );
  const stories = ids.map((id) => fetchStory(id, fetch));

  const stars = data?.stars?.map((id) => fetchStory(id, fetch));

  return {
    stories: await Promise.all(stories),
    stars: stars ? await Promise.all(stars) : stars,
  };
}

async function fetchIds(
  storyType: Story,
  fetch: (
    input: URL | RequestInfo,
    init?: RequestInit | undefined
  ) => Promise<Response>
): Promise<number[]> {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/${
      storyType === Story.Top ? "topstories" : "newstories"
    }.json`
  );

  if (res.ok) {
    const ids = (await res.json()) as number[];
    return ids.slice(0, 20);
  }

  return [];
}

async function fetchStory(
  id: number,
  fetch: (
    input: URL | RequestInfo,
    init?: RequestInit | undefined
  ) => Promise<Response>
): Promise<StoryType> {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  if (res.ok) {
    const story = res.json();
    return story;
  }

  throw Error("No story found for the given id");
}
