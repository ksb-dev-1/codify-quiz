async function fetchQuestions(params: URLSearchParams) {
  const url = `${process.env.BASE_URL}/api/questions?${params.toString()}`;
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

export default async function QuestionList({
  userId,
  currentPage,
  currentStatus,
  currentDifficulty,
  currentTopic,
}: {
  userId: string | undefined;
  currentPage: string | undefined;
  currentStatus: string | undefined;
  currentDifficulty: string | undefined;
  currentTopic: string | undefined;
}) {
  // Construct URLSearchParams with query parameters
  const params = new URLSearchParams({
    ...(userId && { userId }),
    ...(currentStatus && { status: currentStatus }),
    ...(currentDifficulty && { difficulty: currentDifficulty }),
    ...(currentTopic && { topic: currentTopic }),
    page: String(currentPage || 1),
    limit: "10",
  });

  // Fetch questions using the constructed params
  const questions = await fetchQuestions(params);

  return <div>{JSON.stringify(questions)}</div>;
}
