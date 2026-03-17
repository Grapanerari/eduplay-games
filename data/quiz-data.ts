export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1,
    category: "Geography",
  },
  {
    id: "q2",
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
    correctAnswer: 2,
    category: "Science",
  },
  {
    id: "q3",
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1,
    category: "Art",
  },
  {
    id: "q4",
    question: "What is the smallest country in the world?",
    options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
    correctAnswer: 2,
    category: "Geography",
  },
  {
    id: "q5",
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    category: "Geography",
  },
  {
    id: "q6",
    question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    category: "Science",
  },
  {
    id: "q7",
    question: "Which country is home to the Eiffel Tower?",
    options: ["Germany", "France", "Italy", "Spain"],
    correctAnswer: 1,
    category: "Geography",
  },
  {
    id: "q8",
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    category: "Geography",
  },
  {
    id: "q9",
    question: "How many sides does a hexagon have?",
    options: ["4", "5", "6", "8"],
    correctAnswer: 2,
    category: "Math",
  },
  {
    id: "q10",
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: 0,
    category: "Science",
  },
];

export function getRandomQuizzes(count: number): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, quizQuestions.length));
}
