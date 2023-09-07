// server.js
const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Create a SQLite database connection
const db = new sqlite3.Database('tasks.db');

// Create the tasks table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY,
    heading TEXT,
    description TEXT,
    date TEXT,
    time TEXT,
    image TEXT,
    priority TEXT,
    addedDateTime TEXT
  )
`);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Create a new task
app.post('/api/tasks', (req, res) => {
    const task = req.body;
    db.run(
      'INSERT INTO tasks (heading, description, date, time, image, priority, addedDateTime) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        task.heading,
        task.description,
        task.date,
        task.time,
        task.image,
        task.priority,
        task.addedDateTime,
      ],
      (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Failed to create task' });
          return;
        }
        res.status(201).json({ message: 'Task created successfully' });
      }
    );
  });
  
  // Get all tasks
  app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', (err, tasks) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch tasks' });
        return;
      }
      res.json(tasks);
    });
  });
  
// Update a task by ID
app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
  
    db.run(
      'UPDATE tasks SET heading = ?, description = ?, date = ?, time = ?, image = ?, priority = ?, addedDateTime = ? WHERE id = ?',
      [
        updatedTask.heading,
        updatedTask.description,
        updatedTask.date,
        updatedTask.time,
        updatedTask.image,
        updatedTask.priority,
        updatedTask.addedDateTime,
        taskId,
      ],
      (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Failed to update task' });
          return;
        }
        res.json({ message: 'Task updated successfully' });
      }
    );
  });
  
  // Delete a task by ID
  app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
  
    db.run('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete task' });
        return;
      }
      res.json({ message: 'Task deleted successfully' });
    });
  });
  
  