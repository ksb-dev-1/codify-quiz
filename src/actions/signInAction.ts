"use server";

import { signIn } from "@/auth";

export async function googleSigninAction() {
  return await signIn("google");
}

export async function githubSigninAction() {
  return await signIn("github");
}
