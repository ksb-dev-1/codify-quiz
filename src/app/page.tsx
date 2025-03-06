import { Metadata } from "next";
import { auth } from "@/auth";

// components
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Codify",
  description: "Landing page",
};

export default async function HomePage() {
  // Fetch session
  const session = await auth();
  const userId = session?.user?.id;

  return <LandingPage userId={userId} />;
}
