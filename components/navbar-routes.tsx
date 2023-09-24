'use client';
import { isTeacher } from '@/lib/teacher';
import React from 'react';
import { UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { SearchInput } from './search-input';

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.includes('/courses');
  const isSearchPage = pathname?.includes('/search');

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-5 ml-auto">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
