const prisma = require('../Config/db');

exports.createNotification = async (req, res) => {
  const { userId, content } = req.body;
  if (!userId || !content) {
    return res.status(400).json({ message: 'userId and content are required.' });
  }
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const notification = await prisma.notification.create({
      data: { userId, content }
    });
    res.status(201).json({ message: 'Notification created', data: notification });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notification.', error: error.message });
  }
};

exports.getNotificationsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ data: notifications });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications.', error: error.message });
  }
};

exports.getNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await prisma.notification.findUnique({ where: { id: Number(id) } });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }
    res.json({ data: notification });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notification.', error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await prisma.notification.findUnique({ where: { id: Number(id) } });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }
    if (notification.read) {
      return res.status(400).json({ message: 'Notification already marked as read.' });
    }
    const updated = await prisma.notification.update({
      where: { id: Number(id) },
      data: { read: true }
    });
    res.json({ message: 'Notification marked as read.', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notification as read.', error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await prisma.notification.findUnique({ where: { id: Number(id) } });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found.' });
    }
    await prisma.notification.delete({ where: { id: Number(id) } });
    res.json({ message: 'Notification deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification.', error: error.message });
  }
};
