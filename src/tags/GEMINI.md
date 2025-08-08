# Tags Module

## Purpose
The `TagsModule` is responsible for managing tags associated with user accounts. This includes creating, retrieving, updating, and deleting tags. It integrates with the `UsersModule` for user association and the `SecuritiesModule` for authorization checks. It also includes an event listener to automatically create default tags for new users.

## Structure

- **Controllers**: Handle incoming HTTP requests related to tags.
- **Services**: Encapsulate the business logic for tag management.
- **DTOs (Data Transfer Objects)**: Define the structure for request and response data for tags.
- **Models**: Define the database schema for tag entities using Sequelize ORM.
- **Listeners**: Handle events related to user creation to provide default tags.

## Components

### Controllers

*   **`TagsController`** (`tags.controller.ts`)
    *   **Purpose**: Manages API endpoints for `tags`.
    *   **Endpoints**:
        *   `GET /tags`: Retrieves all tags belonging to the authenticated user.
        *   `GET /tags/:id`: Retrieves a specific tag by its ID, with authorization checks.
        *   `PATCH /tags/:id`: Updates an existing tag by its ID, with authorization checks.
        *   `POST /tags`: Creates a new tag for the authenticated user.
        *   `DELETE /tags/:id`: Deletes a tag by its ID, with authorization checks.
    *   **Extends**: `GenericController` for standardized API response handling.
    *   **Dependencies**: `TagsService`, `UsersService`, `CaslAbilityFactory`.

### Services

*   **`TagsService`** (`tags.service.ts`)
    *   **Purpose**: Provides core business logic for tag management.
    *   **Methods**:
        *   `getAll(user)`: Retrieves all tags for a given user.
        *   `getTagById(tagId)`: Retrieves a tag by its ID.
        *   `getById(id)`: Retrieves a tag by its ID.
        *   `generateDefaultTags(user)`: Generates a list of default tags for a new user.
        *   `create(createTagDto, user)`: Creates a new tag for a user.
        *   `updateById(id, updateTagDto)`: Updates an existing tag.
        *   `deleteById(id)`: Deletes a tag.
    *   **Dependencies**: `Tags` (Sequelize model).

### DTOs (Data Transfer Objects)

*   **`CreateTagDto`** (`create-tag.dto.ts`)
    *   **Purpose**: Defines the data structure for creating a new tag.
    *   **Fields**: `name` (string), `description` (string, optional), `colour` (string), `userId` (number, declared, not exposed in payload).

*   **`UpdateTagDto`** (`update-tag.dto.ts`)
    *   **Purpose**: Defines the data structure for updating an existing tag.
    *   **Fields**: `id` (number, optional), `name` (string), `description` (string, optional), `colour` (string).

### Models

*   **`Tags`** (`tags.models.ts`)
    *   **Purpose**: Sequelize model representing the `tags` table in the database.
    *   **Fields**: `id`, `name`, `description`, `colour`, `userId` (ForeignKey to `Users`), `createdAt`, `updatedAt`.
    *   **Associations**: `BelongsTo` `Users`.
    *   **Features**: No soft-deletion (deletedAt: false).

### Listeners

*   **`TagsListener`** (`tags.listener.ts`)
    *   **Purpose**: Listens for the `USER_CREATED_EVENT` and creates default tags for the newly registered user.
    *   **Methods**:
        *   `onUserCreated(userCreatedEvent)`: Event handler that retrieves the new user and creates default tags for them using `TagsService`.
    *   **Dependencies**: `Tags` (Sequelize model), `UsersService`, `TagsService`.
