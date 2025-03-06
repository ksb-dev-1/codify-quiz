import Link from "next/link";

// components
import Container from "@/components/shared/Container";

export default function LandingPage({
  userId,
}: {
  userId: string | undefined;
}) {
  return (
    <Container>
      <header className="flex flex-col items-center">
        <h3 className="w-fit text-3xl font-extrabold py-4">
          Welcome to Codify
        </h3>

        <p>Your go to platform for learning javascript</p>

        <Link
          href={userId ? "/pages/questions?page=1" : "/pages/signin"}
          className="my-8 bg-primary text-white px-8 py-3 rounded-custom hover:tracking-widest transition-all"
        >
          Start Learning
        </Link>
      </header>

      <section className="mt-6 grid gap-8 sm:grid-cols-2">
        <div className="border bg-white rounded-custom p-8">
          <h3 className="font-bold text-lg">Practice</h3>
          <p className="mt-2">
            Engage in practice sessions with a wide range of questions across
            various topics, difficulty levels, and statuses to enhance your
            learning.
          </p>
        </div>

        <div className="border bg-white rounded-custom p-8">
          <h3 className="font-bold text-lg">Interactive Navigation</h3>
          <p className="mt-2">
            Easily move through pages with our intuitive navigation buttons,
            allowing you to quickly browse through questions.
          </p>
        </div>

        <div className="border bg-white rounded-custom p-8">
          <h3 className="font-bold text-lg">Filter Questions</h3>
          <p className="mt-2">
            Filter questions based on concepts, tags (Easy, Medium, Complete)
            and progress (Todo, Started, Completed).
          </p>
        </div>

        <div className="border bg-white rounded-custom p-8">
          <h3 className="font-bold text-lg">Progress Tracking</h3>
          <p className="mt-2">
            Keep track of your progress over time by viewing your overall
            performance, as well as progress in easy, medium, and hard
            categories.
          </p>
        </div>

        <div className="border bg-white rounded-custom p-8">
          <h3 className="font-bold text-lg">Bookmark Questions</h3>
          <p className="mt-2">
            Save tricky questions to revisit later and deepen your
            understanding. You can remove them when they are no longer needed.
          </p>
        </div>

        <div className="border bg-white rounded-custom p-8">
          <h3 className="font-bold text-lg">Instant Feedback</h3>
          <p className="mt-2">
            After choosing the correct option, view a detailed explanation for
            each question and mark questions as checked or unchecked.
          </p>
        </div>
      </section>
    </Container>
  );
}
