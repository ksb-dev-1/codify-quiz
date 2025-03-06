"use client";

import { useFormStatus } from "react-dom";

// 3rd party
import { Loader } from "lucide-react";
import { VscHeart } from "react-icons/vsc";

export default function SaveQuestionButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="save-question-button"
      disabled={pending}
      className="mt-6 sm:mt-0 sm:w-[calc(32px+2rem)] flex justify-end"
    >
      {pending ? (
        <Loader className="w-5 h-5 animate-spin text-pink-600" />
      ) : (
        <VscHeart className="text-2xl text-pink-600 cursor-pointer" />
      )}
    </button>
  );
}
