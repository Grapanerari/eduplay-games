import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Quiz Questions Table - Stores all quiz questions
 */
export const quizQuestions = mysqlTable("quiz_questions", {
  id: int("id").autoincrement().primaryKey(),
  question: text("question").notNull(),
  options: text("options").notNull(), // JSON array stored as text
  correctAnswer: int("correctAnswer").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("medium").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = typeof quizQuestions.$inferInsert;

/**
 * Math Problems Table - Stores all math problems
 */
export const mathProblems = mysqlTable("math_problems", {
  id: int("id").autoincrement().primaryKey(),
  problem: text("problem").notNull(),
  options: text("options").notNull(), // JSON array stored as text
  correctAnswer: int("correctAnswer").notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("medium").notNull(),
  timeLimit: int("timeLimit").default(30).notNull(), // seconds
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MathProblem = typeof mathProblems.$inferSelect;
export type InsertMathProblem = typeof mathProblems.$inferInsert;

/**
 * Logic Puzzles Table - Stores all logic puzzles
 */
export const logicPuzzles = mysqlTable("logic_puzzles", {
  id: int("id").autoincrement().primaryKey(),
  puzzle: text("puzzle").notNull(),
  options: text("options").notNull(), // JSON array stored as text
  correctAnswer: int("correctAnswer").notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("medium").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LogicPuzzle = typeof logicPuzzles.$inferSelect;
export type InsertLogicPuzzle = typeof logicPuzzles.$inferInsert;

/**
 * Questions Sync Log - Tracks when questions were last synced
 */
export const questionsSyncLog = mysqlTable("questions_sync_log", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["quiz", "math", "logic"]).notNull(),
  lastSyncTimestamp: timestamp("lastSyncTimestamp").defaultNow().notNull(),
  totalCount: int("totalCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuestionsSyncLog = typeof questionsSyncLog.$inferSelect;
export type InsertQuestionsSyncLog = typeof questionsSyncLog.$inferInsert;
