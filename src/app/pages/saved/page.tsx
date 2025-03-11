import { Suspense } from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

// server-actions
import fetchSavedQuestionsServerAction from "@/server-actions/fetchSavedQuestionsServerAction";

// components
import Container from "@/components/shared/Container";
import SavedQuestionListSkeleton from "@/components/skeletons/SavedQuestionListSkeleton";
import SavedQuestionList from "@/components/SavedQuestionList";

export const metadata: Metadata = {
  title: "Saved",
  description: "List of saved questions by user",
};

export default async function SavedPage() {
  // Fetch session
  const session = await auth();
  const userId = session?.user?.id;

  // If user not signed in, redirect to sign-in page
  if (!userId) redirect("/pages/signin");

  // Fetch saved questions (pass userId directly)
  const savedQuestionsData = await fetchSavedQuestionsServerAction(userId);
  const savedQuestions = savedQuestionsData?.savedQuestions || [];

  return (
    <Container>
      <Suspense fallback={<SavedQuestionListSkeleton text="Saved Questions" />}>
        <SavedQuestionList savedQuestions={savedQuestions} />
      </Suspense>
    </Container>
  );
}
