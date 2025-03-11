// components
import QuestionsHeader from "../shared/QuestionsHeader";

function Filter() {
  return (
    <div className="sticky top-[9rem] hidden md:flex flex-col items-start max-w-72 w-full mr-8 border rounded-custom p-6">
      {/* Status Filter */}
      <div className="relative w-full">
        <p className="skeleton rounded-custom text-xl mb-4">Status</p>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <p key={index} className="w-24 skeleton rounded-custom ">
              status
            </p>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="relative w-full mt-8">
        <p className="skeleton rounded-custom text-xl mb-4">Difficulty</p>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <p key={index} className="w-24 skeleton rounded-custom ">
              difficulty
            </p>
          ))}
        </div>
      </div>

      {/* Topics Filter */}
      <div className="relative w-full mt-8">
        <p className="skeleton rounded-custom text-xl mb-4">Difficulty</p>
        <div className="w-full grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className="skeleton px-3 py-1 border border-transparent rounded-custom text-transparent"
            >
              Loading...
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuestionList({
  text,
  marginTop,
}: {
  text: string;
  marginTop?: string;
}) {
  return (
    <div className="w-full flex flex-col items-end">
      <div className="w-full">
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
      </div>
    </div>
  );
}

export default function QuestionListSkeleton({
  text,
  marginTop,
}: {
  text: string;
  marginTop?: string;
}) {
  return (
    <div className="w-full flex flex-col items-start text-transparent">
      <div className="w-full flex items-start">
        {/* Filter */}
        <Filter />

        {/* Question List*/}
        <QuestionList text={text} marginTop={marginTop} />
      </div>
    </div>
  );
}
