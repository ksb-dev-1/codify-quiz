// "use server";

// import { revalidatePath } from "next/cache";
// import { auth } from "@/auth";

// export default async function saveQuestionAction(formData: FormData) {
//   const session = await auth();
//   const userId = session?.user?.id;

//   if (!userId) throw new Error("Unauthorized");

//   const questionId = formData.get("questionId") as string;
//   if (!questionId) throw new Error("Invalid question Id");

//   const response = await fetch(
//     `${process.env.BASE_URL}/api/questions/${questionId}/save`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId }),
//     }
//   );

//   if (!response.ok) {
//     const jsonResponse = await response.json();
//     throw new Error(jsonResponse.message);
//   }

//   revalidatePath("/pages/questions", "page");
//   revalidatePath(`/pages/question/${questionId}`, "page");
//   revalidatePath("/pages/saved", "page");

//   return response.json();
// }

"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function saveQuestionAction(formData: FormData) {
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
      throw new Error("Question is already saved");
    }

    // Save question
    await prisma.savedQuestion.create({
      data: { questionId, userId },
    });

    // Revalidate paths
    revalidatePath("/pages/questions", "page");
    revalidatePath(`/pages/question/${questionId}`, "page");
    revalidatePath("/pages/saved", "page");
  } catch (error) {
    console.error("Failed to save question:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
