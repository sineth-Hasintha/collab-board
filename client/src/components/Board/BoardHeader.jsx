import React from 'react';

const BoardHeader = ({ onNewTask }) => {
  return (
    <div className="board-header">
      <div className="board-title">
        <h2>Project Alpha Phase 1</h2>
        <p>Manage all tasks related to the initial launch phase.</p>
      </div>
      <button className="btn btn-primary" onClick={onNewTask}>
        + New Task
      </button>
    </div>
  );
};

export default BoardHeader;
