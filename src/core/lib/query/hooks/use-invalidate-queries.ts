'use client';

import { useQueryClient, QueryKey } from '@tanstack/react-query';

export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidate: (queryKey: QueryKey) => queryClient.invalidateQueries({ queryKey }),
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateExact: (queryKey: QueryKey) =>
      queryClient.invalidateQueries({ queryKey, exact: true }),
  };
}
