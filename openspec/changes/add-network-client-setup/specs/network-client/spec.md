# Network Client Specification

## ADDED Requirements

### Requirement: Axios Client Instance
The system SHALL provide a configured Axios client instance for making HTTP requests to external APIs.

#### Scenario: Default configuration applied
- **WHEN** the axios client is imported
- **THEN** it SHALL have a default base URL configured from environment variables
- **AND** it SHALL have a default timeout of 30 seconds
- **AND** it SHALL have default headers including Content-Type: application/json

#### Scenario: Client is singleton
- **WHEN** the axios client is imported from multiple modules
- **THEN** the same instance SHALL be returned to ensure consistent configuration

---

### Requirement: Request Interceptor
The system SHALL intercept outgoing requests to inject authentication headers and metadata.

#### Scenario: Auth token injection
- **WHEN** a request is made AND an auth token exists in storage
- **THEN** the Authorization header SHALL be set with the Bearer token

#### Scenario: No token available
- **WHEN** a request is made AND no auth token exists
- **THEN** the request SHALL proceed without Authorization header

---

### Requirement: Response Interceptor
The system SHALL intercept responses to handle errors consistently across the application.

#### Scenario: Successful response
- **WHEN** the API returns a 2xx status code
- **THEN** the response data SHALL be passed through unchanged

#### Scenario: Unauthorized error (401)
- **WHEN** the API returns a 401 status code
- **THEN** the system SHALL clear stored auth tokens
- **AND** the system MAY redirect to login page or trigger re-authentication

#### Scenario: Network error
- **WHEN** a network error occurs (no response)
- **THEN** the error SHALL be normalized with a user-friendly message
- **AND** the original error SHALL be preserved for debugging

#### Scenario: Server error (5xx)
- **WHEN** the API returns a 5xx status code
- **THEN** the error SHALL be normalized with appropriate error message

---

### Requirement: React Query Provider
The system SHALL provide a QueryClientProvider that enables React Query hooks in client components.

#### Scenario: Provider initialization
- **WHEN** the application starts on the client side
- **THEN** a new QueryClient instance SHALL be created
- **AND** the QueryClient SHALL NOT be shared between server requests

#### Scenario: Client-side only execution
- **WHEN** the QueryProvider component is rendered
- **THEN** it SHALL only execute on the client side (using "use client" directive)

---

### Requirement: Query Client Configuration
The system SHALL configure QueryClient with sensible defaults for client-side data fetching.

#### Scenario: Default query options
- **WHEN** a query is executed without custom options
- **THEN** staleTime SHALL default to 60 seconds
- **AND** gcTime (garbage collection) SHALL default to 5 minutes
- **AND** retry SHALL default to 1 attempt
- **AND** refetchOnWindowFocus SHALL be disabled

---

### Requirement: Query Key Factory
The system SHALL provide a query key factory pattern for consistent cache key management.

#### Scenario: Key generation
- **WHEN** creating query keys for a resource
- **THEN** the factory SHALL provide methods for all, lists, and detail keys
- **AND** keys SHALL be hierarchically structured for cache invalidation

#### Scenario: Type safety
- **WHEN** using query key factory
- **THEN** TypeScript SHALL enforce correct key structure
