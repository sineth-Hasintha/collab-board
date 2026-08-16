import React, { useState } from 'react';
import Navbar from '../Common/Navbar';
import BoardHeader from './BoardHeader';
import Column from './Column';
import TaskModal from '../Modals/TaskModal';
import { mockData } from '../../data/mockData';

const BoardView = () => {
  const [tasks, setTasks] = useState(mockData.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map((t) => (t.id === editingTask.id ? { ...taskData, id: t.id } : t)));
    } else {
      // Create new task
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`
      };
      setTasks([...tasks, newTask]);
    }
    handleCloseModal();
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    handleCloseModal();
  };

  return (
    <div className="app-layout">
      <Navbar />
      <div className="board-container">
        <BoardHeader onNewTask={() => handleOpenModal()} />
        <div className="board-columns">
          {mockData.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onTaskClick={(task) => handleOpenModal(task)}
            />
          ))}
        </div>
      </div>
      
      <TaskModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default BoardView;
