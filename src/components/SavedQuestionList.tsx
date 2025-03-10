import Link from "next/link";

// server-actions
import toggleSaveQuestionServerAction from "@/server-actions/toggleSaveQuestionServerAction";

// constants
import { getStatusIcon } from "@/constants/statuses";

// components
import QuestionsHeader from "./shared/QuestionsHeader";
import ToggleSaveQuestionButton from "@/components/ToggleSaveButton";

// 3rd party
import { DifficultyLevel, QuestionStatusEnum } from "@prisma/client";

type Question = {
  id: string;
  qNo: number;
  difficulty: DifficultyLevel;
  isPremium: boolean;
  topicName: string;
  status: QuestionStatusEnum;
};

type SavedQuestionListProps = {
  savedQuestions: Question[];
};

const statusColors = {
  TODO: "text-primary",
  SOLVED: "text-emerald-700",
  ATTEMPTED: "text-orange-600",
};

const difficultyColors = {
  EASY: "text-teal-700",
  MEDIUM: "text-yellow-700",
  HARD: "text-red-600",
};

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

          const statusIconColor = statusColors[status] || "";
          const difficultyTextColor = difficultyColors[difficulty] || "";

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

                <form action={toggleSaveQuestionServerAction}>
                  <input type="hidden" name="questionId" value={id} />
                  <ToggleSaveQuestionButton isSaved={true} />
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
