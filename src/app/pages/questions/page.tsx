import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Server Actions
import fetchQuestionsServerAction from "@/server-actions/fetchQuestionsServerAction";
import fetchTopicsServerAction from "@/server-actions/fetchTopicsServerAction";

// Components
import Container from "@/components/shared/Container";
import Questions from "@/components/Questions";
import QuestionListSkeleton from "@/components/skeletons/QuestionListSkeleton";

export const metadata: Metadata = {
  title: "Questions",
  description: "List of questions",
};

export default async function QuestionsPageWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // ✅ Fetch session
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/pages/signin");

  const currentSearchParams = await searchParams;

  return (
    <Container>
      <Suspense fallback={<QuestionListSkeleton text="Questions" />}>
        <QuestionsPage
          userId={userId}
          currentSearchParams={currentSearchParams}
        />
      </Suspense>
    </Container>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function QuestionsPage({ userId, currentSearchParams }: any) {
  const { page, status, difficulty, topic } = currentSearchParams || {};

  // ✅ Fetch data using Server Actions parallelly
  const [questionsData, topicsData] = await Promise.all([
    fetchQuestionsServerAction({
      userId,
      status,
      difficulty,
      topic,
      page: Number(page) || 1,
      limit: 12,
    }),
    fetchTopicsServerAction(userId),
  ]);

  const questionsError = questionsData?.error || "";
  const questions = questionsData?.questions || [];
  const totalPages = questionsData?.totalPages || 1;
  const topicsError = topicsData?.error || "";
  const topics = topicsData?.topics || [];

  return (
    <Questions
      userId={userId}
      currentPage={page}
      currentStatus={status}
      currentDifficulty={difficulty}
      currentTopic={topic}
      questionsError={questionsError}
      questions={questions}
      totalPages={totalPages}
      topicsError={topicsError}
      topics={topics}
    />
  );
}
