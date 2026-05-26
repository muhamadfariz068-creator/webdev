export type TrackId = "html" | "css" | "javascript";

export interface Lesson {
  id: string;
  title: string;
  shortDesc: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  xpCost: number;
  markdownContent: string;
  interactiveCodeTemplate: {
    html: string;
    css: string;
    js: string;
  };
}

export interface QuizQuestion {
  id: string;
  lessonId?: string;
  trackId: TrackId;
  question: string;
  type: "multichoice" | "match" | "fill-blank";
  options?: string[]; // For multichoice
  correctAnswer: string; // The selected answer or missing code part
  explanation: string;
  // For matching structure
  matchPairs?: { left: string; right: string }[];
}

export interface TrackConfig {
  id: TrackId;
  title: string;
  description: string;
  colorClass: string;
  glowColor: string;
  iconName: string;
  lessons: Lesson[];
  quizzes: QuizQuestion[];
}

export interface StudentProgress {
  xp: number;
  completedLessons: string[]; // lesson ids
  completedQuizzes: string[]; // quiz ids
  streak: number; // consecutive active days
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt?: string; // Date or empty
  iconName: string;
  conditionDescription: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}
