"use client";

import { useFormStatus } from "react-dom";

// 3rd party libraries
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

export default function GoogleSignInButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full px-4 h-[60px] border bg-white text-black hover:bg-slate-200 rounded-custom flex items-center justify-center"
    >
      <FcGoogle className="text-2xl" />
      <span className="ml-4">Sign in with Google</span>
      {pending && <Loader2 className="ml-4 animate-spin" />}
    </button>
  );
}
