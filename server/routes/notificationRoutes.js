const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Notification routes
router.post('/create', authMiddleware, notificationController.createNotification);
router.get('/user/:userId', authMiddleware, notificationController.getNotificationsByUser);
router.get('/:id', authMiddleware, notificationController.getNotificationById);
router.put('/:id/read', authMiddleware, notificationController.markAsRead);
router.delete('/:id', authMiddleware, notificationController.deleteNotification);

module.exports = router;
