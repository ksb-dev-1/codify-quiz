"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function fetchQuestionsFromDB({
  userId,
  status,
  difficulty,
  topic,
  page = 1,
  limit = 10,
}: {
  userId: string;
  status?: string;
  difficulty?: string;
  topic?: string;
  page?: number;
  limit?: number;
}) {
  try {
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

    // 🔹 Filter by Topic
    if (topic) {
      const topicData = await prisma.topic.findUnique({
        where: { name: topic },
      });

      if (!topicData) {
        throw new Error("Topic not found");
      }

      whereClause.topicId = topicData.id;
    }

    // 🔹 Filter by Difficulty
    if (difficulty) {
      whereClause.difficulty = difficulty.toUpperCase(); // Ensure enum compatibility
    }

    // 🔹 Fetch Questions (Selecting topic name separately)
    const allQuestions = await prisma.question.findMany({
      where: whereClause,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        qNo: true,
        difficulty: true,
        isPremium: true,
        topic: {
          select: { name: true }, // ✅ Only fetch topic name
        },
      },
      orderBy: { qNo: "asc" }, // Sort by question number
    });

    if (!allQuestions.length) {
      return { success: true, questions: [], totalPages: 0, length: 0 };
    }

    // 🔹 Fetch Question Statuses
    const questionIds = allQuestions.map((q) => q.id);
    const questionStatuses = await prisma.questionStatus.findMany({
      where: { userId, questionId: { in: questionIds } },
      select: { questionId: true, status: true },
    });

    // 🔹 Fetch Saved Questions
    const savedQuestions = await prisma.savedQuestion.findMany({
      where: { userId, questionId: { in: questionIds } },
      select: { questionId: true },
    });

    // 🔹 Convert saved questions to Set
    const savedQuestionSet = new Set(savedQuestions.map((sq) => sq.questionId));

    // 🔹 Map statuses
    const statusMap = new Map(
      questionStatuses.map((qs) => [qs.questionId, qs.status])
    );

    // 🔹 Attach Status & Saved Status to Questions
    let questionsWithStatus = allQuestions.map(({ topic, ...q }) => ({
      ...q,
      topicName: topic?.name || "", // Extract topic name
      status: statusMap.get(q.id) || "TODO", // Attach status
      isSaved: savedQuestionSet.has(q.id), // Attach isSaved
    }));

    // 🔹 Apply Status Filter
    if (status) {
      questionsWithStatus = questionsWithStatus.filter(
        (q) => q.status.toUpperCase() === status.toUpperCase()
      );
    }

    // 🔹 Pagination Logic
    const totalCount = questionsWithStatus.length;
    const totalPages = Math.ceil(totalCount / limit);
    const paginatedQuestions = questionsWithStatus.slice(
      (page - 1) * limit,
      page * limit
    );

    return {
      success: true,
      questions: paginatedQuestions,
      totalPages,
      length: paginatedQuestions.length,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      message: "Failed to fetch questions",
      error: errorMessage,
    };
  }
}

// Cached function
const fetchQuestionsServerAction = unstable_cache(
  fetchQuestionsFromDB,
  ["questions"], // This is the tag that must match in revalidateTag
  {
    revalidate: false, // Keeps data cached indefinitely
    tags: ["questions"], // Explicitly add tags
  }
);

export default fetchQuestionsServerAction;
