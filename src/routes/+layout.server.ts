import { verifyToken } from "$lib/server/auth.js";

export async function load({ cookies }) {
  const token = cookies.get("token");

  if (!token) {
    return {
      isConnected: false,
    };
  }

  const pb = await verifyToken(token);
  return {
    isConnected: pb.authStore.isValid,
  };
}
