"use client";

import { useFormStatus } from "react-dom";

// 3rd party
import { Loader2 } from "lucide-react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

export default function ToggleSaveQuestionButton({
  isSaved,
}: {
  isSaved: boolean;
}) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <button
        aria-label="loading"
        disabled={pending}
        className="mt-6 sm:mt-0 sm:w-[calc(32px+2rem)] flex justify-end"
      >
        <Loader2 className="w-6 h-6 animate-spin text-pink-600" />
      </button>
    );
  }

  if (!isSaved) {
    return (
      <button
        type="submit"
        aria-label="save-question-button"
        disabled={pending}
        className="mt-6 sm:mt-0 sm:w-[calc(32px+2rem)] flex justify-end"
      >
        <VscHeart className="w-6 h-6 text-pink-600 cursor-pointer" />
      </button>
    );
  }

  return (
    <button
      type="submit"
      aria-label="save-question-button"
      disabled={pending}
      className="mt-6 sm:mt-0 sm:w-[calc(32px+2rem)] flex justify-end"
    >
      <VscHeartFilled className="w-6 h-6 text-pink-600 cursor-pointer" />
    </button>
  );
}
