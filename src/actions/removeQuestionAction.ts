"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export default async function removeQuestionAction(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  const questionID = formData.get("questionID") as string;
  if (!questionID) throw new Error("Invalid question ID");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/questions/${questionID}/remove`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    }
  );

  if (!response.ok) {
    const jsonResponse = await response.json();
    throw new Error(jsonResponse.message);
  }

  revalidatePath("/pages/questions", "page");
  revalidatePath(`/pages/question/${questionID}`, "page");
  revalidatePath("/pages/saved", "page");

  return response.json();
}
