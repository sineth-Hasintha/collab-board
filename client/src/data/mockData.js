export const mockData = {
  columns: [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ],
  tasks: [
    {
      id: 'task-101',
      title: 'Design Database Schema',
      description: 'Establish normalized relations and Mongoose schemas',
      status: 'in-progress',
      priority: 'High',
      assignedTo: 'Sineth Hasintha',
      dueDate: '2026-08-23'
    },
    {
      id: 'task-102',
      title: 'Scaffold Frontend',
      description: 'Create React app and basic components',
      status: 'done',
      priority: 'Urgent',
      assignedTo: 'Sineth Hasintha',
      dueDate: '2026-08-02'
    },
    {
      id: 'task-103',
      title: 'Implement Authentication',
      description: 'JWT and bcrypt integration on backend',
      status: 'todo',
      priority: 'Medium',
      assignedTo: 'Sineth Hasintha',
      dueDate: '2026-08-16'
    }
  ]
};
