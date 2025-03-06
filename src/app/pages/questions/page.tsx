import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
  title: "Questions",
  description: "List of questions",
};

async function fetchQuestions(params: URLSearchParams) {
  const url = `${process.env.BASE_URL}/api/questions?${params.toString()}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  return res.json();
}

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

  // Construct URLSearchParams with query parameters
  const params = new URLSearchParams({
    ...(status && { status }),
    ...(difficulty && { difficulty }),
    ...(topic && { topic }),
    page: String(page || 1),
    limit: "10",
    ...(userId && { userId }), // Include userId only if it exists
  });

  // Fetch questions using the constructed params
  const questions = await fetchQuestions(params);
  console.log(questions);

  return <Container>Questions Page</Container>;
}
