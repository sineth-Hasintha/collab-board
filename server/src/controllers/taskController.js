let tasks = [
  {
    id: 'task-1',
    title: 'Research Competitors',
    description: 'Analyze top 3 competitors in the market.',
    status: 'todo',
    priority: 'High',
    assignee: 'Alice',
    dueDate: '2023-10-15',
  },
  {
    id: 'task-2',
    title: 'Design DB Schema',
    description: 'Create initial MongoDB schema for users and tasks.',
    status: 'in-progress',
    priority: 'High',
    assignee: 'Bob',
    dueDate: '2023-10-20',
  },
  {
    id: 'task-3',
    title: 'Setup CI/CD',
    description: 'Configure GitHub Actions for automated deployment.',
    status: 'done',
    priority: 'Medium',
    assignee: 'Charlie',
    dueDate: '2023-10-10',
  }
];

const getTasks = async (req, res, next) => {
  try {
    const status = req.query.status;
    if (status) {
      const filteredTasks = tasks.filter(t => t.status === status);
      return res.json(filteredTasks);
    }
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, assignee, dueDate } = req.body;
    
    if (!title) {
      res.status(400);
      throw new Error('Task title is required');
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title,
      description: description || '',
      status: status || 'todo',
      priority: priority || 'Medium',
      assignee: assignee || '',
      dueDate: dueDate || ''
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      res.status(404);
      throw new Error('Task not found');
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...req.body,
      id: taskId // Ensure ID cannot be changed
    };

    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      res.status(404);
      throw new Error('Task not found');
    }

    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ message: 'Task removed', id: taskId });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
