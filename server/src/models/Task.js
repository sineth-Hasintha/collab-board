const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    // Fix: Added user reference to enforce task ownership and privacy
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'],
      default: 'To Do',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    assignee: {
      type: String,
      default: '',
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true // Enables Mongoose OCC based on the __v key
  }
);

module.exports = mongoose.model('Task', taskSchema);
