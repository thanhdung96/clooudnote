# Gemini CLI for NestJS Development

This document outlines how to effectively use the Gemini CLI for development tasks within a NestJS TypeScript project.

## 1. Project Context & Setup

- **Project Type**: NestJS Monorepo/Application (TypeScript)
- **Primary Language**: TypeScript
- **Package Manager**: npm/yarn/pnpm (specify which one you use, e.g., `npm`)
- **Linting**: ESLint (with Prettier)
- **Testing Framework**: Jest (for unit/integration tests), Supertest (for E2E tests)

## 2. Common Development Tasks with Gemini

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

## 3. Project-Specific Configurations/Preferences

- **Code Style**: Adhere to ESLint and Prettier rules defined in `.eslintrc.js` and `.prettierrc.js`.
- **Naming Conventions**: Prefer `PascalCase` for classes, `camelCase` for functions/variables, `kebab-case` for file names.
- **Database**: PostgreSQL (with TypeORM/Prisma - specify which one you use, e.g., `TypeORM`)

## 4. Useful NestJS CLI & npm Commands

- `npm install` / `yarn install` / `pnpm install`: Install dependencies
- `npm run start:dev`: Start the application in development mode (with watch)
- `npm run build`: Build the application for production
- `npm run test`: Run all tests
- `npm run test:unit`: Run unit tests
- `npm run test:e2e`: Run end-to-end tests
- `npm run lint`: Run ESLint
- `npm run format`: Run Prettier

## 5. Gemini Interaction Tips

- **Be Specific**: Provide as much context as possible (file paths, error messages, desired outcome).
- **Iterate**: If the first attempt isn't perfect, provide feedback for refinement.
- **Verify**: Always review generated code and run tests/linters before committing.