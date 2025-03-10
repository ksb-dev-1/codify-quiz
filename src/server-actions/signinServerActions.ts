"use server";

import { signIn } from "@/auth";

export async function googleSigninServerAction() {
  return await signIn("google");
}

export async function githubSigninServerAction() {
  return await signIn("github");
}
