'use client';

import { useQueryClient, QueryKey } from '@tanstack/react-query';

export function usePrefetchQuery<TData = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  staleTime?: number
) {
  const queryClient = useQueryClient();

  return () =>
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      staleTime,
    });
}
