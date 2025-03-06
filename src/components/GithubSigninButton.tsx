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
      className="w-full px-4 h-[60px] border border-black bg-black text-white hover:bg-hover rounded-custom flex items-center justify-center"
    >
      <FaGithub className="text-2xl" />
      <span className="ml-4">Sign in with GitHub</span>
      {pending && <Loader2 className="ml-4 animate-spin" />}
    </button>
  );
}
