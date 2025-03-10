"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd party
import { IoCaretDown } from "react-icons/io5";

type Topic = {
  name: string;
  id: string;
};

type TopicsFilterProps = {
  topics: Topic[];
};

export default function TopicsFilter({ topics }: TopicsFilterProps) {
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
        <span>Topics</span>
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
        {/* Error State */}
        {/* {!topicsLoading && topicsError && (
          <div className="text-red-600 p-2 text-center w-full">
            Failed to fetch topics! Please refresh the page.
          </div>
        )} */}

        {/* No Topics Found */}
        {topics.length === 0 && (
          <div className="p-2 text-center w-full">No topics found!</div>
        )}

        {/* Loading Skeleton */}
        {/* <div className="w-full flex items-center flex-wrap gap-4">
          {topicsLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className="skeleton px-3 py-1 border border-transparent rounded-custom text-transparent"
              >
                Loading...
              </span>
            ))}
        </div> */}

        {/* Topics List */}
        <div className="w-full flex items-center flex-wrap gap-2">
          {topics.map((topic: Topic) => {
            const newParams = new URLSearchParams(searchParams.toString());
            newParams.set("topic", topic.name);
            newParams.set("page", "1");

            return (
              <Link
                key={topic.id}
                onClick={() => setIsOpen((prev) => !prev)}
                href={`?${newParams.toString()}`}
                aria-label={`View questions related to ${topic.name}`}
                className="px-4 py-2 rounded-custom border hover:bg-slate-200 transition-colors"
              >
                {topic.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
