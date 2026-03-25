import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import * as dbQuestions from "./db-questions";

/**
 * Validation schemas
 */

const quizQuestionSchema = z.object({
  question: z.string().min(5),
  options: z.array(z.string()).min(2).max(6),
  correctAnswer: z.number().min(0),
  category: z.string().min(1),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
});

const mathProblemSchema = z.object({
  problem: z.string().min(5),
  options: z.array(z.string()).min(2).max(6),
  correctAnswer: z.number().min(0),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  timeLimit: z.number().min(5).max(300).default(30),
});

const logicPuzzleSchema = z.object({
  puzzle: z.string().min(5),
  options: z.array(z.string()).min(2).max(6),
  correctAnswer: z.number().min(0),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
});

/**
 * Questions Router
 * Public endpoints for fetching questions
 * Protected endpoints for managing questions (admin only)
 */

export const questionsRouter = router({
  /**
   * QUIZ QUESTIONS
   */
  quiz: router({
    // Public: Get all active quiz questions
    getAll: publicProcedure.query(async () => {
      const questions = await dbQuestions.getAllQuizQuestions();
      return questions.map((q) => ({
        ...q,
        options: JSON.parse(q.options),
      }));
    }),

    // Public: Get quiz questions by category
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        const questions = await dbQuestions.getQuizQuestionsByCategory(
          input.category
        );
        return questions.map((q) => ({
          ...q,
          options: JSON.parse(q.options),
        }));
      }),

    // Protected: Create quiz question (admin only)
    create: protectedProcedure
      .input(quizQuestionSchema)
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can create questions");
        }

        const id = await dbQuestions.createQuizQuestion({
          question: input.question,
          options: JSON.stringify(input.options),
          correctAnswer: input.correctAnswer,
          category: input.category,
          difficulty: input.difficulty,
          isActive: true,
        });

        await dbQuestions.updateSyncLog("quiz", 0);
        return { id };
      }),

    // Protected: Update quiz question (admin only)
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          ...quizQuestionSchema.partial().shape,
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can update questions");
        }

        const { id, ...data } = input;
        const updateData: any = { ...data };

        if (data.options) {
          updateData.options = JSON.stringify(data.options);
        }

        await dbQuestions.updateQuizQuestion(id, updateData);
        await dbQuestions.updateSyncLog("quiz", 0);
        return { success: true };
      }),

    // Protected: Delete quiz question (admin only)
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can delete questions");
        }

        await dbQuestions.deleteQuizQuestion(input.id);
        await dbQuestions.updateSyncLog("quiz", 0);
        return { success: true };
      }),
  }),

  /**
   * MATH PROBLEMS
   */
  math: router({
    // Public: Get all active math problems
    getAll: publicProcedure.query(async () => {
      const problems = await dbQuestions.getAllMathProblems();
      return problems.map((p) => ({
        ...p,
        options: JSON.parse(p.options),
      }));
    }),

    // Public: Get math problems by difficulty
    getByDifficulty: publicProcedure
      .input(z.object({ difficulty: z.enum(["easy", "medium", "hard"]) }))
      .query(async ({ input }) => {
        const problems = await dbQuestions.getMathProblemsByDifficulty(
          input.difficulty
        );
        return problems.map((p) => ({
          ...p,
          options: JSON.parse(p.options),
        }));
      }),

    // Protected: Create math problem (admin only)
    create: protectedProcedure
      .input(mathProblemSchema)
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can create problems");
        }

        const id = await dbQuestions.createMathProblem({
          problem: input.problem,
          options: JSON.stringify(input.options),
          correctAnswer: input.correctAnswer,
          difficulty: input.difficulty,
          timeLimit: input.timeLimit,
          isActive: true,
        });

        await dbQuestions.updateSyncLog("math", 0);
        return { id };
      }),

    // Protected: Update math problem (admin only)
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          ...mathProblemSchema.partial().shape,
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can update problems");
        }

        const { id, ...data } = input;
        const updateData: any = { ...data };

        if (data.options) {
          updateData.options = JSON.stringify(data.options);
        }

        await dbQuestions.updateMathProblem(id, updateData);
        await dbQuestions.updateSyncLog("math", 0);
        return { success: true };
      }),

    // Protected: Delete math problem (admin only)
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can delete problems");
        }

        await dbQuestions.deleteMathProblem(input.id);
        await dbQuestions.updateSyncLog("math", 0);
        return { success: true };
      }),
  }),

  /**
   * LOGIC PUZZLES
   */
  logic: router({
    // Public: Get all active logic puzzles
    getAll: publicProcedure.query(async () => {
      const puzzles = await dbQuestions.getAllLogicPuzzles();
      return puzzles.map((p) => ({
        ...p,
        options: JSON.parse(p.options),
      }));
    }),

    // Public: Get logic puzzles by difficulty
    getByDifficulty: publicProcedure
      .input(z.object({ difficulty: z.enum(["easy", "medium", "hard"]) }))
      .query(async ({ input }) => {
        const puzzles = await dbQuestions.getLogicPuzzlesByDifficulty(
          input.difficulty
        );
        return puzzles.map((p) => ({
          ...p,
          options: JSON.parse(p.options),
        }));
      }),

    // Protected: Create logic puzzle (admin only)
    create: protectedProcedure
      .input(logicPuzzleSchema)
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can create puzzles");
        }

        const id = await dbQuestions.createLogicPuzzle({
          puzzle: input.puzzle,
          options: JSON.stringify(input.options),
          correctAnswer: input.correctAnswer,
          difficulty: input.difficulty,
          isActive: true,
        });

        await dbQuestions.updateSyncLog("logic", 0);
        return { id };
      }),

    // Protected: Update logic puzzle (admin only)
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          ...logicPuzzleSchema.partial().shape,
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can update puzzles");
        }

        const { id, ...data } = input;
        const updateData: any = { ...data };

        if (data.options) {
          updateData.options = JSON.stringify(data.options);
        }

        await dbQuestions.updateLogicPuzzle(id, updateData);
        await dbQuestions.updateSyncLog("logic", 0);
        return { success: true };
      }),

    // Protected: Delete logic puzzle (admin only)
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can delete puzzles");
        }

        await dbQuestions.deleteLogicPuzzle(input.id);
        await dbQuestions.updateSyncLog("logic", 0);
        return { success: true };
      }),
  }),

  /**
   * SYNC ENDPOINTS
   */
  sync: router({
    // Public: Get last sync timestamp for a question type
    getLastSync: publicProcedure
      .input(z.object({ type: z.enum(["quiz", "math", "logic"]) }))
      .query(async ({ input }) => {
        const syncLog = await dbQuestions.getLastSyncTimestamp(input.type);
        return syncLog
          ? {
              lastSyncTimestamp: syncLog.lastSyncTimestamp,
              totalCount: syncLog.totalCount,
            }
          : null;
      }),
  }),
});

export type QuestionsRouter = typeof questionsRouter;
