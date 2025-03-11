export const difficulties = [
  { difficulty: "EASY", color: "text-teal-700" },
  { difficulty: "MEDIUM", color: "text-yellow-700" },
  { difficulty: "HARD", color: "text-red-600" },
];

// Utility function to get status color
export const getDifficultyColor = (difficulty: string) => {
  return difficulties.find((d) => d.difficulty === difficulty)?.color || "";
};
