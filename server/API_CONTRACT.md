# SyncBoard REST API Contract (Milestone 2)

**Base URL**: `http://localhost:5000/api`

## Authentication

The API uses JSON Web Tokens (JWT) for authentication. For protected routes, include the following header:
`Authorization: Bearer <your_jwt_token>`

---

## 1. Authentication Endpoints

### 1.1 Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Creates a new user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Responses**:
  - `201 Created`
    ```json
    {
      "id": "user-12345",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "eyJhbGciOiJIUzI1..."
    }
    ```
  - `400 Bad Request` (Missing fields or user exists)

### 1.2 Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Responses**:
  - `200 OK`
    ```json
    {
      "id": "user-12345",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "eyJhbGciOiJIUzI1..."
    }
    ```
  - `401 Unauthorized` (Invalid credentials)

### 1.3 Get Current User (Protected)
- **URL**: `/auth/me`
- **Method**: `GET`
- **Description**: Retrieves the profile of the authenticated user.
- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`
    ```json
    {
      "id": "user-12345",
      "name": "John Doe",
      "email": "john@example.com"
    }
    ```
  - `401 Unauthorized` (Missing or invalid token)

---

## 2. Task Endpoints

### 2.1 Get All Tasks (Protected)
- **URL**: `/tasks`
- **Method**: `GET`
- **Description**: Fetches all tasks. Supports optional `status` query parameter.
- **Query Parameters**: `?status=todo|in-progress|done`
- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`
    ```json
    [
      {
        "id": "task-1",
        "title": "Research Competitors",
        "description": "Analyze top 3 competitors in the market.",
        "status": "todo",
        "priority": "High",
        "assignee": "Alice",
        "dueDate": "2023-10-15"
      }
    ]
    ```

### 2.2 Create Task (Protected)
- **URL**: `/tasks`
- **Method**: `POST`
- **Description**: Creates a new task.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task details here",
    "status": "todo",
    "priority": "Medium",
    "assignee": "Bob",
    "dueDate": "2023-11-01"
  }
  ```
- **Responses**:
  - `201 Created`
    ```json
    {
      "id": "task-1698300000000",
      "title": "New Task",
      "description": "Task details here",
      "status": "todo",
      "priority": "Medium",
      "assignee": "Bob",
      "dueDate": "2023-11-01"
    }
    ```
  - `400 Bad Request` (Missing title)

### 2.3 Update Task (Protected)
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Description**: Updates an existing task by ID.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: (Any fields to update)
  ```json
  {
    "status": "in-progress"
  }
  ```
- **Responses**:
  - `200 OK`
    ```json
    {
      "id": "task-1698300000000",
      "title": "New Task",
      "description": "Task details here",
      "status": "in-progress",
      "priority": "Medium",
      "assignee": "Bob",
      "dueDate": "2023-11-01"
    }
    ```
  - `404 Not Found` (Task does not exist)

### 2.4 Delete Task (Protected)
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Description**: Deletes a task by ID.
- **Headers**: `Authorization: Bearer <token>`
- **Responses**:
  - `200 OK`
    ```json
    {
      "message": "Task removed",
      "id": "task-1698300000000"
    }
    ```
  - `404 Not Found` (Task does not exist)
