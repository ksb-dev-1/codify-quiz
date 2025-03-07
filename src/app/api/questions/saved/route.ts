import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

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
      return NextResponse.json(
        { success: true, savedQuestions: [] },
        { status: 200 }
      );
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

    // Format saved questions with status and qNo
    const formattedSavedQuestions = savedQuestions.map((q) => ({
      id: q.question.id,
      qNo: q.question.qNo,
      question: q.question.question,
      difficulty: q.question.difficulty,
      isPremium: q.question.isPremium,
      topicName: q.question.topic?.name || "",
      status: statusMap.get(q.question.id) || "TODO",
    }));

    return NextResponse.json(
      {
        success: true,
        savedQuestions: formattedSavedQuestions,
        status: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch saved questions:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch saved questions",
        error: error instanceof Error ? error.message : "Unknown error",
        status: "error",
      },
      { status: 500 }
    );
  }
}
