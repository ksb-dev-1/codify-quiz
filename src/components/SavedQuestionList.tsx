import Link from "next/link";

// constants
import { getStatusIcon } from "@/constants/statuses";

// types
import { Question } from "@/types/types";

// components
import QuestionsHeader from "./shared/QuestionsHeader";
import removeQuestionAction from "@/actions/removeQuestionAction";
import RemoveQuestionButton from "./RemoveQuestionButton";

interface SavedQuestionListProps {
  savedQuestions: Question[];
}

export default function SavedQuestionList({
  savedQuestions,
}: SavedQuestionListProps) {
  if (savedQuestions.length === 0) {
    return <p className="text-xl mt-8">No saved questions found!</p>;
  }

  return (
    <div>
      <QuestionsHeader text="Saved Questions" />
      <div className="border-x">
        {savedQuestions.map(({ id, qNo, status, topicName, difficulty }) => {
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
            <div
              key={id}
              className="w-full border-b p-4 sm:p-6 flex flex-row justify-between sm:justify-normal"
            >
              <div className="w-full sm:w-[calc(100%-97.27px+3rem+87.38px+2rem)] flex sm:items-center flex-col-reverse sm:flex-row justify-between sm:justify-normal">
                {/* Status */}
                <span className="sm:w-[calc(97.27px+3rem)] flex items-center">
                  {StatusIcon && (
                    <StatusIcon className={`text-xl mr-2 ${statusIconColor}`} />
                  )}
                  <span>
                    {status.charAt(0) + status.substring(1).toLocaleLowerCase()}
                  </span>
                </span>

                {/* Topic */}
                <div className="sm:w-[calc(100%-97.28px+4rem)]">
                  <div className="w-fit flex items-cente">
                    <span className="mr-1 font-medium">{qNo}.</span>
                    <Link
                      href={`/pages/questions/${id}`}
                      className=" text-blue-600 underline"
                    >
                      {topicName}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="sm:w-[calc(55.38px+32px+2rem)] sm:mt-0 flex flex-col sm:flex-row items-end sm:items-center justify-between sm:justify-normal">
                {/* Difficulty */}
                <span
                  className={`sm:w-[calc(55.38px)] flex justify-end ${difficultyTextColor}`}
                >
                  {difficulty.charAt(0) +
                    difficulty.substring(1).toLocaleLowerCase()}
                </span>

                <form action={removeQuestionAction}>
                  <input type="hidden" name="questionId" value={id} />
                  <RemoveQuestionButton />
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
