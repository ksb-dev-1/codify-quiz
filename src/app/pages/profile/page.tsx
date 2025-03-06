import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

// components
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
  title: "Profile",
  description: "User profile",
};

export default async function ProfilePage() {
  // Fetch the session and extract the user ID
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/pages/signin");

  return <Container>Profile Page</Container>;
}
