import { verifyToken } from "$lib/server/auth.js";
import { json } from "@sveltejs/kit";

export async function POST({ cookies, request }) {
  const token = cookies.get("token");
  const pb = await verifyToken(token);

  if (pb.authStore.isValid) {
    const body = await request.json();
    const record = await pb
      .collection("stars")
      .getFirstListItem(`storyId = ${body.storyId}`);

    await pb.collection("stars").delete(record.id);

    return json({ message: "Star deleted successfully!" }, { status: 200 });
  }

  return json({ message: "User is not signed in" }, { status: 400 });
}
