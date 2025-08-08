# Notes Module

## Purpose
The `NotesModule` is responsible for managing the core note-taking functionality of the application. It handles the creation, retrieval, updating, and deletion of notebooks, sections within notebooks, and pages within sections. It integrates with the `UsersModule` for user authentication and the `SecuritiesModule` for authorization checks to ensure users can only access and modify their own notes and related entities.

## Structure

- **Controllers**: Handle incoming HTTP requests and delegate business logic to services.
- **Services**: Encapsulate the business logic and interact with the database models.
- **DTOs (Data Transfer Objects)**: Define the structure for request and response bodies, used for validation and data serialization.
- **Models**: Define the database schemas using Sequelize ORM.

## Components

### Controllers

*   **`NotesController`** (`notes.controller.ts`)
    *   **Purpose**: Manages API endpoints for `notebooks`.
    *   **Endpoints**:
        *   `POST /notebooks`: Creates a new notebook for the authenticated user.
        *   `GET /notebooks`: Retrieves all notebooks belonging to the authenticated user.
        *   `GET /notebooks/:id`: Retrieves a specific notebook by its ID, with authorization checks.
        *   `PATCH /notebooks/:id`: Updates an existing notebook by its ID, with authorization checks.
        *   `DELETE /notebooks/:id`: Soft-deletes a notebook by its ID, with authorization checks.
        *   `PATCH /notebooks/:id/restore`: Restores a previously soft-deleted notebook by its ID, with authorization checks.
    *   **Dependencies**: `NotesService`, `UsersService`, `CaslAbilityFactory`.

*   **`PagesController`** (`pages.controller.ts`)
    *   **Purpose**: Manages API endpoints for `pages` nested within `notebooks` and `sections`.
    *   **Endpoints**:
        *   `GET /notebooks/:notebooksId/sections/:sectionId/pages`: Retrieves all pages within a specific section of a notebook.
        *   `GET /notebooks/:notebooksId/sections/:sectionId/pages/:id`: Retrieves a specific page by ID within a section, with authorization checks.
        *   `POST /notebooks/:notebooksId/sections/:sectionId/pages`: Creates a new page within a specified section, with authorization checks.
        *   `PATCH /notebooks/:notebooksId/sections/:sectionId/pages/:id`: Updates an existing page, with authorization checks.
        *   `DELETE /notebooks/:notebooksId/sections/:sectionId/pages/:id`: Deletes a page, with authorization checks.
    *   **Dependencies**: `PagesService`, `CaslAbilityFactory`, `UsersService`, `NotesService`, `SectionsService`.

*   **`SectionsController`** (`sections.controller.ts`)
    *   **Purpose**: Manages API endpoints for `sections` nested within `notebooks`.
    *   **Endpoints**:
        *   `GET /notebooks/:notebooksId/sections`: Retrieves all sections within a specific notebook.
        *   `GET /notebooks/:notebooksId/sections/:id`: Retrieves a specific section by ID within a notebook, with authorization checks.
        *   `POST /notebooks/:notebooksId/sections`: Creates a new section within a specified notebook, with authorization checks.
        *   `PATCH /notebooks/:notebooksId/sections/:id`: Updates an existing section, with authorization checks.
        *   `DELETE /notebooks/:notebooksId/sections/:id`: Deletes a section, with authorization checks.
    *   **Dependencies**: `SectionsService`, `CaslAbilityFactory`, `UsersService`, `NotesService`.

### Services

*   **`NotesService`** (`notes.service.ts`)
    *   **Purpose**: Provides business logic for `notebooks`.
    *   **Methods**:
        *   `create(createNotebookDto, user)`: Creates a new notebook and a default section for it.
        *   `findAll(user, includeDeleted)`: Retrieves all notebooks for a given user, optionally including soft-deleted ones.
        *   `findById(id, includeDeleted)`: Retrieves a notebook by its ID, optionally including soft-deleted ones.
        *   `update(id, updateNotebookDto)`: Updates an existing notebook.
        *   `remove(id)`: Soft-deletes a notebook.
        *   `restore(id)`: Restores a soft-deleted notebook.
    *   **Dependencies**: `NoteBooks` (Sequelize model), `SectionsService`.

