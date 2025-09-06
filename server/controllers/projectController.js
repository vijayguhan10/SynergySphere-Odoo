const prisma = require('../Config/db');
const nodemailer = require("nodemailer");

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

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vijayguhan10@gmail.com", // replace with your email
        pass: "bllt popo ekpi kjvd",   // use app password for Gmail
      },
    });

    await transporter.sendMail({
      from: '"SynergySphere" <vijayguhan10@gmail.com>',
      to: "vijayguhan10@gmail.com",
      subject: "🎉 Project Created Successfully | SynergySphere - Odoo",
      text: `Project "${project.name}" was created successfully!`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 32px;">
          <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); overflow: hidden;">
            <div style="background: linear-gradient(90deg,#4f8cff,#6dd5ed); padding: 24px 0; text-align: center;">
              <img src="https://cdn-icons-png.flaticon.com/512/5957/5957425.png" alt="SynergySphere Logo" style="height: 48px; margin-bottom: 12px;" />
              <h2 style="color: #fff; margin: 0; font-size: 1.6rem;">SynergySphere - Odoo</h2>
              <p style="color: #e0f7fa; margin: 0; font-size: 1rem;">Project Management Platform</p>
            </div>
            <div style="padding: 32px 24px;">
              <h3 style="color: #2d3748; margin-bottom: 16px;">🎉 Project Created Successfully!</h3>
              <p style="color: #4a5568; font-size: 1rem;">
                Your new project <b style="color: #2563eb;">"${project.name}"</b> has been created.<br/>
                <span style="color: #6b7280;">${project.description || ""}</span>
              </p>
              <div style="margin: 24px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Project Owner:</td>
                    <td style="padding: 8px 0; color: #2563eb; font-weight: 500;">${owner.name} (${owner.email})</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280;">Created At:</td>
                    <td style="padding: 8px 0; color: #2563eb;">${new Date().toLocaleString()}</td>
                  </tr>
                </table>
              </div>
              <a href="https://synergysphere.odoo.com" style="display: inline-block; background: #2563eb; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; margin-top: 12px;">
                Go to Dashboard
              </a>
            </div>
            <div style="background: #f1f5f9; padding: 16px; text-align: center; color: #94a3b8; font-size: 0.95rem;">
              This is an automated notification from SynergySphere - Odoo.
            </div>
          </div>
        </div>
      `,
    });

    res.status(201).json({ data: project, message: "Project created and email sent!" });
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
