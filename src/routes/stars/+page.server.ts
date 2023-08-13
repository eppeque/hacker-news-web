import { verifyToken } from "$lib/server/auth.js";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  const token = cookies.get("token");
  const pb = await verifyToken(token);

  if (!pb.authStore.isValid) {
    throw redirect(308, "/");
  }
}
