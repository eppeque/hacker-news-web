import { writable } from "svelte/store";
import type { StoryType } from "./StoryType";

export const stars = writable<StoryType[] | undefined>();
