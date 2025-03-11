export default function QuestionsHeader({
  text,
  marginTop,
}: {
  text: string;
  marginTop?: string;
}) {
  return (
    <div className={marginTop}>
      <h1 className="flex sm:hidden font-semibold text-xl mb-4">{text}</h1>
      <div className="w-full flex items-center justify-between sm:justify-normal px-4 sm:px-6 py-2 sm:py-3 rounded-custom border-primary bg-primary text-white">
        <div className="w-full flex flex-col-reverse sm:flex-row sm:items-center justify-between sm:justify-normal">
          <span className="mt-6 sm:mt-0 sm:w-[calc(42.85px+2rem)] flex items-center">
            Status
          </span>
          <span className="sm:w-full flex items-center">Topic</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-normal">
          <span className="sm:w-[calc(64.81px+2rem)] flex items-center justify-end">
            Difficulty
          </span>
          <span className="mt-6 sm:mt-0 sm:w-[calc(34.55px+2rem)] flex justify-end">
            Save
          </span>
        </div>
      </div>
    </div>
  );
}
