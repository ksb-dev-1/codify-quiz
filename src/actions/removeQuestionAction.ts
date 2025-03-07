// "use server";

// import { revalidatePath } from "next/cache";
// import { auth } from "@/auth";

// export default async function removeQuestionAction(formData: FormData) {
//   const session = await auth();
//   const userId = session?.user?.id;

//   if (!userId) throw new Error("Unauthorized");

//   const questionId = formData.get("questionId") as string;
//   if (!questionId) throw new Error("Invalid question Id");

//   const response = await fetch(
//     `${process.env.BASE_URL}/api/questions/${questionId}/remove`,
//     {
//       method: "DELETE",
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

export default async function removeQuestionAction(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  const questionId = formData.get("questionId") as string;
  if (!questionId) throw new Error("Invalid question Id");

  try {
    // Check if question is saved
    const existingSaved = await prisma.savedQuestion.findFirst({
      where: { questionId, userId },
    });

    if (!existingSaved) {
      throw new Error("Question is not saved");
    }

    // Remove the saved question
    await prisma.savedQuestion.delete({ where: { id: existingSaved.id } });

    // Revalidate paths
    revalidatePath("/pages/questions", "page");
    revalidatePath(`/pages/question/${questionId}`, "page");
    revalidatePath("/pages/saved", "page");
  } catch (error) {
    console.error("Failed to remove question:", error);
    throw new Error(
      error instanceof Error ? error.message : "Internal server error"
    );
  }
}
