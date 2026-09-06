const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const status = req.query.status;
    let query = { user: req.user.id };
    if (status) {
      query.status = status;
    }
    const tasks = await Task.find(query);
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

    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      assignee,
      dueDate,
      user: req.user.id // Fix: Automatically attach req.user.id as the task's owner
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { __v, ...updateData } = req.body;

    if (__v === undefined) {
      res.status(400);
      throw new Error('Version key (__v) is required for update');
    }

    // Fix: First, find the task to check for existence and verify ownership
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Fix: Authorization check to prevent modifications by unauthorized users
    if (task.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error('User not authorized to update this task');
    }

    // Try to update the task matching both id and the provided version
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, __v: __v },
      { $set: updateData, $inc: { __v: 1 } },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      // Since the task is already proven to exist, a null updatedTask means an OCC version conflict
      res.status(409);
      throw new Error('Conflict: Task has been updated by another user. Please refresh and try again.');
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    // Fix: First, find the task to check for existence and verify ownership
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Fix: Authorization check to prevent deletions by unauthorized users
    if (task.user.toString() !== req.user.id) {
      res.status(403);
      throw new Error('User not authorized to delete this task');
    }

    await Task.findByIdAndDelete(taskId);

    res.json({ message: 'Task removed', id: taskId });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
