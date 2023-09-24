'use client';

import { trpc } from '@/app/_trpc/trpcClient';

export const TodoList = () => {
  const getTodos = trpc.getTodos.useQuery();

  return <div>{JSON.stringify(getTodos.data)}</div>;
};
