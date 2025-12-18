# Tasks: Network Client Setup

## 1. Dependencies
- [x] 1.1 Install axios
- [x] 1.2 Install @tanstack/react-query
- [x] 1.3 Install @tanstack/react-query-devtools (dev only)

## 2. Axios Network Client
- [x] 2.1 Create `src/core/lib/network/types.ts` - TypeScript interfaces
- [x] 2.2 Create `src/core/lib/network/client.ts` - Axios instance dengan base config
- [x] 2.3 Create `src/core/lib/network/interceptors/request.ts` - Request interceptor
- [x] 2.4 Create `src/core/lib/network/interceptors/response.ts` - Response interceptor
- [x] 2.5 Create `src/core/lib/network/interceptors/index.ts` - Setup interceptors
- [x] 2.6 Create `src/core/lib/network/index.ts` - Public exports

## 3. React Query Setup
- [x] 3.1 Create `src/core/lib/query/client.ts` - QueryClient factory
- [x] 3.2 Create `src/core/lib/query/provider.tsx` - QueryClientProvider wrapper
- [x] 3.3 Create `src/core/lib/query/keys.ts` - Query key factory
- [x] 3.4 Create `src/core/lib/query/index.ts` - Public exports

## 4. Integration
- [x] 4.1 Update root layout atau providers untuk wrap QueryProvider

## 5. Verification
- [ ] 5.1 Verify typecheck passes
- [ ] 5.2 Verify lint passes
- [ ] 5.3 Test basic usage dengan sample query (manual)
