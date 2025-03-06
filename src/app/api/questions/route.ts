import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// export const dynamic = 'force-static';

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { status, difficulty, topic, page, limit } = Object.fromEntries(
      new URL(req.url).searchParams
    );

    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

    // 🔹 Filter by Topic
    if (topic) {
      const topicData = await prisma.topic.findUnique({
        where: { name: topic },
      });
      if (!topicData) {
        return NextResponse.json(
          { success: false, message: "Topic not found" },
          { status: 404 }
        );
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
        question: true,
        qNo: true,
        codeSnippet: true,
        difficulty: true,
        //topicId: true,
        isPremium: true,
        topic: {
          select: { name: true }, // ✅ Only fetch topic name
        },
      },
      orderBy: { qNo: "asc" }, // Sort by question number
    });

    if (!allQuestions.length) {
      return NextResponse.json({
        success: true,
        questions: [],
        totalPages: 0,
        length: 0,
      });
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

    // 🔹 Attach Status & Saved Status to Questions & **Remove `topic` Object**
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
    const totalPages = Math.ceil(totalCount / limitNumber);
    const paginatedQuestions = questionsWithStatus.slice(
      (pageNumber - 1) * limitNumber,
      pageNumber * limitNumber
    );

    return NextResponse.json({
      success: true,
      questions: paginatedQuestions,
      totalPages,
      length: paginatedQuestions.length,
    });
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch questions",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
