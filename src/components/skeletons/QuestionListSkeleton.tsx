export default function QuestionListSkeleton({
  text,
  marginTop,
}: {
  text: string;
  marginTop?: string;
}) {
  return (
    <div className={marginTop}>
      <h1 className="font-semibold text-xl">{text}</h1>
      <div className="mt-4 flex items-center justify-between sm:justify-normal px-4 sm:px-6 py-2 rounded-tr-custom rounded-tl-custom border-primary bg-primary text-white">
        <div className="sm:w-[calc(100%-97.28px+4rem+87.38px+2rem)] flex flex-col-reverse sm:flex-row sm:items-center justify-between sm:justify-normal">
          <span className="mt-6 sm:mt-0 sm:w-[calc(97.27px+3rem)] flex items-center">
            Status
          </span>
          <span className="sm:w-[calc(100%-97.27px+3rem)] flex items-center">
            Topic
          </span>
        </div>
        <div className="sm:w-[calc(55.38px+32px+2rem)] flex flex-col sm:flex-row sm:items-center justify-between sm:justify-normal">
          <span className="sm:w-[calc(55.38px)] flex items-center justify-end">
            Difficulty
          </span>
          <div className="mt-6 sm:mt-0 sm:w-[calc(32px+2rem)] flex justify-end">
            Save
          </div>
        </div>
      </div>
      <div className="border-x">
        {Array.from({ length: 10 }).map((_, index) => (
          // <div
          //   key={index}
          //   className={`border rounded-custom my-4 block px-4 py-6 ${
          //     index % 2 === 0 ? "bg-white" : "skeleton"
          //   } text-transparent`}
          // >
          //   skeleton
          // </div>
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "bg-white" : "skeleton"
            } text-transparent w-full border-b p-4 sm:p-6 flex flex-row justify-between sm:justify-normal`}
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
  );
}
