import { signIn, verifyToken } from "$lib/server/auth.js";
import { fail, redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  const token = cookies.get("token");
  const pb = await verifyToken(token);

  if (pb.authStore.isValid) {
    throw redirect(308, "/");
  }
}

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!email || !password) {
      return fail(400, { email, missing: true });
    }

    try {
      await signIn(email, password, cookies);
    } catch (e) {
      return fail(400, { email, incorrect: true });
    }

    throw redirect(303, "/");
  },
};
