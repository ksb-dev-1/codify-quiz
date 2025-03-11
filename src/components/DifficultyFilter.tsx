"use client";

import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";

// Constants
import { difficulties, getDifficultyColor } from "@/constants/difficulties";

// 3rd party
import { IoIosCheckmark } from "react-icons/io";

type difficultyFilterProps = {
  passedDifficulty: string | undefined;
  setDifficulty: Dispatch<SetStateAction<string | undefined>>;
};

export default function DifficultyFilter({
  passedDifficulty,
  setDifficulty,
}: difficultyFilterProps) {
  const searchParams = useSearchParams();

  const toggleDifficulty = (difficulty: string) => {
    setDifficulty((prevDifficulty) =>
      prevDifficulty === difficulty ? "" : difficulty
    );
  };

  return (
    <div className="mt-8 relative w-full">
      <p className="font-semibold text-xl mb-4">Difficulty</p>
      <div className="space-y-4">
        {difficulties.map(({ difficulty }) => {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("difficulty", difficulty);
          newParams.set("page", "1");

          const difficultyTextColor = getDifficultyColor(difficulty);

          return (
            <button
              key={difficulty}
              aria-label={difficulty}
              onClick={() => toggleDifficulty(difficulty)}
              className="flex items-center cursor-pointer hover:underline rounded-custom"
            >
              {passedDifficulty === difficulty ? (
                <span className="relative w-5 h-5 bg-primary text-white rounded-full mr-4">
                  <IoIosCheckmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
                </span>
              ) : (
                <span className="w-5 h-5 border rounded-full mr-4"></span>
              )}

              <span className={difficultyTextColor}>
                {difficulty.charAt(0) +
                  difficulty.substring(1).toLocaleLowerCase()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
