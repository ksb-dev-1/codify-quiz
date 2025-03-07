"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Constants
import { difficulties } from "@/constants/difficulties";

// Hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd Party Icons
import { IoCaretDown } from "react-icons/io5";

export default function DifficultyFilter() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useHandleOutsideClick(dropDownRef, setIsOpen);

  return (
    <div ref={dropDownRef} className="relative w-full">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative w-full cursor-pointer px-4 py-2 rounded-custom border"
      >
        <span>Difficulty</span>
        <span
          className={`absolute top-3 right-2 ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform`}
        >
          <IoCaretDown />
        </span>
      </div>

      <div
        className={`bg-white w-full mt-2 z-10 border shadow-xl ${
          isOpen ? "scale-1" : "scale-0"
        } absolute rounded-custom p-2 origin-top-left transition-transform`}
      >
        {difficulties.map(({ difficulty }) => {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("difficulty", difficulty);
          newParams.set("page", "1");

          // Define colors statically
          let difficultyTextColor = "";

          if (difficulty === "EASY") {
            difficultyTextColor = "text-teal-700";
          } else if (difficulty === "MEDIUM") {
            difficultyTextColor = "text-yellow-700";
          } else if (difficulty === "HARD") {
            difficultyTextColor = "text-red-600";
          }

          return (
            <Link
              key={difficulty}
              onClick={() => setIsOpen(false)}
              href={`?${newParams.toString()}`}
              className={`${difficultyTextColor} flex items-center cursor-pointer px-4 py-2 hover:bg-slate-200 transition-colors rounded-custom`}
            >
              {difficulty.charAt(0) +
                difficulty.substring(1).toLocaleLowerCase()}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
