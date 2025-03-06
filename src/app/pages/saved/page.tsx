import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
  title: "Saved",
  description: "List of saved questions by user",
};

export default async function SavedPage() {
  // Fetch session
  const session = await auth();
  const userId = session?.user?.id;

  // If user not signed in redirect to signin page
  if (!userId) redirect("/pages/signin");

  return <Container>Saved Page</Container>;
}
