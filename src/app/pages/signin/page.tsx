"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Actions
import { googleSigninAction, githubSigninAction } from "@/actions/signInAction";

// Components
import Container from "@/components/shared/Container";
import GoogleSignInButton from "@/components/GoogleSigninButton";
import GitHubSignInButton from "@/components/GithubSigninButton";

// 3rd Party
import { useSession } from "next-auth/react";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="max-w-xl w-full flex flex-col p-8 border rounded-custom">
          <h1 className="text-2xl font-bold mb-8">Sign in to Codify</h1>
          <div className="w-full grid gap-4">{children}</div>
        </div>
      </div>
    </Container>
  );
}

export default function SigninPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // Redirect to home if the user is already signed in
  useEffect(() => {
    if (sessionStatus === "authenticated" && session?.user?.id) {
      router.push(`/pages/questions?page=1`);
    }
  }, [sessionStatus, session?.user?.id, router]);

  if (sessionStatus === "loading") {
    return (
      <Wrapper>
        {[1, 2].map((_, index) => (
          <button
            key={index}
            type="submit"
            className="skeleton text-transparent w-full px-4 h-[60px] border border-transparent rounded-custom"
          >
            <span className="ml-4">Sign in with Google</span>
          </button>
        ))}
      </Wrapper>
    );
  }

  if (session?.user?.id) {
    return (
      <Wrapper>
        <p>Redirecting...</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <form action={googleSigninAction}>
        <GoogleSignInButton />
      </form>
      <form action={githubSigninAction}>
        <GitHubSignInButton />
      </form>
    </Wrapper>
  );
}
