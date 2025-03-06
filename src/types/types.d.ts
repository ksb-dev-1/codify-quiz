import { DifficultyLevel, QuestionStatusEnum } from "@prisma/client";

interface Difficulty {
  difficulty: string;
}

interface Status {
  icon: IconType;
  status: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Question {
  id: string;
  qNo: number;
  question: string;
  codeSnippet: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctOption: keyof Question["options"]; // Ensures correctOption matches one of the keys in options
  explanation: string;
  difficulty: DifficultyLevel;
  isPremium: boolean;
  topicId?: string; // Optional, assuming _id is a string
  topicName: string;
  status: QuestionStatusEnum;
  isSaved: boolean;
}
