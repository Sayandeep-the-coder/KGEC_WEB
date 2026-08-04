"use server";

import { signIn } from "@/lib/auth";

export async function loginAction() {
  await signIn("google", { redirectTo: "/admin" });
}
