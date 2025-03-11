import { redirect } from "next/navigation";
import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";

export default async function QuestionDetailPage() {
  // Fetch session
  const session = await auth();
  const userId = session?.user?.id;

  // If user not signed in redirect to signin page
  if (!userId) redirect("/pages/signin");

  return <Container>Premium</Container>;
}
