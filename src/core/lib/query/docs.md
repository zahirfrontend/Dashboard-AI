# React Query Library

Konfigurasi React Query yang siap pakai dengan custom hooks, type-safe query keys, dan optimistic updates.

## Setup

Wrap root layout dengan `QueryProvider`:

```tsx
// src/app/layout.tsx
import { QueryProvider } from '@/core/lib/query';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
```

DevTools otomatis muncul di development mode. Untuk disable:

```tsx
<QueryProvider showDevtools={false}>{children}</QueryProvider>
```

---

## Query Keys

Type-safe query key factory untuk konsistensi dan mencegah typo.

### Preset Keys

```ts
import { queryKeys } from '@/core/lib/query';

// Available: users, invoices, products, customers, settings
queryKeys.users.all              // ['users']
queryKeys.users.lists()          // ['users', 'list']
queryKeys.users.list({ role: 'admin' })  // ['users', 'list', { role: 'admin' }]
queryKeys.users.details()        // ['users', 'detail']
queryKeys.users.detail('123')    // ['users', 'detail', '123']
```

### Custom Keys

```ts
import { createQueryKeys } from '@/core/lib/query';

const orderKeys = createQueryKeys('orders');
orderKeys.all                    // ['orders']
orderKeys.detail('ord-123')      // ['orders', 'detail', 'ord-123']
```

### Merge Keys

```ts
import { mergeQueryKeys, queryKeys, createQueryKeys } from '@/core/lib/query';

const customKeys = {
  orders: createQueryKeys('orders'),
  payments: createQueryKeys('payments'),
};

const allKeys = mergeQueryKeys(queryKeys, customKeys);
```

---

## Hooks

### useAppQuery

Basic data fetching.

```tsx
import { useAppQuery, queryKeys } from '@/core/lib/query';

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useAppQuery(
    queryKeys.users.detail(userId),
    () => api.users.getById(userId),
    {
      enabled: !!userId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <div>{data.name}</div>;
}
```

### useAppMutation

Create, update, delete operations.

```tsx
import { useAppMutation, useInvalidateQueries, queryKeys } from '@/core/lib/query';

function CreateUser() {
  const { invalidate } = useInvalidateQueries();
  
  const mutation = useAppMutation(
    (data: CreateUserInput) => api.users.create(data),
    {
      onSuccess: () => {
        invalidate(queryKeys.users.lists());
        toast.success('User created!');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const handleSubmit = (data: CreateUserInput) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
```

### useAppInfiniteQuery

Infinite scroll / load more.

```tsx
import { useAppInfiniteQuery, queryKeys } from '@/core/lib/query';

function InvoiceList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAppInfiniteQuery(
    queryKeys.invoices.lists(),
    ({ pageParam }) => api.invoices.list({ page: pageParam, limit: 20 }),
    {
      getNextPageParam: (lastPage) => 
        lastPage.hasNextPage ? lastPage.nextCursor : undefined,
    }
  );

  const allInvoices = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div>
      {allInvoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

### useInvalidateQueries

Invalidate cache setelah mutation.

```tsx
import { useInvalidateQueries, queryKeys } from '@/core/lib/query';

function DeleteButton({ userId }: { userId: string }) {
  const { invalidate, invalidateExact, invalidateAll } = useInvalidateQueries();

  const handleDelete = async () => {
    await api.users.delete(userId);
    
    // Invalidate semua user queries
    invalidate(queryKeys.users.all);
    
    // Atau hanya user spesifik
    invalidateExact(queryKeys.users.detail(userId));
    
    // Atau semua queries
    invalidateAll();
  };
}
```

### usePrefetchQuery

Prefetch data sebelum dibutuhkan (hover, route change).

```tsx
import { usePrefetchQuery, queryKeys } from '@/core/lib/query';

function UserLink({ userId }: { userId: string }) {
  const prefetch = usePrefetchQuery(
    queryKeys.users.detail(userId),
    () => api.users.getById(userId),
    1000 * 60 * 5 // staleTime
  );

  return (
    <Link href={`/users/${userId}`} onMouseEnter={prefetch}>
      View User
    </Link>
  );
}
```

### useOptimisticUpdate

Update UI sebelum server response (optimistic UI).

```tsx
import { useAppMutation, useOptimisticUpdate, queryKeys } from '@/core/lib/query';

function ToggleFavorite({ productId }: { productId: string }) {
  const { setQueryData, getQueryData, cancelQueries } = useOptimisticUpdate<Product>();

  const mutation = useAppMutation(
    () => api.products.toggleFavorite(productId),
    {
      onMutate: async () => {
        await cancelQueries(queryKeys.products.detail(productId));
        
        const previous = getQueryData(queryKeys.products.detail(productId));
        
        setQueryData(queryKeys.products.detail(productId), (old) => ({
          ...old!,
          isFavorite: !old?.isFavorite,
        }));
        
        return { previous };
      },
      onError: (_, __, context) => {
        // Rollback on error
        if (context?.previous) {
          setQueryData(queryKeys.products.detail(productId), () => context.previous!);
        }
      },
    }
  );
}
```

---

## Types

```ts
import type {
  QueryKeyFactory,      // Type untuk query key factory
  ExtractQueryKey,      // Extract return type dari query key function
  QueryConfig,          // Common query configuration
  AppQueryOptions,      // Options untuk useAppQuery
  AppMutationOptions,   // Options untuk useAppMutation
  PaginatedResponse,    // Standard paginated response
  InfiniteQueryResponse,// Standard infinite query response
} from '@/core/lib/query';

// Contoh penggunaan PaginatedResponse
interface User { id: string; name: string; }
type UsersResponse = PaginatedResponse<User>;
// { data: User[], meta: { currentPage, lastPage, perPage, total } }

// Contoh penggunaan InfiniteQueryResponse
type InfiniteUsersResponse = InfiniteQueryResponse<User>;
// { data: User[], nextCursor?: string | number, hasNextPage: boolean }
```

---

## Default Configuration

| Option | Value | Description |
|--------|-------|-------------|
| `staleTime` | 5 minutes | Data dianggap fresh selama 5 menit |
| `gcTime` | 30 minutes | Cache dihapus setelah 30 menit tidak digunakan |
| `refetchOnWindowFocus` | `false` | Tidak refetch saat window focus |
| `refetchOnMount` | `true` | Refetch saat component mount jika stale |
| `refetchOnReconnect` | `true` | Refetch saat reconnect internet |
| `retry` | `1` | Retry 1x jika gagal |
| `retryDelay` | exponential | 1s, 2s, 4s... max 30s |

### Custom Configuration

```ts
import { createQueryClient } from '@/core/lib/query';

const customClient = createQueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      retry: 3,
    },
  },
});
```

---

## Direct QueryClient Access

```ts
import { getQueryClient, useQueryClient } from '@/core/lib/query';

// Di luar React component
const queryClient = getQueryClient();
queryClient.invalidateQueries({ queryKey: ['users'] });

// Di dalam React component
function Component() {
  const queryClient = useQueryClient();
  // ...
}
```
