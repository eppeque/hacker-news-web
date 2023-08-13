import { verifyToken } from "$lib/server/auth.js";
import { json } from "@sveltejs/kit";

export async function POST({ cookies, request }) {
  const token = cookies.get("token");
  const pb = await verifyToken(token);

  if (pb.authStore.isValid) {
    const body = await request.json();
    const data = {
      storyId: body.storyId,
      user: pb.authStore.model!.id,
    };

    await pb.collection("stars").create(data);

    return json({ message: "Star created successfully!" }, { status: 200 });
  }

  return json({ message: "User is not signed in" }, { status: 400 });
}
