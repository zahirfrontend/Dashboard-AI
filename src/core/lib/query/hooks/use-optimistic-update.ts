'use client';

import { useQueryClient, QueryKey } from '@tanstack/react-query';

export function useOptimisticUpdate<TData = unknown>() {
  const queryClient = useQueryClient();

  return {
    setQueryData: (queryKey: QueryKey, updater: (old: TData | undefined) => TData) =>
      queryClient.setQueryData(queryKey, updater),
    getQueryData: (queryKey: QueryKey) => queryClient.getQueryData<TData>(queryKey),
    cancelQueries: (queryKey: QueryKey) => queryClient.cancelQueries({ queryKey }),
  };
}
