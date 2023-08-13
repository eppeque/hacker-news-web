export type StoryType = {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
};

export function formatTime(time: number) {
  const difference = Math.round(Date.now() / 1000 - time);

  if (difference < 60) {
    return `${difference} second(s) ago`;
  }

  if (difference < 3600) {
    return `${Math.round(difference / 60)} minute(s) ago`;
  }

  if (difference < 86400) {
    return `${Math.round(difference / 3600)} hour(s) ago`;
  }

  return `${Math.round(difference / 86400)} day(s) ago`;
}
