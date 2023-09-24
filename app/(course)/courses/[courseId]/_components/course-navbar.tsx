import { NavbarRoutes } from '@/components/navbar-routes';
import { Chapter, Course, UserProgress } from '@prisma/client';
import { CourseMobileSidebar } from './course-mobile-sidebar';

export const CourseNavbar = ({
  course,
  progressCount,
}: {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
