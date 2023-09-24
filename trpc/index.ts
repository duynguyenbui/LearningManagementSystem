import { db } from '@/lib/db';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';
import { Category, Chapter, Course } from '@prisma/client';
import { getProgress } from '@/actions/get-progress';

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
  getProgess: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const publishedChapters = await db.chapter.findMany({
          where: {
            courseId: input.courseId,
            isPublished: true,
          },
          select: {
            id: true,
          },
        });

        const publishedChapterIds = publishedChapters.map(
          (chapter) => chapter.id
        );

        const validCompletedChapters = await db.userProgress.count({
          where: {
            userId: input.userId,
            chapterId: {
              in: publishedChapterIds,
            },
            isCompleted: true,
          },
        });

        const progressPercentage =
          (validCompletedChapters / publishedChapterIds.length) * 100;

        return progressPercentage;
      } catch (error) {
        console.log('[GET_PROGRESS]', error);
        return 0;
      }
    }),
  getPurchase: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        courseId: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      try {
        const purchase = await db.purchase.findUnique({
          where: {
            userId_courseId: {
              userId: input.userId,
              courseId: input.courseId,
            },
          },
        });
        return purchase;
      } catch (error) {
        console.log('[GET_PURCHASE]', error);
        return null;
      }
    }),

  getDashboardCourses: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
      })
    )
    .query(async ({ input }): Promise<DashboardCourses> => {
      try {
        const purchasedCourses = await db.purchase.findMany({
          where: {
            userId: input.userId,
          },
          select: {
            course: {
              include: {
                category: true,
                chapters: {
                  where: {
                    isPublished: true,
                  },
                },
              },
            },
          },
        });

        const courses = purchasedCourses.map(
          (purchase) => purchase.course
        ) as CourseWithProgressWithCategory[];

        for (let course of courses) {
          const progress = await getProgress(input.userId, course.id);
          course['progress'] = progress;
        }

        const completedCourses = courses.filter(
          (course) => course.progress === 100
        );

        const courseInProgress = courses.filter(
          (course) => (course.progress ?? 0) < 100
        );

        return {
          coursesInProgress: courseInProgress,
          completedCourses: completedCourses,
        };
      } catch (error) {
        console.log('[GET_DASHBOARD_COURSES]', error);
        return {
          completedCourses: [],
          coursesInProgress: [],
        };
      }
    }),
});

export type AppRouter = typeof appRouter;
