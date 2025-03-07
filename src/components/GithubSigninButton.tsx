"use client";

import { useFormStatus } from "react-dom";

// 3rd party libraries
import { FaGithub } from "react-icons/fa";
import { Loader2 } from "lucide-react";

export default function GitHubSignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`relative w-full px-4 h-[60px] border border-black bg-black ${
        pending ? "cursor-not-allowed" : "hover:bg-hover"
      } text-white rounded-custom flex items-center justify-center`}
    >
      <FaGithub className="text-2xl" />
      <span className="ml-4">Sign in with GitHub</span>
      {pending && <Loader2 className="absolute right-4 animate-spin" />}
    </button>
  );
}
