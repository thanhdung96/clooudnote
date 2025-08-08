# Securities Module

## Purpose
The `SecuritiesModule` is responsible for handling authentication and authorization within the application. It provides functionalities for user login, password changes, and implements guards for protecting routes based on authentication status and user roles/abilities. It integrates with JWT for token management and CASL for fine-grained authorization.

## Structure

- **Controllers**: Handle incoming HTTP requests related to security.
- **Services**: Encapsulate the business logic for authentication and authorization.
- **DTOs (Data Transfer Objects)**: Define the structure for request and response data related to security.
- **Guards**: Implement authentication and authorization logic to protect routes.

## Components

### Controllers

*   **`SecuritiesController`** (`securities.controller.ts`)
    *   **Purpose**: Manages API endpoints for authentication and password management.
    *   **Endpoints**:
        *   `POST /securities/password/change`: Allows an authenticated user to change their password.
        *   `POST /securities/login`: Authenticates a user and returns an authentication token. This is a public route.
    *   **Extends**: `GenericController` for standardized API response handling.
    *   **Dependencies**: `SecuritiesService`, `UsersService`.

### Services

*   **`SecuritiesService`** (`securities.service.ts`)
    *   **Purpose**: Provides core business logic for user authentication and password management.
    *   **Methods**:
        *   `authenticate(loginDto)`: Authenticates a user based on email and password, returning a JWT token upon success.
        *   `checkPassword(password, user)`: Validates a given password against a user's stored hashed password.
        *   `changePassword(user, newPassword)`: Updates a user's password after hashing the new password.
    *   **Dependencies**: `UsersService`, `JwtService`.

*   **`CaslAbilityFactory`** (`casl.factory.ts`)
    *   **Purpose**: Factory for creating CASL abilities (authorization rules) for different types of subjects (e.g., Tags, Notebooks) based on the user's ID.
    *   **Methods**:
        *   `createTagsAbilityForUser(user)`: Creates an ability for a user to perform actions (read, update, delete) on `Tags` where the `userId` matches.
        *   `createNotebookAbilityForUser(user)`: Creates an ability for a user to perform actions (read, update, delete) on `NoteBooks` where the `userId` matches.
    *   **Dependencies**: None directly, but uses `Tags` and `NoteBooks` models for subject typing.

*   **`PoliciesHandler`** (`policies.handler.ts`)
    *   **Purpose**: Defines the interface and types for policy handlers used with CASL abilities to check if a user is authorized to perform an action.
    *   **Dependencies**: `CaslAbilityFactory` (indirectly through `TagsAbility`).

### DTOs (Data Transfer Objects)

*   **`ChangePasswordDto`** (`change_pw.dto.ts`)
    *   **Purpose**: Defines the data structure for changing a user's password.
    *   **Fields**: `email` (string), `password` (string, current password), `newPassword` (string).

*   **`JwtPayload`** (`jwt_payload.dto.ts`)
    *   **Purpose**: Defines the structure of the JWT payload.
    *   **Fields**: `userId` (string), `email` (string), `role` (string).

*   **`LoginDto`** (`login.dto.ts`)
    *   **Purpose**: Defines the data structure for user login requests.
    *   **Fields**: `email` (string), `password` (string).

### Guards

*   **`AuthenGuard`** (`auth.guard.ts`)
    *   **Purpose**: Protects routes by validating JWT tokens from the request header. Allows public routes to bypass authentication.
    *   **Dependencies**: `JwtService`, `Reflector`.

*   **`PoliciesGuard`** (`policy.guard.ts`)
    *   **Purpose**: Implements authorization checks using CASL abilities and policy handlers to determine if a user has the necessary permissions to access a resource or perform an action.
    *   **Dependencies**: `Reflector`, `CaslAbilityFactory`.
