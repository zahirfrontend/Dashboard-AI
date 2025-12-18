'use client';

import { useMutation } from '@tanstack/react-query';
import type { AppMutationOptions } from '../types';

export function useAppMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: AppMutationOptions<TData, TError, TVariables>
) {
  return useMutation({
    mutationFn,
    ...options,
  });
}
