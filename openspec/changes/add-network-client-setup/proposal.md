# Change: Setup Network Client dengan Axios dan React Query

## Why
Aplikasi membutuhkan network client yang terstruktur dan reusable untuk berkomunikasi dengan API. Setup ini akan menyediakan axios instance dengan interceptors untuk handling request/response secara konsisten, serta React Query untuk client-side data fetching dengan caching, background refetching, dan state management yang optimal di Next.js 15.

## What Changes
- Setup Axios client dengan konfigurasi base URL, timeout, dan default headers
- Implementasi request interceptor untuk inject auth token
- Implementasi response interceptor untuk error handling dan token refresh
- Setup React Query provider dengan konfigurasi optimal untuk client-side only
- Buat custom hooks pattern untuk data fetching
- Struktur folder yang scalable dan maintainable

## Impact
- Affected specs: `network-client` (new capability)
- Affected code:
  - `src/core/lib/network/` - Axios client dan interceptors
  - `src/core/lib/query/` - React Query provider dan hooks
  - `src/app/layout.tsx` - Provider wrapper (minimal change)
