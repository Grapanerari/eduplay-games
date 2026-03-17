import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface GameStats {
  totalPoints: number;
  currentLevel: number;
  quizHighScore: number;
  mathHighScore: number;
  platformHighScore: number;
  logicHighScore: number;
  gamesPlayed: number;
  musicEnabled: boolean;
  soundEnabled: boolean;
}

const DEFAULT_STATS: GameStats = {
  totalPoints: 0,
  currentLevel: 1,
  quizHighScore: 0,
  mathHighScore: 0,
  platformHighScore: 0,
  logicHighScore: 0,
  gamesPlayed: 0,
  musicEnabled: true,
  soundEnabled: true,
};

const STORAGE_KEY = "eduplay_game_stats";

export function useGameState() {
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState(true);

  // Load stats from storage on mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setStats(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load game stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  // Save stats to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      const saveStats = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
        } catch (error) {
          console.error("Failed to save game stats:", error);
        }
      };

      saveStats();
    }
  }, [stats, isLoading]);

  const addPoints = useCallback((points: number) => {
    setStats((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
    }));
  }, []);

  const updateQuizScore = useCallback((score: number) => {
    setStats((prev) => ({
      ...prev,
      quizHighScore: Math.max(prev.quizHighScore, score),
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  }, []);

  const updateMathScore = useCallback((score: number) => {
    setStats((prev) => ({
      ...prev,
      mathHighScore: Math.max(prev.mathHighScore, score),
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  }, []);

  const updatePlatformScore = useCallback((score: number) => {
    setStats((prev) => ({
      ...prev,
      platformHighScore: Math.max(prev.platformHighScore, score),
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  }, []);

  const updateLogicScore = useCallback((score: number) => {
    setStats((prev) => ({
      ...prev,
      logicHighScore: Math.max(prev.logicHighScore, score),
      gamesPlayed: prev.gamesPlayed + 1,
    }));
  }, []);

  const levelUp = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
    }));
  }, []);

  const toggleMusic = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      musicEnabled: !prev.musicEnabled,
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  }, []);

  const resetStats = useCallback(async () => {
    setStats(DEFAULT_STATS);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to reset game stats:", error);
    }
  }, []);

  return {
    stats,
    isLoading,
    addPoints,
    updateQuizScore,
    updateMathScore,
    updatePlatformScore,
    updateLogicScore,
    levelUp,
    toggleMusic,
    toggleSound,
    resetStats,
  };
}
