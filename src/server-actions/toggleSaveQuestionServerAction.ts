"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function toggleSaveQuestionServerAction(
  formData: FormData
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  const questionId = formData.get("questionId") as string;
  if (!questionId) throw new Error("Invalid question Id");

  try {
    // Check if already saved
    const existingSaved = await prisma.savedQuestion.findFirst({
      where: { questionId, userId },
    });

    if (existingSaved) {
      // ❌ If already saved, remove it
      await prisma.savedQuestion.delete({
        where: { id: existingSaved.id },
      });
    } else {
      // ✅ If not saved, create a new saved question entry
      await prisma.savedQuestion.create({
        data: { questionId, userId },
      });
    }

    // Revalidate paths
    revalidateTag("questions");
    revalidateTag("saved-questions");
    //revalidatePath("/pages/questions", "page");
    revalidatePath(`/pages/question/${questionId}`, "page");
    revalidatePath("/pages/saved", "page");
  } catch (error) {
    console.error("Failed to toggle saved question:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
