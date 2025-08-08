# Gemini CLI for NestJS Development

This document outlines how to effectively use the Gemini CLI for development tasks within a NestJS TypeScript project.

## 1. Project Context & Setup

- **Project Type**: NestJS Monorepo/Application (TypeScript)
- **Primary Language**: TypeScript
- **Package Manager**: npm
- **Linting**: ESLint (with Prettier)
- **Testing Framework**: Jest (for unit/integration tests), Supertest (for E2E tests)
- **Framework**: [NestJS](https://nestjs.com/) (Node.js/TypeScript) backend project, organized by feature modules under `src/`.
- **Major Modules**: `notes`, `users`, `tags`, `securities`, and `healthcheck`, each with their own subfolders for controllers, services, DTOs, and models.
- **Database**: Uses Sequelize ORM (see `sequelize/`). Migrations are in `sequelize/migrations/`, config in `sequelize/config/`.
- **Entry Point**: `src/main.ts` bootstraps the app. `src/app.module.ts` is the root module.

## 2. Coding Conventions

### 2.1. Project Structure & Modularity

- Each feature (e.g., notes, users, tags) is organized as a separate module with its own folders for controllers, services, DTOs, and models.
- Shared resources (configs, constants, decorators, guards) are centralized under `src/common/` or relevant shared directories.

### 2.2. Naming Conventions

- **Classes:** PascalCase (e.g., `UserService`, `NotesController`)
- **Functions/Variables:** camelCase (e.g., `createUser`, `noteTitle`)
- **Files:** kebab-case (e.g., `users.service.ts`, `notes.controller.ts`)
- **DTOs:** Named with `Dto` suffix (e.g., `CreateUserDto`)

### 2.3. Code Style

- Strict adherence to ESLint and Prettier rules as defined in `.eslintrc.js` and `.prettierrc.js`.
- Consistent use of TypeScript types and interfaces for all data structures and function signatures.
- Prefer explicit typing over implicit typing.

### 2.4. Separation of Concerns

- **Controllers:** Handle HTTP requests and responses, delegate business logic to services.
- **Services:** Contain business logic and interact with models/entities.
- **DTOs:** Used for request/response validation and data transfer.
- **Models/Entities:** Define database schemas (Sequelize).

### 2.5. Validation & Error Handling

- All input validation is handled via DTOs using class-validator decorators.
- Custom exceptions and NestJS’s built-in exception filters are used for robust error handling.

### 2.6. Testing

- Unit tests for services, controllers, and modules using Jest.
- End-to-end (E2E) tests for API endpoints using Supertest.
- Dependencies are mocked in tests to isolate units of code.

### 2.7. Documentation

- Use of JSDoc/TSDoc comments for public classes and methods.
- API endpoints are documented with clear descriptions of request/response formats.

### 2.8. Configuration & Constants

- Application and database configuration files are centralized in `src/common/configs/`.
- Shared constants are placed in `src/common/constants/`.

### 2.9. Security & Best Practices

- Use of custom decorators, guards, interceptors, pipes, and filters for security, validation, and cross-cutting concerns.
- Sensitive logic (e.g., authentication) is isolated in dedicated modules.

### 2.10. Database & Migrations

- Sequelize ORM is used for database interaction.
- Migrations are organized in `sequelize/migrations/` and managed via npm scripts.

---

## 3. Common Development Tasks with Gemini

Gemini can assist with the following NestJS-specific tasks:

### a. Code Generation & Scaffolding

- **Generate Module**: `nest g module <module-name>`
- **Generate Service**: `nest g service <service-name>`
- **Generate Controller**: `nest g controller <controller-name>`
- **Generate Resource (CRUD)**: `nest g resource <resource-name>`
- **Generate Guard/Interceptor/Pipe/Filter**: `nest g <type> <name>`

*Example Prompt*: "Generate a new NestJS module named `users` with a `users` service and `users` controller. Ensure it follows best practices for folder structure."

### b. Refactoring & Code Improvement

- **Refactor existing code**: Improve readability, performance, or adherence to NestJS patterns.
- **Apply design patterns**: Help implement patterns like Repository, Strategy, etc.
- **Convert callbacks to async/await**: Modernize asynchronous code.

*Example Prompt*: "Refactor the `AuthService` in `src/auth/auth.service.ts` to use a more robust error handling strategy with custom exceptions."

### c. Testing

- **Write Unit Tests**: Generate tests for services, controllers, and modules.
- **Write E2E Tests**: Create end-to-end tests for API endpoints.
- **Mock Dependencies**: Assist in mocking external services or databases for tests.

*Example Prompt*: "Write unit tests for the `create` method in `src/users/users.service.ts`. Focus on testing valid input and error cases."

### d. Debugging & Troubleshooting

- **Analyze error logs**: Help understand and resolve runtime errors.
- **Identify performance bottlenecks**: Suggest areas for optimization.
- **Explain complex code sections**: Break down intricate logic.

*Example Prompt*: "I'm getting a `Circular dependency detected` error when starting the NestJS application. Can you help me identify the source of the circular dependency in my `src` folder?"

### e. Documentation

- **Generate JSDoc/TSDoc**: Add documentation to functions, classes, and interfaces.
- **Explain API Endpoints**: Describe the purpose, request/response formats of API routes.

*Example Prompt*: "Add TSDoc comments to all public methods in `src/products/products.controller.ts`."

---

## 4. Useful NestJS CLI & npm Commands

- `npm install <dependency_name>` : Install dependencies
- `npm run start:dev`: Start the application in development mode (with watch)
- `npm run build`: Build the application for production
- `npm run test`: Run all tests
- `npm run test:unit`: Run unit tests
- `npm run test:e2e`: Run end-to-end tests
- `npm run lint`: Run ESLint
- `npm run format`: Run Prettier
- `npm run migrate` : Run all migrations
- `npm run migrate:create <migration_name>` : Create a new migration file with a specific name
- `npm run migrate:down <migration_name>` : Roll back every migration until the specific migration name

---

## 5. Gemini Interaction Tips

- **Be Specific**: Provide as much context as possible (file paths, error messages, desired outcome).
- **Iterate**: If the first attempt isn't perfect, provide feedback for refinement.
- **Verify**: Always review generated code and run tests/linters before committing.

## TODO Guidelines
When analysing requirements, please read thoroughly the guidelines on how to create a todo list: @./TODO_GUIDELINES.md
