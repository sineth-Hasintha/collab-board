import React, { useState, useEffect } from 'react';
import Navbar from '../Common/Navbar';
import BoardHeader from './BoardHeader';
import Column from './Column';
import TaskModal from '../Modals/TaskModal';
import api from '../../services/api';

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

const BoardView = () => {
  const [tasks, setTasks] = useState(() => {
    const cachedTasks = localStorage.getItem('collab_board_tasks_cache');
    return cachedTasks ? JSON.parse(cachedTasks) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
      localStorage.setItem('collab_board_tasks_cache', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const id = editingTask._id || editingTask.id;
        // Include __v for Optimistic Concurrency Control
        const updateData = { ...taskData, __v: editingTask.__v };
        
        const response = await api.put(`/tasks/${id}`, updateData);
        const newTasks = tasks.map((t) => ((t._id || t.id) === id ? response.data : t));
        
        setTasks(newTasks);
        localStorage.setItem('collab_board_tasks_cache', JSON.stringify(newTasks));
      } else {
        const response = await api.post('/tasks', taskData);
        const newTasks = [...tasks, response.data];
        
        setTasks(newTasks);
        localStorage.setItem('collab_board_tasks_cache', JSON.stringify(newTasks));
      }
      handleCloseModal();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Conflict: Task has been updated by another user. Please refresh and try again.');
        fetchTasks();
      } else {
        console.error('Error saving task', error);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      const newTasks = tasks.filter((t) => (t._id || t.id) !== taskId);
      setTasks(newTasks);
      localStorage.setItem('collab_board_tasks_cache', JSON.stringify(newTasks));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <div className="board-container">
        <BoardHeader onNewTask={() => handleOpenModal()} />
        <div className="board-columns">
          {columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => {
                // Handle both older M2 mock status structure and any other case
                const statusStr = (task.status || '').toLowerCase().replace(' ', '-');
                return statusStr === column.id || task.status === column.title;
              })}
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
