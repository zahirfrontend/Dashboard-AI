'use client';

import { useQuery, QueryKey } from '@tanstack/react-query';
import type { AppQueryOptions } from '../types';

export function useAppQuery<TData = unknown, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: AppQueryOptions<TData, TError>
) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}
