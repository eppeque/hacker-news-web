import type { UserType } from "$lib/UserType.js";
import { createAccount, verifyToken } from "$lib/server/auth.js";
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
    const user = parseUser(data);

    if (
      !user.email ||
      !user.username ||
      !user.password ||
      !user.passwordConfirm
    ) {
      return fail(400, {
        email: user.email,
        username: user.username,
        missing: true,
      });
    }

    if (user.password !== user.passwordConfirm) {
      return fail(400, {
        email: user.email,
        username: user.username,
        mismatch: true,
      });
    }

    try {
      await createAccount(user, cookies);
    } catch (_) {
      return fail(400, {
        email: user.email,
        username: user.username,
        incorrect: true,
      });
    }

    throw redirect(303, "/");
  },
};

function parseUser(data: FormData): UserType {
  return {
    email: data.get("email") as string,
    username: data.get("username") as string,
    password: data.get("password") as string,
    passwordConfirm: data.get("confirm-password") as string,
  };
}
