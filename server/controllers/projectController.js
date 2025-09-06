const prisma = require('../Config/db');

// Project controller
exports.createProject = async (req, res) => {
  const { name, description, ownerId } = req.body;
  if (!name || !ownerId) {
    return res.status(400).json({ message: 'Project name and ownerId are required.' });
  }
  try {
    const owner = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found.' });
    }
    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId,
        members: {
          create: [{ userId: ownerId, role: 'admin' }]
        }
      }
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Project creation failed.', error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        owner: true,
        members: { include: { user: true } },
        tasks: true,
        messages: true
      }
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project.', error: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        owner: true,
        members: { include: { user: true } },
        tasks: true,
        messages: true
      }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects.', error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const project = await prisma.project.findUnique({ where: { id: Number(id) } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    const updated = await prisma.project.update({
      where: { id: Number(id) },
      data: { name, description }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project.', error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({ where: { id: Number(id) } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    await prisma.projectMember.deleteMany({ where: { projectId: Number(id) } });
    await prisma.task.deleteMany({ where: { projectId: Number(id) } });
    await prisma.message.deleteMany({ where: { projectId: Number(id) } });
    await prisma.project.delete({ where: { id: Number(id) } });
    res.json({ message: 'Project deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project.', error: error.message });
  }
};

exports.addMember = async (req, res) => {
  const { projectId, userId, role } = req.body;
  if (!projectId || !userId || !role) {
    return res.status(400).json({ message: 'projectId, userId, and role are required.' });
  }
  try {
    const project = await prisma.project.findUnique({ where: { id: Number(projectId) } });
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const existing = await prisma.projectMember.findFirst({
      where: { projectId: Number(projectId), userId }
    });
    if (existing) {
      return res.status(400).json({ message: 'User is already a member of this project.' });
    }
    const member = await prisma.projectMember.create({
      data: { projectId: Number(projectId), userId, role }
    });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add member.', error: error.message });
  }
};

exports.removeMember = async (req, res) => {
  const { projectId, userId } = req.body;
  if (!projectId || !userId) {
    return res.status(400).json({ message: 'projectId and userId are required.' });
  }
  try {
    const member = await prisma.projectMember.findFirst({
      where: { projectId: Number(projectId), userId }
    });
    if (!member) {
      return res.status(404).json({ message: 'Member not found in this project.' });
    }
    await prisma.projectMember.delete({ where: { id: member.id } });
    res.json({ message: 'Member removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove member.', error: error.message });
  }
};
