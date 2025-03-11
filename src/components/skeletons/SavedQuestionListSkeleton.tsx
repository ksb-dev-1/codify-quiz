// components
import QuestionsHeader from "../shared/QuestionsHeader";

export default function SavedQuestionListSkeleton({
  text,
  marginTop,
}: {
  text: string;
  marginTop?: string;
}) {
  return (
    <>
      <QuestionsHeader text={text} marginTop={marginTop} />
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "bg-white" : "skeleton"
            } rounded-custom text-transparent w-full p-4 sm:p-6 flex flex-row justify-between sm:justify-normal`}
          >
            <div className="w-full sm:w-[calc(100%-97.27px+3rem+87.38px+2rem)] flex sm:items-center flex-col-reverse sm:flex-row justify-between sm:justify-normal">
              {/* Status */}
              <span className="sm:w-[calc(97.27px+3rem)] flex items-center">
                <span>icon</span>
                <span>status</span>
              </span>

              {/* Topic */}
              <div className="sm:w-[calc(100%-97.28px+4rem)]">
                <div className="w-fit flex items-cente">
                  <span className="mr-1 font-medium">1.</span>
                  <p className="">topicName</p>
                </div>
              </div>
            </div>

            <div className="sm:w-[calc(55.38px+32px+2rem)] sm:mt-0 flex flex-col sm:flex-row items-end sm:items-center justify-between sm:justify-normal">
              {/* Difficulty */}
              <span className={`sm:w-[calc(55.38px)] flex justify-end`}>
                difficulty
              </span>

              <button className="mt-6 sm:mt-0 w-6 h-6"></button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
