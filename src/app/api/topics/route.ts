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

    const topics = await prisma.topic.findMany();

    if (!topics.length) {
      return NextResponse.json({
        success: true,
        topics: [],
        length: 0,
      });
    }

    return NextResponse.json({
      success: true,
      topics,
      length: topics.length,
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
