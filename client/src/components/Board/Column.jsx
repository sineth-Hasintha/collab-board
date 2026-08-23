import React from 'react';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, onTaskClick }) => {
  return (
    <div className="column">
      <div className="column-header">
        <span>{column.title}</span>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}
      </div>
    </div>
  );
};

export default Column;
