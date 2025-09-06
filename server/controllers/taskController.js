const prisma = require('../Config/db');

// Task controller
exports.createTask = async (req, res) => {
  const { title, description, status, dueDate, projectId, assigneeId } = req.body;
  if (!title || !projectId) {
    return res.status(400).json({ message: 'Title and projectId are required.' });
  }
  try {
    const project = await prisma.project.findUnique({ where: { id: Number(projectId) } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    let assignee = null;
    if (assigneeId) {
      assignee = await prisma.user.findUnique({ where: { id: Number(assigneeId) } });
      if (!assignee) {
        return res.status(404).json({ message: 'Assignee not found.' });
      }
    }
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'TODO',
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId: Number(projectId),
        assigneeId: assignee ? assignee.id : null
      }
    });
    res.status(201).json({ message: 'Task created', data: task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task.', error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: { project: true, assignee: true }
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    res.json({ data: task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch task.', error: error.message });
  }
};

exports.getTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await prisma.project.findUnique({ where: { id: Number(projectId) } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    const tasks = await prisma.task.findMany({
      where: { projectId: Number(projectId) },
      orderBy: { createdAt: 'desc' },
      include: { assignee: true }
    });
    res.json({ data: tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks.', error: error.message });
  }
};

exports.getTasksByAssignee = async (req, res) => {
  const { assigneeId } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(assigneeId) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const tasks = await prisma.task.findMany({
      where: { assigneeId: Number(assigneeId) },
      orderBy: { createdAt: 'desc' },
      include: { project: true }
    });
    res.json({ data: tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks.', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate, assigneeId } = req.body;
  try {
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    let assignee = null;
    if (assigneeId) {
      assignee = await prisma.user.findUnique({ where: { id: Number(assigneeId) } });
      if (!assignee) {
        return res.status(404).json({ message: 'Assignee not found.' });
      }
    }
    const updated = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title: title !== undefined ? title : task.title,
        description: description !== undefined ? description : task.description,
        status: status !== undefined ? status : task.status,
        dueDate: dueDate !== undefined ? new Date(dueDate) : task.dueDate,
        assigneeId: assignee ? assignee.id : null
      }
    });
    res.json({ message: 'Task updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task.', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    await prisma.task.delete({ where: { id: Number(id) } });
    res.json({ message: 'Task deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task.', error: error.message });
  }
};
