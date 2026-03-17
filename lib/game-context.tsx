import React, { createContext, ReactNode } from "react";
import { useGameState, type GameStats } from "@/hooks/use-game-state";

interface GameContextType {
  stats: GameStats;
  isLoading: boolean;
  addPoints: (points: number) => void;
  updateQuizScore: (score: number) => void;
  updateMathScore: (score: number) => void;
  updatePlatformScore: (score: number) => void;
  updateLogicScore: (score: number) => void;
  levelUp: () => void;
  toggleMusic: () => void;
  toggleSound: () => void;
  resetStats: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const gameState = useGameState();

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
