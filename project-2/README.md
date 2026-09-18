# DecodeLabs Project 2 — Backend API Development

## Overview

This project is a simple backend API developed as part of the DecodeLabs Full Stack Development Internship.

The API demonstrates basic backend development, server-side logic, API endpoints, user input handling, responses, and basic data validation.

## Technologies Used

* Node.js
* Express.js

## API Endpoints

### GET `/api/tasks`

Retrieves all tasks.

Example response:

```json
[
  {
    "id": 1,
    "title": "Learn Backend API Development",
    "completed": false
  }
]
```

### POST `/api/tasks`

Creates a new task.

Example request:

```json
{
  "title": "Learn Backend API Development"
}
```

Example response:

```json
{
  "id": 1,
  "title": "Learn Backend API Development",
  "completed": false
}
```

### Validation

The API checks that a task has a title.

If the title is missing or empty, the API returns a `400 Bad Request` response:

```json
{
  "error": "Task title is required"
}
```

## How to Run

Install the dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The API will run at:

```text
http://localhost:3000
```

## Project Requirements Covered

* Backend API development
* GET endpoint
* POST endpoint
* User input handling
* JSON responses
* Basic data validation
