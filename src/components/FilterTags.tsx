"use client";

import { useSearchParams, useRouter } from "next/navigation";

// Constants
import { getStatusIcon } from "@/constants/statuses";

// 3rd Party Icons
import { IoCloseSharp } from "react-icons/io5";

interface FilterTagsProps {
  currentStatus: string | undefined;
  currentDifficulty: string | undefined;
  currentTopic: string | undefined;
}

function RemoveFilterButton({ filter }: { filter: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newParams = new URLSearchParams(searchParams.toString());

  const removeFilter = (filter: string) => {
    newParams.delete(filter);
    newParams.set("page", "1");

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div
      onClick={() => removeFilter(filter)}
      className="relative h-5 w-5 rounded-full bg-primary text-white hover:bg-hover transition-colors"
    >
      <IoCloseSharp className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-sm" />
    </div>
  );
}

export default function FilterTags({
  currentStatus,
  currentDifficulty,
  currentTopic,
}: FilterTagsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newParams = new URLSearchParams(searchParams.toString());

  const StatusIcon = currentStatus && getStatusIcon(currentStatus);

  let filterCount = 0;

  if (currentStatus) filterCount++;
  if (currentDifficulty) filterCount++;
  if (currentTopic) filterCount++;

  // Define colors statically
  let statusColor = "";

  if (currentStatus === "TODO") {
    statusColor = "text-primary";
  } else if (currentStatus === "SOLVED") {
    statusColor = "text-emerald-700";
  } else if (currentStatus === "ATTEMPTED") {
    statusColor = "text-orange-600";
  }

  // Define colors statically
  let difficultyTextColor = "";

  if (currentDifficulty === "EASY") {
    difficultyTextColor = "text-teal-700";
  } else if (currentDifficulty === "MEDIUM") {
    difficultyTextColor = "text-yellow-700";
  } else if (currentDifficulty === "HARD") {
    difficultyTextColor = "text-red-600";
  }

  const clearFilters = () => {
    newParams.delete("status");
    newParams.delete("difficulty");
    newParams.delete("topic");
    newParams.set("page", "1");

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="flex">
      <div className="flex items-center flex-wrap gap-4">
        {/* Render status if found */}
        {currentStatus && (
          <div className="flex items-center px-3 py-1 transition-colors border rounded-custom">
            {StatusIcon && (
              <StatusIcon className={`sm:text-xl ${statusColor}`} />
            )}
            <span className="mx-2">
              {currentStatus.charAt(0) +
                currentStatus.substring(1).toLocaleLowerCase()}
            </span>
            <RemoveFilterButton filter="status" />
          </div>
        )}

        {/* Render difficulty if found */}
        {currentDifficulty && (
          <div className="flex items-center px-3 py-1 border rounded-custom">
            <span className={`${difficultyTextColor} mr-2`}>
              {currentDifficulty.charAt(0) +
                currentDifficulty.substring(1).toLocaleLowerCase()}
            </span>

            <RemoveFilterButton filter="difficulty" />
          </div>
        )}

        {/* Render topic if found */}
        {currentTopic && (
          <div className="flex items-center px-3 py-1 border rounded-custom">
            <span className="mr-2">{currentTopic}</span>
            <RemoveFilterButton filter="topic" />
          </div>
        )}

        {/* Clear filters */}
        {filterCount > 1 && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 rounded-custom bg-red-600 text-white border border-red-600 hover:bg-red-500 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
