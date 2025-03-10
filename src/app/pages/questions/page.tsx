import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Server Actions
import fetchQuestionsServerAction from "@/server-actions/fetchQuestionsServerAction";
import fetchTopicsServerAction from "@/server-actions/fetchTopicsServerAction";

// Components
import Container from "@/components/shared/Container";
import QuestionListSkeleton from "@/components/skeletons/QuestionListSkeleton";
import DifficultyFilter from "@/components/DifficultyFilter";
import StatusFilter from "@/components/StatusFilter";
import TopicsLoadingSkeleton from "@/components/skeletons/TopicsLoadingSkeleton";
import TopicsFilter from "@/components/TopicsFilter";
import FilterTags from "@/components/FilterTags";
import QuestionList from "@/components/QuestionList";
import Pagination from "@/components/Pagination";

export const metadata: Metadata = {
  title: "Questions",
  description: "List of questions",
};

interface QuestionsPageProps {
  userId: string;
  currentSearchParams?: {
    page?: string;
    status?: string;
    difficulty?: string;
    topic?: string;
  };
}

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
      <QuestionsPage
        userId={userId}
        currentSearchParams={currentSearchParams}
      />
    </Container>
  );
}

async function QuestionsPage({
  userId,
  currentSearchParams,
}: QuestionsPageProps) {
  const { page, status, difficulty, topic } = currentSearchParams || {};
  const isFilterApplied = page || status || difficulty || topic;

  // ✅ Fetch data using Server Actions
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

  const questions = questionsData?.questions || [];
  const totalPages = questionsData?.totalPages || 1;
  const topics = topicsData?.topics || [];

  return (
    <>
      <div className="w-full grid md:grid-cols-2 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <StatusFilter />
          <DifficultyFilter />
        </div>

        <Suspense fallback={<TopicsLoadingSkeleton />}>
          <TopicsFilter topics={topics} />
        </Suspense>
      </div>

      {(status || difficulty || topic) && (
        <FilterTags
          currentStatus={status}
          currentDifficulty={difficulty}
          currentTopic={topic}
        />
      )}

      <Suspense
        fallback={<QuestionListSkeleton text="Questions" marginTop="8" />}
      >
        <QuestionList questions={questions} isFilterApplied={isFilterApplied} />
      </Suspense>

      <div className="flex justify-start">
        {totalPages > 1 && (
          <Pagination currentPage={Number(page)} totalPages={totalPages} />
        )}
      </div>
    </>
  );
}
