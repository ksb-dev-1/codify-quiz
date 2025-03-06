import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

// types
import { Question, Topic } from "@/types/types";

// components
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

async function fetchQuestions(questionsParams: URLSearchParams) {
  const url = `${
    process.env.BASE_URL
  }/api/questions?${questionsParams.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return res.json();
}

async function fetchTopics(topicsParams: URLSearchParams) {
  const url = `${process.env.BASE_URL}/api/topics?${topicsParams.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch topics");
  }

  return res.json();
}

export default async function QuestionsPageWrapper({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Fetch session
  const session = await auth();
  const userId = session?.user?.id;

  // If user not signed in redirect to signin page
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

  const questionsParams = new URLSearchParams({
    ...(userId && { userId }),
    ...(status && { status }),
    ...(difficulty && { difficulty }),
    ...(topic && { topic }),
    page: String(page || 1),
    limit: "10",
  });

  const topicsParams = new URLSearchParams({
    ...(userId && { userId }),
  });

  // Fetch questions and topics
  const [questionsData, topicsData] = await Promise.all([
    fetchQuestions(questionsParams),
    fetchTopics(topicsParams),
  ]);
  const questions: Question[] = questionsData?.questions || [];
  const totalPages = questionsData?.totalPages || 1;
  const topics: Topic[] = topicsData?.topics || [];

  return (
    <Suspense
      fallback={<QuestionListSkeleton text="Questions" marginTop="8" />}
    >
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

      <QuestionList questions={questions} isFilterApplied={isFilterApplied} />

      <div className="flex justify-start">
        {totalPages > 1 && (
          <Pagination
            //questionsLoading={questionsLoading}
            currentPage={Number(page)}
            totalPages={totalPages}
          />
        )}
      </div>
    </Suspense>
  );
}
