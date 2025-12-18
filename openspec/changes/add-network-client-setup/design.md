# Design: Network Client Setup

## Context
Next.js 15 dengan App Router memiliki arsitektur hybrid (server/client components). Untuk frontend yang full client-side, kita perlu memastikan React Query dan Axios hanya berjalan di client tanpa konflik dengan server-side rendering.

### Constraints
- Frontend menggunakan client layer yang full client-side
- Server-side logic ada di API layer (Hono)
- Harus mendukung TypeScript dengan type safety
- Harus scalable untuk multiple API endpoints

## Goals / Non-Goals

### Goals
- Axios instance yang reusable dengan interceptors
- React Query provider yang aman untuk client-side only
- Error handling yang konsisten
- Token management (auth header injection)
- Type-safe API calls

### Non-Goals
- Server-side data fetching (menggunakan Server Components)
- SSR hydration untuk React Query
- Offline support / persistence

## Decisions

### 1. Axios Client Structure
```
src/core/lib/network/
├── index.ts              # Public exports
├── client.ts             # Axios instance & config
├── interceptors/
│   ├── index.ts          # Interceptors setup
│   ├── request.ts        # Request interceptor (auth token)
│   └── response.ts       # Response interceptor (error handling)
└── types.ts              # TypeScript interfaces
```

**Rationale**: Pemisahan interceptors ke file terpisah memudahkan maintenance dan testing. Single axios instance memastikan konsistensi konfigurasi.

### 2. React Query Structure
```
src/core/lib/query/
├── index.ts              # Public exports
├── client.ts             # QueryClient configuration
├── provider.tsx          # QueryClientProvider wrapper ("use client")
└── keys.ts               # Query key factory pattern
```

**Rationale**: 
- Provider dengan "use client" directive memastikan hanya berjalan di client
- Query key factory pattern mencegah typo dan memudahkan cache invalidation
- QueryClient dibuat dalam useState untuk menghindari sharing state antar requests

### 3. QueryClient Configuration
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,        // 1 menit
      gcTime: 5 * 60 * 1000,       // 5 menit (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false, // Disable untuk mengurangi unnecessary requests
    },
  },
})
```

**Rationale**: Konfigurasi konservatif yang mengurangi network requests sambil tetap menjaga data freshness.

### 4. Axios Interceptors Pattern

**Request Interceptor:**
- Inject Authorization header dari token storage
- Add request timestamp untuk debugging

**Response Interceptor:**
- Handle 401 Unauthorized → redirect to login atau trigger token refresh
- Handle network errors dengan user-friendly message
- Normalize error response structure

### 5. Integration Pattern
```tsx
// src/app/layout.tsx atau dedicated providers file
<QueryProvider>
  {children}
</QueryProvider>
```

**Rationale**: QueryProvider di root layout memastikan semua client components bisa menggunakan React Query hooks.

## Alternatives Considered

### 1. Native Fetch vs Axios
- **Chosen**: Axios
- **Why**: Interceptors built-in, automatic JSON transformation, better error handling, request cancellation dengan AbortController lebih mudah

### 2. React Query vs SWR
- **Chosen**: React Query (TanStack Query)
- **Why**: Lebih powerful mutation handling, devtools lebih baik, query invalidation lebih fleksibel

### 3. Global QueryClient vs Per-Request
- **Chosen**: Per-component useState pattern
- **Why**: Mencegah state sharing antar server requests di Next.js

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Bundle size increase (~15kb gzipped) | Acceptable untuk DX improvement |
| Learning curve untuk team | Dokumentasi dan contoh usage |
| Over-caching stale data | Konfigurasi staleTime yang reasonable |

## Migration Plan
1. Install dependencies (axios, @tanstack/react-query)
2. Setup network client
3. Setup React Query provider
4. Update root layout
5. Test dengan sample API call

## Resolved Questions
- **React Query Devtools**: Ya, include di development mode only
- **Token storage**: localStorage untuk menyimpan auth token
