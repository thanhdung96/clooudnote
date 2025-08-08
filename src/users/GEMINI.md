# Users Module

## Purpose
The `UsersModule` is responsible for managing user accounts within the application. This includes user registration, retrieving user profiles, and updating user profile information. It integrates with Sequelize for database operations and employs custom decorators for advanced validation, such as ensuring unique email addresses. Additionally, it leverages event emitters to publish events like `USER_CREATED_EVENT` upon successful user creation.

## Structure

- **Controllers**: Handle incoming HTTP requests related to user accounts.
- **Services**: Encapsulate the business logic for user management.
- **DTOs (Data Transfer Objects)**: Define the structure for request and response data, used for validation and serialization.
- **Models**: Define the database schema for user entities using Sequelize ORM.

## Components

### Controllers

*   **`AccountController`** (`account.controller.ts`)
    *   **Purpose**: Manages API endpoints for the authenticated user's account and profile.
    *   **Endpoints**:
        *   `GET /account/profile`: Retrieves the profile details of the currently authenticated user.
        *   `PATCH /account/profile`: Updates the profile information of the currently authenticated user.
    *   **Extends**: `GenericController` for standardized API response handling.
    *   **Dependencies**: `UsersService`.

*   **`UsersController`** (`users.controller.ts`)
    *   **Purpose**: Handles user registration within the application.
    *   **Endpoints**:
        *   `POST /users/register`: Registers a new user with the provided details. This is marked as a public route, accessible without authentication.
    *   **Extends**: `GenericController`.
    *   **Dependencies**: `UsersService`.

### Services

*   **`UsersService`** (`users.service.ts`)
    *   **Purpose**: Provides the core business logic for all user-related operations.
    *   **Methods**:
        *   `saveNewUser(registrationDto, role)`: Creates a new user in the database. It hashes the user's password, assigns a role (defaulting to `USER_ROLES.USER`), and emits a `USER_CREATED_EVENT`.
        *   `getAdmin()`: Retrieves the user with the `ADMIN` role from the database.
        *   `getUserByEmail(email)`: Fetches a user record based on their email address.
        *   `getActiveUserByEmail(email)`: Fetches an active user record based on their email address.
        *   `updateUserProfile(currentEmail, updateData)`: Updates the profile information for a user identified by `currentEmail`. It includes logic to prevent updating to an already existing email address.
    *   **Dependencies**: `Users` (Sequelize model), `EventEmitter2`.

### DTOs (Data Transfer Objects)

*   **`UserProfileDto`** (`profile.dto.ts`)
    *   **Purpose**: Defines the structure for the data returned when retrieving a user's profile.
    *   **Fields**: `firstName` (string), `lastName` (string), `email` (string), `createdAt` (string, optional).

*   **`RegistrationDto`** (`register.dto.ts`)
    *   **Purpose**: Defines the data structure for new user registration requests.
    *   **Fields**: `firstName` (string), `lastName` (string), `email` (string, validated for uniqueness), `password` (string).

*   **`UpdateProfileDto`** (`update-profile.dto.ts`)
    *   **Purpose**: Defines the data structure for requests to update an existing user's profile.
    *   **Fields**: `firstName` (string), `lastName` (string), `email` (string, validated for uniqueness).

### Models

*   **`Users`** (`users.models.ts`)
    *   **Purpose**: Sequelize model representing the `users` table in the database.
    *   **Fields**: `id`, `firstName`, `lastName`, `email` (unique), `password` (hashed), `active` (boolean, default `false`), `role` (string), `createdAt`, `updatedAt`, `deletedAt`.
    *   **Associations**: `HasMany` `Tags`, `HasMany` `NoteBooks`.
    *   **Features**: Supports soft-deletion (`paranoid: true`) to retain historical data while logically removing users.
