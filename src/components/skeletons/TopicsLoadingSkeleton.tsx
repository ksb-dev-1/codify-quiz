import React from "react";

export default function TopicsLoadingSkeleton() {
  return (
    <div className="w-full flex items-center flex-wrap gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          className="skeleton px-3 py-1 border border-transparent rounded-custom text-transparent"
        >
          Loading...
        </span>
      ))}
    </div>
  );
}
