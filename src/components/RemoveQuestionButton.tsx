"use client";

import { useFormStatus } from "react-dom";

// 3rd party
import { Loader } from "lucide-react";
import { VscHeartFilled } from "react-icons/vsc";

export default function RemoveQuestionButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-label="remove-question-button"
      disabled={pending}
      className="mt-6 sm:mt-0 sm:w-[calc(32px+2rem)] flex justify-end"
    >
      {pending ? (
        <Loader className="w-5 h-5 animate-spin text-pink-600" />
      ) : (
        <VscHeartFilled className="text-2xl text-pink-600 cursor-pointer" />
      )}
    </button>
  );
}
