// src/App.js
import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddBoxIcon from '@mui/icons-material/AddBox';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    heading: '',
    description: '',
    date: '',
    time: '',
    image: '',
    priority: 'low',
    addedDateTime: new Date().toISOString(),
  });

  const handleAddTask = () => {
    if (newTask.heading && newTask.date && newTask.time) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({
        heading: '',
        description: '',
        date: '',
        time: '',
        image: '',
        priority: 'low',
        addedDateTime: new Date().toISOString(),
      });
    }
  };

  const handleEditTask = (id, editedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...editedTask } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="task-form">
        <h2>Add a Task</h2>
        <input
          type="text"
          placeholder="Heading"
          value={newTask.heading}
          onChange={(e) => setNewTask({ ...newTask, heading: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <input
          type="time"
          value={newTask.time}
          onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newTask.image}
          onChange={(e) => setNewTask({ ...newTask, image: e.target.value })}
        />
        <select
         className="centered-select" 
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleAddTask}>
        <div style={{ display: 'flex', alignItems: 'center',paddingLeft:'500px' }}>
  <AddBoxIcon />
  <span style={{paddingLeft:'2px'}}>Add Task</span>
</div>


</button>


      </div>
      <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
    </div>
  );
}

export default App;
