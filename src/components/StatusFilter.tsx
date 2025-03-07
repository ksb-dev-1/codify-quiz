"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Constants
import { statuses, getStatusIcon } from "@/constants/statuses";

// Hooks
import { useHandleOutsideClick } from "@/hooks/useHandleOutsideClick";

// 3rd Party Icons
import { IoCaretDown } from "react-icons/io5";

export default function StatusFilter() {
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
        <span>Status</span>
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
        {statuses.map(({ status }) => {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("status", status);
          newParams.set("page", "1");

          const StatusIcon = getStatusIcon(status);

          // Define colors statically
          let statusIconColor = "";

          if (status === "TODO") {
            statusIconColor = "text-blue-600";
          } else if (status === "SOLVED") {
            statusIconColor = "text-emerald-700";
          } else if (status === "ATTEMPTED") {
            statusIconColor = "text-orange-600";
          }

          return (
            <Link
              key={status}
              onClick={() => setIsOpen(false)}
              href={`?${newParams.toString()}`}
              className="flex items-center cursor-pointer px-4 py-2 hover:bg-slate-200 transition-colors rounded-custom"
            >
              {StatusIcon && (
                <StatusIcon
                  className={`text-base sm:text-xl mr-4 ${statusIconColor}`}
                />
              )}
              <span className="capitalize">
                {status.charAt(0) + status.substring(1).toLocaleLowerCase()}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
