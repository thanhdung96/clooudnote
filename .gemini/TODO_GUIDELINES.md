# Guideline for Writing TODO Checklists

This document provides a comprehensive guide on how to write a TODO checklist in YAML format for this project. Following these guidelines will ensure that tasks are clearly defined, easy to understand, and actionable for all team members.

## 1. Purpose

The primary purpose of these TODO files is to:

- **Standardize Task Definition**: Create a consistent and structured way to define tasks.
- **Provide Clear Context**: Ensure that anyone picking up a task has all the necessary information to start working on it.
- **Outline Expected Outcomes**: Clearly define what the successful completion of a task looks like.
- **Break Down Complex Tasks**: Decompose larger features or bug fixes into smaller, manageable sub-tasks.

## 2. File Location and Naming

- All TODO checklist files should be placed in the `todo/` directory at the root of the project.
- File names should be descriptive and reflect the feature or module they cover (e.g., `user-authentication.yml`, `refactor-database-module.yml`).

## 3. YAML Structure

Each TODO file is a YAML document containing a list of tasks. Each task is an object with the following keys. When a feature involves multiple files, create a separate task object for each file.

```yaml
# Example: Implementing CRUD for Pages

# Task 1: Create Data Transfer Objects (DTOs)
- file_path: "src/notes/dto/"
  context: "To handle data validation for creating and updating pages, we need specific DTOs."
  desired_output: "Two new files, `create-page.dto.ts` and `update-page.dto.ts`, with all necessary validation decorators."
  instructions:
    - "Use `class-validator` decorators for all properties."
    - "Refer to existing DTOs like `create-notebook.dto.ts` for consistency."
  tasks:
    - "Create `create-page.dto.ts` with properties for `title` and `content`."
    - "Create `update-page.dto.ts` with optional properties for `title` and `content`."

# Task 2: Implement the Controller logic
- file_path: "src/notes/controllers/pages.controller.ts"
  context: "The application currently lacks CRUD (Create, Read, Update, Delete) functionality for Pages. This controller will expose the necessary API endpoints."
  desired_output: "A fully functional CRUD API for Pages, complete with request validation, error handling, and integration with the authentication and authorization system."
  instructions:
    - "Familiarize yourself with the existing controller structure in `src/notes/controllers/`."
    - "Ensure all new endpoints are protected using the `AuthGuard`."
    - "Inject the `PagesService` to handle the business logic."
    - "Write unit tests for the new controller methods."
  tasks:
    - "Implement the `create` method to handle POST requests."
    - "Implement the `findAll` method to retrieve all pages for the authenticated user."
    - "Implement the `findOne` method to retrieve a single page by its ID."
    - "Implement the `update` method to handle PATCH requests."
    - "Implement the `remove` method to handle DELETE requests."
```

### 3.1. `file_path` (String)

- **Purpose**: Specifies the primary file or directory that needs to be created or modified for the task.
- **Format**: A string representing the relative path from the project root.
- **Example**: `src/notes/controllers/pages.controller.ts`

### 3.2. `context` (String)

- **Purpose**: Provides the background and reasoning for the task. It should answer the "why" behind the task.
- **Format**: A clear and concise paragraph explaining the current situation and why the change is needed.
- **Example**: "The application currently lacks CRUD functionality for Pages..."

### 3.3. `desired_output` (String)

- **Purpose**: Describes the expected outcome when the task is completed. It defines the "done" state.
- **Format**: A sentence or short paragraph detailing what a successful implementation looks like.
- **Example**: "A fully functional CRUD API for Pages, complete with validation and error handling."

### 3.4. `instructions` (List of Strings)

- **Purpose**: Offers guidance and important considerations for the person implementing the task.
- **Format**: A list of short, actionable instructions.
- **Example**:
  ```yaml
  instructions:
    - "Familiarize yourself with the existing controller structure..."
    - "Pay close attention to validation using DTOs."
  ```

### 3.5. `tasks` (List of Strings)

- **Purpose**: Breaks down the main task into a checklist of smaller, concrete sub-tasks.
- **Format**: A list of specific, actionable steps.
- **Example**:
  ```yaml
  tasks:
    - "Implement the `create` method in `PagesController`."
    - "Implement the `findAll` method..."
  ```

## 4. Best Practices

- **Be Specific**: Avoid vague descriptions. The more detailed the information, the better.
- **Focus on a Single Feature**: Each YAML file should focus on a single feature or a closely related set of tasks.
- **One Task Object per File Path**: When a feature involves changes to multiple files, create a separate task object (with `file_path`, `context`, etc.) for each file. This ensures that each task is focused and easy to track.
- **Review Existing TODOs**: Before writing a new one, look at existing files in the `todo/` directory to maintain consistency.
- **Keep it Updated**: If the requirements change, update the corresponding TODO file.
