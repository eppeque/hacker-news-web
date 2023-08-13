import { verifyToken } from "$lib/server/auth.js";

type StarType = {
  id: string;
  storyId: number;
  user: string;
};

export async function load({ cookies }) {
  const token = cookies.get("token");
  const pb = await verifyToken(token);

  if (pb.authStore.isValid) {
    const stars = await pb.collection("stars").getList<StarType>(1, 50, {
      filter: `user = "${pb.authStore.model?.id}"`,
    });

    return {
      stars: stars.items.map((s) => s.storyId),
    };
  }
}
