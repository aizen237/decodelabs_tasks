# DecodeLabs Project 3 — Database Integration

## Overview

This project was developed as part of the DecodeLabs Full Stack Development Internship.

The project demonstrates database integration using SQLite, including database schema design, CRUD operations, and proper data handling through a backend API.

## Technologies Used

* Node.js
* Express.js
* SQLite

## Database Schema

The project uses a `tasks` table with the following fields:

| Field     | Type    | Description                          |
| --------- | ------- | ------------------------------------ |
| id        | INTEGER | Primary key with automatic increment |
| title     | TEXT    | Task title                           |
| completed | BOOLEAN | Task completion status               |

## API Endpoints

### GET `/api/tasks`

Retrieves all tasks from the database.

### GET `/api/tasks/:id`

Retrieves a specific task by its ID.

### POST `/api/tasks`

Creates a new task.

Example request:

```json
{
  "title": "Learn Database Integration"
}
```

### PUT `/api/tasks/:id`

Updates an existing task.

Example request:

```json
{
  "title": "Learn SQLite Database Integration",
  "completed": true
}
```

### DELETE `/api/tasks/:id`

Deletes a task from the database.

## CRUD Operations

The API demonstrates:

* **Create** — Add a new task to the database
* **Read** — Retrieve tasks from the database
* **Update** — Modify an existing task
* **Delete** — Remove a task from the database

## Data Validation

The API validates task titles and returns a `400 Bad Request` response when a title is missing or empty.

## Database Integration

SQLite is used to persist task data in a local database.

The database and `tasks` table are automatically created when the server starts if they do not already exist.

## How to Run

Install the dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The API runs at:

```text
http://localhost:3001
```

## Project Requirements Covered

* Database schema design
* Database integration
* Create operation
* Read operation
* Update operation
* Delete operation
* Proper data handling
* Backend API integration
