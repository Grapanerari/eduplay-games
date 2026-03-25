import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

const CACHE_KEYS = {
  QUIZ: "questions_quiz_cache",
  MATH: "questions_math_cache",
  LOGIC: "questions_logic_cache",
  SYNC_TIMESTAMP: "questions_sync_timestamp",
};

export type Question = {
  id: number;
  question?: string;
  problem?: string;
  puzzle?: string;
  options: string[];
  correctAnswer: number;
  category?: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit?: number;
};

/**
 * Hook para sincronizar perguntas do servidor com cache local
 * Atualiza automaticamente quando há novas perguntas
 */
export function useQuestionsSync() {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [mathProblems, setMathProblems] = useState<Question[]>([]);
  const [logicPuzzles, setLogicPuzzles] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Fetch questions from server
  const quizQuery = trpc.questions.quiz.getAll.useQuery();
  const mathQuery = trpc.questions.math.getAll.useQuery();
  const logicQuery = trpc.questions.logic.getAll.useQuery();

  // Fetch sync timestamps
  const quizSyncQuery = trpc.questions.sync.getLastSync.useQuery({
    type: "quiz",
  });
  const mathSyncQuery = trpc.questions.sync.getLastSync.useQuery({
    type: "math",
  });
  const logicSyncQuery = trpc.questions.sync.getLastSync.useQuery({
    type: "logic",
  });

  /**
   * Load questions from cache
   */
  const loadFromCache = useCallback(async () => {
    try {
      const [cachedQuiz, cachedMath, cachedLogic, cachedTimestamp] =
        await Promise.all([
          AsyncStorage.getItem(CACHE_KEYS.QUIZ),
          AsyncStorage.getItem(CACHE_KEYS.MATH),
          AsyncStorage.getItem(CACHE_KEYS.LOGIC),
          AsyncStorage.getItem(CACHE_KEYS.SYNC_TIMESTAMP),
        ]);

      if (cachedQuiz) setQuizQuestions(JSON.parse(cachedQuiz));
      if (cachedMath) setMathProblems(JSON.parse(cachedMath));
      if (cachedLogic) setLogicPuzzles(JSON.parse(cachedLogic));
      if (cachedTimestamp) setLastSyncTime(new Date(cachedTimestamp));
    } catch (error) {
      console.error("[QuestionsSync] Error loading from cache:", error);
    }
  }, []);

  /**
   * Save questions to cache
   */
  const saveToCache = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem(
          CACHE_KEYS.QUIZ,
          JSON.stringify(quizQuestions)
        ),
        AsyncStorage.setItem(
          CACHE_KEYS.MATH,
          JSON.stringify(mathProblems)
        ),
        AsyncStorage.setItem(
          CACHE_KEYS.LOGIC,
          JSON.stringify(logicPuzzles)
        ),
        AsyncStorage.setItem(
          CACHE_KEYS.SYNC_TIMESTAMP,
          new Date().toISOString()
        ),
      ]);
    } catch (error) {
      console.error("[QuestionsSync] Error saving to cache:", error);
    }
  }, [quizQuestions, mathProblems, logicPuzzles]);

  /**
   * Sync questions from server
   */
  const syncQuestions = useCallback(async () => {
    try {
      setLoading(true);

      // Load from cache first
      await loadFromCache();

      // Check if we have server data
      if (quizQuery.data) {
        setQuizQuestions(quizQuery.data);
      }
      if (mathQuery.data) {
        setMathProblems(mathQuery.data);
      }
      if (logicQuery.data) {
        setLogicPuzzles(logicQuery.data);
      }

      // Update sync timestamp
      if (
        quizSyncQuery.data ||
        mathSyncQuery.data ||
        logicSyncQuery.data
      ) {
        setLastSyncTime(new Date());
      }

      // Save to cache
      await saveToCache();
    } catch (error) {
      console.error("[QuestionsSync] Error syncing questions:", error);
    } finally {
      setLoading(false);
    }
  }, [
    quizQuery.data,
    mathQuery.data,
    logicQuery.data,
    quizSyncQuery.data,
    mathSyncQuery.data,
    logicSyncQuery.data,
    loadFromCache,
    saveToCache,
  ]);

  /**
   * Initial load and sync on mount
   */
  useEffect(() => {
    syncQuestions();
  }, [syncQuestions]);

  /**
   * Refresh questions from server
   */
  const refresh = useCallback(async () => {
    await Promise.all([
      quizQuery.refetch(),
      mathQuery.refetch(),
      logicQuery.refetch(),
      quizSyncQuery.refetch(),
      mathSyncQuery.refetch(),
      logicSyncQuery.refetch(),
    ]);
    await syncQuestions();
  }, [quizQuery, mathQuery, logicQuery, quizSyncQuery, mathSyncQuery, logicSyncQuery, syncQuestions]);

  /**
   * Clear cache
   */
  const clearCache = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(CACHE_KEYS.QUIZ),
        AsyncStorage.removeItem(CACHE_KEYS.MATH),
        AsyncStorage.removeItem(CACHE_KEYS.LOGIC),
        AsyncStorage.removeItem(CACHE_KEYS.SYNC_TIMESTAMP),
      ]);
      setQuizQuestions([]);
      setMathProblems([]);
      setLogicPuzzles([]);
      setLastSyncTime(null);
    } catch (error) {
      console.error("[QuestionsSync] Error clearing cache:", error);
    }
  }, []);

  return {
    quizQuestions,
    mathProblems,
    logicPuzzles,
    loading,
    lastSyncTime,
    refresh,
    clearCache,
  };
}
