"use client";

import { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";

// Constants
import { statuses, getStatusIcon, getStatusColor } from "@/constants/statuses";

// 3rd party
import clsx from "clsx";
import { IoIosCheckmark } from "react-icons/io";

type StatusFilterProps = {
  passedStatus: string | undefined;
  setStatus: Dispatch<SetStateAction<string | undefined>>;
};

export default function StatusFilter({
  passedStatus,
  setStatus,
}: StatusFilterProps) {
  const searchParams = useSearchParams();

  const toggleStatus = (status: string) => {
    setStatus((prevStatus) => (prevStatus === status ? "" : status));
  };

  return (
    <div className="relative w-full">
      <p className="font-semibold text-xl mb-4">Status</p>
      <div className="space-y-4">
        {statuses.map(({ status }) => {
          const newParams = new URLSearchParams(searchParams.toString());
          newParams.set("status", status);
          newParams.set("page", "1");

          const StatusIcon = getStatusIcon(status);

          const statusIconColor = getStatusColor(status);

          return (
            <button
              key={status}
              aria-label={status}
              onClick={() => toggleStatus(status)}
              className="flex items-center cursor-pointer hover:underline rounded-custom"
            >
              {passedStatus === status ? (
                <span className="relative w-5 h-5 bg-primary text-white rounded-full mr-4">
                  <IoIosCheckmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
                </span>
              ) : (
                <span className="w-5 h-5 border rounded-full mr-4"></span>
              )}

              <span className="capitalize">
                {status.charAt(0) + status.substring(1).toLocaleLowerCase()}
              </span>

              {StatusIcon && (
                <StatusIcon className={clsx("text-xl ml-2", statusIconColor)} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
