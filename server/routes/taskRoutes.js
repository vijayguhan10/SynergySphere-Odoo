const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

// Task routes
router.post('/create', authMiddleware, taskController.createTask);
router.get('/:id', authMiddleware, taskController.getTaskById);
router.get('/project/:projectId', authMiddleware, taskController.getTasksByProject);
router.get('/assignee/:assigneeId', authMiddleware, taskController.getTasksByAssignee);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);
router.get('/', authMiddleware, taskController.getAllTasks);

module.exports = router;
