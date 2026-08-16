import React from 'react';

const TaskCard = ({ task, onClick }) => {
  return (
    <div className="task-card glass-panel" onClick={() => onClick(task)}>
      <div className="task-header">
        <span className={`task-priority priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>
      <h4 className="task-title">{task.title}</h4>
      <div className="task-footer">
        <span className="task-assignee">
          {task.assignedTo || 'Unassigned'}
        </span>
        {task.dueDate && (
          <span className="task-due-date">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
