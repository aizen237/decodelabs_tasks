# Pipeline — Job Application Tracker

A full-stack job application tracker built for DecodeLabs Internship Project 4: Frontend & Backend Integration. Tracks applications through a real pipeline (Applied → Interview → Offer/Rejected), backed by a live MySQL database via a REST API.

## Why this project

Projects 1–3 covered frontend, databases, and APIs in isolation. This project connects them: a vanilla JS frontend makes real HTTP requests to an Express/MySQL backend, handles loading and error states, and updates the UI dynamically based on live data — no page reloads, no hardcoded content.

## Tech Stack

**Backend:** Node.js, Express, MySQL (mysql2), CORS, dotenv
**Frontend:** Vanilla HTML, CSS, JavaScript (no framework) — fetch API with async/await

## Features

- Full CRUD: create, read, update (status), and delete applications
- Live pipeline visualization — a funnel bar showing real counts per status, animated from actual API data
- Async requests with proper error handling (`response.ok` checks, try/catch, user-facing error messages)
- Loading and empty states
- Fully responsive layout

## Project Structure

project-4/
├── backend/
│ ├── config/db.js
│ ├── controllers/applicationController.js
│ ├── routes/applicationRoutes.js
│ ├── server.js
│ └── .env (not committed — see setup below)
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
└── README.md


## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications` | Get all applications |
| POST | `/api/applications` | Create a new application |
| PATCH | `/api/applications/:id` | Update an application's status |
| DELETE | `/api/applications/:id` | Delete an application |

## Setup & Running Locally

**1. Database**

```sql
CREATE DATABASE job_tracker;
USE job_tracker;

CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  status ENUM('Applied', 'Interview', 'Offer', 'Rejected') DEFAULT 'Applied',
  date_applied DATE NOT NULL,
  link VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**2. Backend**

cd backend
npm install


Create a `.env` file in `backend/`:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=job_tracker
PORT=5000


Run the server:

node server.js


**3. Frontend**

Open `frontend/index.html` with a local server (e.g. VS Code's Live Server extension) so `fetch()` requests work correctly. Do not open it directly as a file.

The backend must be running on `localhost:5000` for the frontend to load data.