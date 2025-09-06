const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// User routes
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUserProfile);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.get('/:id/projects', authMiddleware, userController.getUserProjects);
router.get('/:id/tasks', authMiddleware, userController.getUserTasks);
router.get('/:id/messages', authMiddleware, userController.getUserMessages);
router.get('/:id/notifications', authMiddleware, userController.getUserNotifications);

module.exports = router;
