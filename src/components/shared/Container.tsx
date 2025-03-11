export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center py-[7rem] sm:py-[9rem]">
      <div className="max-w-5xl w-full px-4">{children}</div>
    </div>
  );
}
