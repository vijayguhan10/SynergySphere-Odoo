const prisma = require('../Config/db');

// User controller
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true }
    });
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users.', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, email: true, createdAt: true }
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user.', error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: name !== undefined ? name : user.name,
        email: email !== undefined ? email : user.email
      }
    });
    res.json({ message: 'User updated.', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user.', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user.', error: error.message });
  }
};

exports.getUserProjects = async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: Number(id) },
      include: { members: true, tasks: true }
    });
    res.json({ data: projects });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user projects.', error: error.message });
  }
};

exports.getUserTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: { assigneeId: Number(id) },
      include: { project: true }
    });
    res.json({ data: tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user tasks.', error: error.message });
  }
};

exports.getUserMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const messages = await prisma.message.findMany({
      where: { userId: Number(id) },
      include: { project: true }
    });
    res.json({ data: messages });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user messages.', error: error.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  const { id } = req.params;
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: Number(id) },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ data: notifications });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user notifications.', error: error.message });
  }
};
