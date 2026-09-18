const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

// GET - retrieve all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST - create a new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  // Basic validation
  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Task title is required"
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Project 2 Backend API is running"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});