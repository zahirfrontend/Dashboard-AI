import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from '@tanstack/react-query';

export type QueryKeyFactory<T extends string = string> = {
  all: readonly [T];
  lists: () => readonly [T, 'list'];
  list: (filters?: Record<string, unknown>) => readonly [T, 'list', Record<string, unknown>?];
  details: () => readonly [T, 'detail'];
  detail: (id: string | number) => readonly [T, 'detail', string | number];
};

export type ExtractQueryKey<T> = T extends (...args: unknown[]) => infer R ? R : never;

export interface QueryConfig<TData = unknown, TError = Error> {
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  refetchOnReconnect?: boolean;
  retry?: boolean | number;
  retryDelay?: number | ((attemptIndex: number) => number);
}

export type AppQueryOptions<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>;

export type AppMutationOptions<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>;

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

export interface InfiniteQueryResponse<T> {
  data: T[];
  nextCursor?: string | number;
  hasNextPage: boolean;
}
