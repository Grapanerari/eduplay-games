export interface MathProblem {
  id: string;
  problem: string;
  answer: number;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number; // in seconds
}

export const mathProblems: MathProblem[] = [
  { id: "m1", problem: "2 + 3 = ?", answer: 5, difficulty: "easy", timeLimit: 5 },
  { id: "m2", problem: "10 - 4 = ?", answer: 6, difficulty: "easy", timeLimit: 5 },
  { id: "m3", problem: "5 × 6 = ?", answer: 30, difficulty: "easy", timeLimit: 5 },
  { id: "m4", problem: "20 ÷ 4 = ?", answer: 5, difficulty: "easy", timeLimit: 5 },
  { id: "m5", problem: "15 + 25 = ?", answer: 40, difficulty: "medium", timeLimit: 8 },
  { id: "m6", problem: "100 - 37 = ?", answer: 63, difficulty: "medium", timeLimit: 8 },
  { id: "m7", problem: "12 × 8 = ?", answer: 96, difficulty: "medium", timeLimit: 8 },
  { id: "m8", problem: "144 ÷ 12 = ?", answer: 12, difficulty: "medium", timeLimit: 8 },
  { id: "m9", problem: "25 + 75 - 30 = ?", answer: 70, difficulty: "hard", timeLimit: 10 },
  { id: "m10", problem: "9 × 9 + 9 = ?", answer: 90, difficulty: "hard", timeLimit: 10 },
  { id: "m11", problem: "50 ÷ 2 + 15 = ?", answer: 40, difficulty: "hard", timeLimit: 10 },
  { id: "m12", problem: "7 × 8 - 6 = ?", answer: 50, difficulty: "hard", timeLimit: 10 },
];

export function getRandomMathProblems(count: number): MathProblem[] {
  const shuffled = [...mathProblems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, mathProblems.length));
}