*   **`PagesService`** (`pages.service.ts`)
    *   **Purpose**: Provides business logic for `pages`.
    *   **Methods**:
        *   `getPagesBySectionId(sectionId)`: Retrieves all pages belonging to a specific section.
        *   `getPageById(sectionId, id)`: Retrieves a specific page by its ID within a section.
        *   `createPage(sectionId, createPageDto)`: Creates a new page within a specified section.
        *   `updatePage(sectionId, id, updatePageDto)`: Updates an existing page within a section.
        *   `deletePage(sectionId, id)`: Deletes a page within a section.
    *   **Dependencies**: `Pages` (Sequelize model).

*   **`SectionsService`** (`sections.service.ts`)
    *   **Purpose**: Provides business logic for `sections`.
    *   **Methods**:
        *   `generateNewSection()`: Creates a default `CreateSectionDto` object.
        *   `getSectionsByNotebookId(notebookId)`: Retrieves all sections belonging to a specific notebook.
        *   `getSectionById(notebookId, id)`: Retrieves a specific section by its ID within a notebook.
        *   `updateSection(notebookId, id, updateSectionDto)`: Updates an existing section within a notebook.
        *   `createSection(notebookId, createSectionDto)`: Creates a new section within a specified notebook.
        *   `deleteSection(notebookId, id)`: Deletes a section within a notebook.
    *   **Dependencies**: `Sections` (Sequelize model).

### DTOs (Data Transfer Objects)

*   **`CreateNotebookDto`** (`create-notebook.dto.ts`)
    *   **Purpose**: Defines the data structure for creating a new notebook.
    *   **Fields**: `title` (string), `abstract` (string, optional), `coverColour` (string), `userId` (number, declared, not exposed in payload).

*   **`UpdateNotebookDto`** (`update-notebook.dto.ts`)
    *   **Purpose**: Defines the data structure for updating an existing notebook.
    *   **Fields**: `id` (number, optional), `title` (string), `abstract` (string, optional), `coverColour` (string).

*   **`CreatePageDto`** (`create-page.dto.ts`)
    *   **Purpose**: Defines the data structure for creating a new page.
    *   **Fields**: `heading` (string), `content` (string, optional).

*   **`UpdatePageDto`** (`update-page.dto.ts`)
    *   **Purpose**: Defines the data structure for updating an existing page.
    *   **Fields**: `heading` (string, optional), `content` (string, optional).

*   **`CreateSectionDto`** (`create-section.dto.ts`)
    *   **Purpose**: Defines the data structure for creating a new section.
    *   **Fields**: `heading` (string), `subHeading` (string, optional), `description` (string, optional), `sectionColour` (string, optional), `notebookId` (number, declared, not exposed in payload).

*   **`UpdateSectionDto`** (`update-section.dto.ts`)
    *   **Purpose**: Defines the data structure for updating an existing section.
    *   **Fields**: `id` (number, optional), `heading` (string), `subHeading` (string, optional), `description` (string, optional), `sectionColour` (string, optional).

### Models

*   **`NoteBooks`** (`notebooks.models.ts`)
    *   **Purpose**: Sequelize model for the `notebooks` table.
    *   **Fields**: `id`, `title`, `abstract`, `coverColour`, `userId` (ForeignKey to `Users`), `createdAt`, `updatedAt`, `deletedAt`.
    *   **Associations**: `BelongsTo` `Users`, `HasMany` `Sections`.
    *   **Features**: Supports soft-deletion (`paranoid: true`).

*   **`Pages`** (`pages.models.ts`)
    *   **Purpose**: Sequelize model for the `pages` table.
    *   **Fields**: `id`, `heading`, `content`, `sectionId` (ForeignKey to `Sections`), `createdAt`, `updatedAt`, `deletedAt`.
    *   **Associations**: `BelongsTo` `Sections`.
    *   **Features**: Supports soft-deletion (`paranoid: true`).

*   **`Sections`** (`sections.models.ts`)
    *   **Purpose**: Sequelize model for the `sections` table.
    *   **Fields**: `id`, `heading`, `subHeading`, `description`, `sectionColour`, `notebookId` (ForeignKey to `NoteBooks`), `createdAt`, `updatedAt`, `deletedAt`.
    *   **Associations**: `BelongsTo` `NoteBooks`, `HasMany` `Pages`.
    *   **Features**: Supports soft-deletion (`paranoid: true`).