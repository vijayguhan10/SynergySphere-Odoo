const prisma = require('../Config/db');

// Message controller
exports.createMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId, content } = req.body;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!projectId || !content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ message: 'projectId and non-empty content are required' });
    }
    const pid = Number(projectId);
    if (Number.isNaN(pid)) return res.status(400).json({ message: 'Invalid projectId' });
    const project = await prisma.project.findUnique({ where: { id: pid } });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const membership = await prisma.projectMember.findFirst({ where: { projectId: pid, userId } });
    if (!membership && project.ownerId !== userId) return res.status(403).json({ message: 'Not a project member' });
    const message = await prisma.message.create({
      data: { content: content.trim(), projectId: pid, userId }
    });
    return res.status(201).json({ message: 'Message created', data: message });
  } catch (error) {
    return res.status(500).json({ message: 'Create message failed', error: error.message });
  }
};

exports.getMessagesByProject = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const pid = Number(projectId);
    if (Number.isNaN(pid)) return res.status(400).json({ message: 'Invalid projectId' });
    const project = await prisma.project.findUnique({ where: { id: pid } });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    const membership = await prisma.projectMember.findFirst({ where: { projectId: pid, userId } });
    if (!membership && project.ownerId !== userId) return res.status(403).json({ message: 'Not a project member' });
    const messages = await prisma.message.findMany({
      where: { projectId: pid },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'asc' }
    });
    return res.status(200).json({ data: messages });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const mid = Number(id);
    if (Number.isNaN(mid)) return res.status(400).json({ message: 'Invalid message id' });
    const message = await prisma.message.findUnique({
      where: { id: mid },
      include: { project: true, user: { select: { id: true, name: true, email: true } } }
    });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    const membership = await prisma.projectMember.findFirst({ where: { projectId: message.projectId, userId } });
    if (!membership && message.project.ownerId !== userId) return res.status(403).json({ message: 'Not a project member' });
    return res.status(200).json({ data: message });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch message', error: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { content } = req.body;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const mid = Number(id);
    if (Number.isNaN(mid)) return res.status(400).json({ message: 'Invalid message id' });
    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ message: 'Non-empty content is required' });
    }
    const message = await prisma.message.findUnique({ where: { id: mid } });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    if (message.userId !== userId) return res.status(403).json({ message: 'Only the author can update the message' });
    const updated = await prisma.message.update({
      where: { id: mid },
      data: { content: content.trim() }
    });
    return res.status(200).json({ message: 'Message updated', data: updated });
  } catch (error) {
    return res.status(500).json({ message: 'Update message failed', error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const mid = Number(id);
    if (Number.isNaN(mid)) return res.status(400).json({ message: 'Invalid message id' });
    const message = await prisma.message.findUnique({
      where: { id: mid },
      include: { project: true }
    });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    if (message.userId === userId) {
      await prisma.message.delete({ where: { id: mid } });
      return res.status(200).json({ message: 'Message deleted' });
    }
    const project = message.project;
    if (project.ownerId === userId) {
      await prisma.message.delete({ where: { id: mid } });
      return res.status(200).json({ message: 'Message deleted by project owner' });
    }
    const member = await prisma.projectMember.findFirst({ where: { projectId: project.id, userId } });
    if (member && member.role === 'admin') {
      await prisma.message.delete({ where: { id: mid } });
      return res.status(200).json({ message: 'Message deleted by project admin' });
    }
    return res.status(403).json({ message: 'Insufficient permissions to delete message' });
  } catch (error) {
    return res.status(500).json({ message: 'Delete message failed', error: error.message });
  }
};
