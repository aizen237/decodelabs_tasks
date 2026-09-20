const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3001;

app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create tasks table
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  )
`, (err) => {
  if (err) {
    console.error("Table creation failed:", err.message);
  } else {
    console.log("Tasks table ready.");
  }
});

// GET - retrieve all tasks
app.get("/api/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to retrieve tasks"
      });
    }

    res.json(rows);
  });
});

// GET - retrieve one task
app.get("/api/tasks/:id", (req, res) => {
  db.get(
    "SELECT * FROM tasks WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to retrieve task"
        });
      }

      if (!row) {
        return res.status(404).json({
          error: "Task not found"
        });
      }

      res.json(row);
    }
  );
});

// POST - create a new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Task title is required"
    });
  }

  db.run(
    "INSERT INTO tasks (title) VALUES (?)",
    [title.trim()],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to create task"
        });
      }

      res.status(201).json({
        id: this.lastID,
        title: title.trim(),
        completed: false
      });
    }
  );
});

// PUT - update a task
app.put("/api/tasks/:id", (req, res) => {
  const { title, completed } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      error: "Task title is required"
    });
  }

  db.run(
    "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
    [title.trim(), completed ? 1 : 0, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to update task"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Task not found"
        });
      }

      res.json({
        id: Number(req.params.id),
        title: title.trim(),
        completed: Boolean(completed)
      });
    }
  );
});

// DELETE - delete a task
app.delete("/api/tasks/:id", (req, res) => {
  db.run(
    "DELETE FROM tasks WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Failed to delete task"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Task not found"
        });
      }

      res.json({
        message: "Task deleted successfully"
      });
    }
  );
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});