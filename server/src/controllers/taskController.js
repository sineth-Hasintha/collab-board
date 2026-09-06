const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const status = req.query.status;
    let tasks;
    if (status) {
      tasks = await Task.find({ status });
    } else {
      tasks = await Task.find({});
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

    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      assignee,
      dueDate
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

    // Try to update the task matching both id and the provided version
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, __v: __v },
      { $set: updateData, $inc: { __v: 1 } },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      // Check if task exists to differentiate between 404 and 409
      const existingTask = await Task.findById(taskId);
      if (!existingTask) {
        res.status(404);
        throw new Error('Task not found');
      } else {
        res.status(409);
        throw new Error('Conflict: Task has been updated by another user. Please refresh and try again.');
      }
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.json({ message: 'Task removed', id: taskId });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
