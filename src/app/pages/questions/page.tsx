import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";
import QuestionList from "@/components/QuestionList";

export const metadata: Metadata = {
  title: "Questions",
  description: "List of questions",
};

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Fetch the session and extract the user ID
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/pages/signin");

  // Extract query parameters
  const currSearchParams = await searchParams;
  const { page, status, difficulty, topic } = currSearchParams;

  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <QuestionList
          userId={userId}
          currentPage={page}
          currentStatus={status}
          currentDifficulty={difficulty}
          currentTopic={topic}
        />
      </Suspense>
    </Container>
  );
}
