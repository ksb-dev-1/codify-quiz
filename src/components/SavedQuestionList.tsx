import Link from "next/link";

// server-actions
import toggleSaveQuestionServerAction from "@/server-actions/toggleSaveQuestionServerAction";

// constants
import { getStatusColor, getStatusIcon } from "@/constants/statuses";
import { getDifficultyColor } from "@/constants/difficulties";

// components
import QuestionsHeader from "./shared/QuestionsHeader";
import ToggleSaveQuestionButton from "@/components/ToggleSaveButton";

// 3rd party
import clsx from "clsx";
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

export default function SavedQuestionList({
  savedQuestions,
}: SavedQuestionListProps) {
  if (savedQuestions.length === 0) {
    return <p className="text-xl mt-8">No saved questions found!</p>;
  }

  return (
    <div>
      <QuestionsHeader text="Saved Questions" />

      {savedQuestions.map(({ id, qNo, status, topicName, difficulty }) => {
        const StatusIcon = getStatusIcon(status);

        const statusIconColor = getStatusColor(status);
        const difficultyTextColor = getDifficultyColor(difficulty);

        return (
          <div
            key={id}
            className="border-b w-full p-4 sm:p-6 flex flex-row justify-between sm:justify-normal"
          >
            <div className="w-full flex sm:items-center flex-col-reverse sm:flex-row justify-between sm:justify-normal">
              {/* Status */}
              <span className="sm:w-[calc(42.85px+2rem)] flex items-center">
                {StatusIcon && (
                  <StatusIcon
                    className={clsx("text-xl mr-2", statusIconColor)}
                  />
                )}
              </span>

              {/* Topic */}
              <div className="sm:w-full">
                <div className="w-fit flex items-cente">
                  <span className="mr-2">{qNo}.</span>
                  <Link
                    href={`/pages/questions/${id}`}
                    className="text-blue-700 underline"
                  >
                    {topicName}
                  </Link>
                </div>
              </div>
            </div>

            <div className="sm:mt-0 flex flex-col sm:flex-row items-end sm:items-center justify-between sm:justify-normal">
              {/* Difficulty */}
              <span
                className={clsx(
                  "sm:w-[calc(64.81px+2rem)] flex justify-end",
                  difficultyTextColor
                )}
              >
                {difficulty.charAt(0) + difficulty.substring(1).toLowerCase()}
              </span>

              <span className="sm:w-[calc(34.55px+2rem)] flex justify-end">
                <form action={toggleSaveQuestionServerAction}>
                  <input type="hidden" name="questionId" value={id} />
                  <ToggleSaveQuestionButton isSaved={true} />
                </form>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/*<form action={toggleSaveQuestionServerAction}>
                <input type="hidden" name="questionId" value={id} />
                <ToggleSaveQuestionButton isSaved={true} />
              </form> */
