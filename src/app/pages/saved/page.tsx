import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";
import SavedQuestionList from "@/components/SavedQuestionList";

export const metadata: Metadata = {
  title: "Saved",
  description: "List of saved questions by user",
};

async function fetchSavedQuestions(savedQuestionsParams: URLSearchParams) {
  const url = `${
    process.env.BASE_URL
  }/api/questions/saved?${savedQuestionsParams.toString()}`;

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

export default async function SavedPage() {
  // Fetch session
  const session = await auth();
  const userId = session?.user?.id;

  // If user not signed in redirect to signin page
  if (!userId) redirect("/pages/signin");

  const savedQuestionsParams = new URLSearchParams({
    ...(userId && { userId }),
  });

  const savedQuestionsData = await fetchSavedQuestions(savedQuestionsParams);

  const savedQuestions = savedQuestionsData?.savedQuestions || [];

  return (
    <Container>
      <SavedQuestionList savedQuestions={savedQuestions} />
    </Container>
  );
}
