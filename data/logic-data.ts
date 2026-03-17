export interface LogicPuzzle {
  id: string;
  riddle: string;
  answer: string;
  hint: string;
  category: string;
}

export const logicPuzzles: LogicPuzzle[] = [
  {
    id: "l1",
    riddle: "I have cities but no houses, forests but no trees, and water but no fish. What am I?",
    answer: "map",
    hint: "Think about geography",
    category: "Classic",
  },
  {
    id: "l2",
    riddle: "What has a head and a tail but no body?",
    answer: "coin",
    hint: "Money",
    category: "Classic",
  },
  {
    id: "l3",
    riddle: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "echo",
    hint: "Sound",
    category: "Classic",
  },
  {
    id: "l4",
    riddle: "What can travel around the world while staying in a corner?",
    answer: "stamp",
    hint: "Mail",
    category: "Classic",
  },
  {
    id: "l5",
    riddle: "I am not alive, but I grow. I do not have lungs, but I need air. I do not have a mouth, but water kills me. What am I?",
    answer: "fire",
    hint: "Elements",
    category: "Classic",
  },
  {
    id: "l6",
    riddle: "What gets wet while drying?",
    answer: "towel",
    hint: "Bathroom",
    category: "Easy",
  },
  {
    id: "l7",
    riddle: "What can be cracked, made, told, and played?",
    answer: "joke",
    hint: "Humor",
    category: "Easy",
  },
  {
    id: "l8",
    riddle: "I am taken from a mine and shut up in a wooden case, from which I am never released, yet I am used by almost everyone. What am I?",
    answer: "pencil lead",
    hint: "Writing",
    category: "Medium",
  },
  {
    id: "l9",
    riddle: "What has a face and two hands but no arms or legs?",
    answer: "clock",
    hint: "Time",
    category: "Easy",
  },
  {
    id: "l10",
    riddle: "What is so fragile that saying its name breaks it?",
    answer: "silence",
    hint: "Sound",
    category: "Hard",
  },
];

export function getRandomPuzzles(count: number): LogicPuzzle[] {
  const shuffled = [...logicPuzzles].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, logicPuzzles.length));
}
