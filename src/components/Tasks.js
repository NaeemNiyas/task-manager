// src/components/Task.js
import React, { useState } from 'react';
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Task({ task, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTask({ ...task });
  };

  return (
    <div className="task">
      <h3>
        {isEditing ? (
          <input
            type="text"
            value={editedTask.heading}
            onChange={(e) => setEditedTask({ ...editedTask, heading: e.target.value })}
          />
        ) : (
          task.heading
        )}
      </h3>
      <p>
        {isEditing ? (
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
        ) : (
          task.description
        )}
      </p>
      <p>Date: {task.date}</p>
      <p>Time: {task.time}</p>
      {task.image && <img src={task.image} alt="Task" />}
      {isEditing ? (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick} >
  <EditNoteSharpIcon /> 
</button>
      )}
      <button onClick={() => onDelete(task.id)} ><DeleteForeverIcon /> </button>
    </div>
  );
}

export default Task;
