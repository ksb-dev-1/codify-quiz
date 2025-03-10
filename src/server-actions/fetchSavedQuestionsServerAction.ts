"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function fetchSavedQuestionsFromDB(userId: string) {
  if (!userId) {
    return { success: false, message: "Unauthorized", status: 401 };
  }

  try {
    // Fetch saved questions with details
    const savedQuestions = await prisma.savedQuestion.findMany({
      where: { userId },
      include: {
        question: {
          select: {
            id: true,
            qNo: true,
            question: true,
            difficulty: true,
            isPremium: true,
            topic: { select: { name: true } },
          },
        },
      },
    });

    if (savedQuestions.length === 0) {
      return { success: true, savedQuestions: [], status: "success" };
    }

    // Extract question IDs
    const questionIds = savedQuestions.map((q) => q.question.id);

    // Fetch question statuses
    const questionStatuses = await prisma.questionStatus.findMany({
      where: {
        userId,
        questionId: { in: questionIds },
      },
      select: {
        questionId: true,
        status: true,
      },
    });

    // Map statuses to question IDs
    const statusMap = new Map(
      questionStatuses.map((qs) => [qs.questionId, qs.status])
    );

    // Format saved questions with status
    const formattedSavedQuestions = savedQuestions.map((q) => ({
      id: q.question.id,
      qNo: q.question.qNo,
      question: q.question.question,
      difficulty: q.question.difficulty,
      isPremium: q.question.isPremium,
      topicName: q.question.topic?.name || "",
      status: statusMap.get(q.question.id) || "TODO",
    }));

    return {
      success: true,
      savedQuestions: formattedSavedQuestions,
      status: "success",
    };
  } catch (error) {
    console.error("Failed to fetch saved questions:", error);
    return {
      success: false,
      message: "Failed to fetch saved questions",
      error: error instanceof Error ? error.message : "Unknown error",
      status: "error",
    };
  }
}

// Cached function
const fetchSavedQuestionsServerAction = unstable_cache(
  fetchSavedQuestionsFromDB,
  ["saved-questions"], // This is the tag that must match in revalidateTag
  {
    revalidate: false, // Keeps data cached indefinitely
    tags: ["saved-questions"], // Explicitly add tags
  }
);

export default fetchSavedQuestionsServerAction;
