import type { UserType } from "$lib/UserType";
import type { Cookies } from "@sveltejs/kit";
import Pocketbase from "pocketbase";

const DB_URL = "https://server.eppeque.dev";

export async function verifyToken(
  token: string | undefined
): Promise<Pocketbase> {
  const pb = new Pocketbase(DB_URL);

  if (!token) {
    return pb;
  }

  pb.authStore.loadFromCookie(token);
  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }

  return pb;
}

export async function createAccount(user: UserType, cookies: Cookies) {
  const pb = new Pocketbase(DB_URL);
  await pb.collection("users").create(user);
  await signIn(user.email, user.password, cookies);
}

export async function signIn(
  email: string,
  password: string,
  cookies: Cookies
) {
  const pb = new Pocketbase(DB_URL);

  await pb.collection("users").authWithPassword(email, password);
  const value = pb.authStore.exportToCookie();

  cookies.set("token", value, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
