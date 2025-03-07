import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure you have a Prisma client setup

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await params;
    const { userId } = await req.json();

    // Validate user
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Validate question ID (assuming it's a string UUID or number, Prisma handles validation)
    if (!questionId) {
      return NextResponse.json(
        { success: false, message: "Invalid question ID" },
        { status: 400 }
      );
    }

    // Check if the question is already saved
    const existingSaved = await prisma.savedQuestion.findFirst({
      where: { questionId, userId },
    });

    if (existingSaved) {
      return NextResponse.json(
        { success: false, message: "Question is already saved" },
        { status: 400 }
      );
    }

    // Save question
    await prisma.savedQuestion.create({
      data: { questionId, userId },
    });

    return NextResponse.json(
      { success: true, message: "Question saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save question:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
