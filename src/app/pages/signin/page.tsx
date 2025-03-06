import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Actions
import { googleSigninAction, githubSigninAction } from "@/actions/signInAction";

// Components
import Container from "@/components/shared/Container";
import GoogleSignInButton from "@/components/GoogleSigninButton";
import GitHubSignInButton from "@/components/GithubSigninButton";

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

export default async function SigninPage() {
  // Fetch session
  const session = await auth();
  const userId = session?.user?.id;

  // If user not signed in redirect to signin page
  if (userId) redirect("/pages/questions?page=1");

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
