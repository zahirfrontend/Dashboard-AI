import type { QueryKeyFactory } from '../types';

export function createQueryKeys<T extends string>(namespace: T): QueryKeyFactory<T> {
  return {
    all: [namespace] as const,
    lists: () => [namespace, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [namespace, 'list', filters] as const,
    details: () => [namespace, 'detail'] as const,
    detail: (id: string | number) => [namespace, 'detail', id] as const,
  };
}

export const queryKeys = {
  users: createQueryKeys('users'),
  invoices: createQueryKeys('invoices'),
  products: createQueryKeys('products'),
  customers: createQueryKeys('customers'),
  settings: createQueryKeys('settings'),
} as const;

export type QueryKeys = typeof queryKeys;

export function mergeQueryKeys<T extends Record<string, QueryKeyFactory>>(
  ...keyObjects: T[]
): T {
  return Object.assign({}, ...keyObjects) as T;
}
