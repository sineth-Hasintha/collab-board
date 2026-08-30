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
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
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
        const response = await api.put(`/tasks/${editingTask.id}`, taskData);
        setTasks(tasks.map((t) => (t.id === editingTask.id ? response.data : t)));
      } else {
        const response = await api.post('/tasks', taskData);
        setTasks([...tasks, response.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving task', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t.id !== taskId));
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
