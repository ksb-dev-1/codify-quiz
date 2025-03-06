import { Metadata } from "next";

// components
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Codify",
  description: "Landing page",
};

export default function HomePage() {
  return <LandingPage />;
}
