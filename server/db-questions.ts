import { eq, and, desc } from "drizzle-orm";
import { getDb } from "./db";
import {
  quizQuestions,
  mathProblems,
  logicPuzzles,
  questionsSyncLog,
  InsertQuizQuestion,
  InsertMathProblem,
  InsertLogicPuzzle,
} from "../drizzle/schema";

/**
 * QUIZ QUESTIONS
 */

export async function getAllQuizQuestions() {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(quizQuestions)
    .where(eq(quizQuestions.isActive, true))
    .orderBy(desc(quizQuestions.createdAt));
}

export async function getQuizQuestionsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(quizQuestions)
    .where(
      and(
        eq(quizQuestions.category, category),
        eq(quizQuestions.isActive, true)
      )
    )
    .orderBy(desc(quizQuestions.createdAt));
}

export async function createQuizQuestion(data: InsertQuizQuestion) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(quizQuestions).values(data);
  return (result as any).insertId;
}

export async function updateQuizQuestion(
  id: number,
  data: Partial<InsertQuizQuestion>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(quizQuestions).set(data).where(eq(quizQuestions.id, id));
}

export async function deleteQuizQuestion(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(quizQuestions).where(eq(quizQuestions.id, id));
}

/**
 * MATH PROBLEMS
 */

export async function getAllMathProblems() {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(mathProblems)
    .where(eq(mathProblems.isActive, true))
    .orderBy(desc(mathProblems.createdAt));
}

export async function getMathProblemsByDifficulty(difficulty: string) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(mathProblems)
    .where(
      and(
        eq(mathProblems.difficulty, difficulty as any),
        eq(mathProblems.isActive, true)
      )
    )
    .orderBy(desc(mathProblems.createdAt));
}

export async function createMathProblem(data: InsertMathProblem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(mathProblems).values(data);
  return (result as any).insertId;
}

export async function updateMathProblem(
  id: number,
  data: Partial<InsertMathProblem>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(mathProblems).set(data).where(eq(mathProblems.id, id));
}

export async function deleteMathProblem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(mathProblems).where(eq(mathProblems.id, id));
}

/**
 * LOGIC PUZZLES
 */

export async function getAllLogicPuzzles() {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(logicPuzzles)
    .where(eq(logicPuzzles.isActive, true))
    .orderBy(desc(logicPuzzles.createdAt));
}

export async function getLogicPuzzlesByDifficulty(difficulty: string) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(logicPuzzles)
    .where(
      and(
        eq(logicPuzzles.difficulty, difficulty as any),
        eq(logicPuzzles.isActive, true)
      )
    )
    .orderBy(desc(logicPuzzles.createdAt));
}

export async function createLogicPuzzle(data: InsertLogicPuzzle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(logicPuzzles).values(data);
  return (result as any).insertId;
}

export async function updateLogicPuzzle(
  id: number,
  data: Partial<InsertLogicPuzzle>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(logicPuzzles).set(data).where(eq(logicPuzzles.id, id));
}

export async function deleteLogicPuzzle(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(logicPuzzles).where(eq(logicPuzzles.id, id));
}

/**
 * SYNC LOG
 */

export async function getLastSyncTimestamp(type: "quiz" | "math" | "logic") {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(questionsSyncLog)
    .where(eq(questionsSyncLog.type, type))
    .orderBy(desc(questionsSyncLog.lastSyncTimestamp))
    .limit(1);

  return result[0] || null;
}

export async function updateSyncLog(
  type: "quiz" | "math" | "logic",
  totalCount: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if record exists
  const existing = await db
    .select()
    .from(questionsSyncLog)
    .where(eq(questionsSyncLog.type, type))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(questionsSyncLog)
      .set({
        lastSyncTimestamp: new Date(),
        totalCount,
      })
      .where(eq(questionsSyncLog.type, type));
  } else {
    await db.insert(questionsSyncLog).values({
      type,
      lastSyncTimestamp: new Date(),
      totalCount,
    });
  }
}
