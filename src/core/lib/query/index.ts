export { QueryProvider } from './provider';
export { getQueryClient, createQueryClient, defaultQueryClientConfig } from './client';
export { createQueryKeys, queryKeys, mergeQueryKeys } from './keys';
export {
  useAppQuery,
  useAppMutation,
  useAppInfiniteQuery,
  useInvalidateQueries,
  usePrefetchQuery,
  useOptimisticUpdate,
  useQueryClient,
} from './hooks';

export type {
  QueryKeyFactory,
  ExtractQueryKey,
  QueryConfig,
  AppQueryOptions,
  AppMutationOptions,
  PaginatedResponse,
  InfiniteQueryResponse,
} from './types';
