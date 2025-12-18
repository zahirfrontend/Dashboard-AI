'use client';

import { useInfiniteQuery, QueryKey, QueryFunctionContext } from '@tanstack/react-query';
import type { InfiniteQueryResponse } from '../types';

export function useAppInfiniteQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: (context: QueryFunctionContext<QueryKey, number>) => Promise<InfiniteQueryResponse<TData>>,
  options?: {
    initialPageParam?: number;
    getNextPageParam?: (lastPage: InfiniteQueryResponse<TData>) => number | undefined;
    enabled?: boolean;
    staleTime?: number;
    gcTime?: number;
  }
) {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: options?.initialPageParam ?? 1,
    getNextPageParam: options?.getNextPageParam ?? ((lastPage) => {
      return lastPage.hasNextPage ? (lastPage.nextCursor as number) : undefined;
    }),
    enabled: options?.enabled,
    staleTime: options?.staleTime,
    gcTime: options?.gcTime,
  });
}
