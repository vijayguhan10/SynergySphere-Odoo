const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');

// Message routes
router.post('/create', authMiddleware, messageController.createMessage);
router.get('/project/:projectId', authMiddleware, messageController.getMessagesByProject);
router.get('/:id', authMiddleware, messageController.getMessageById);
router.put('/:id', authMiddleware, messageController.updateMessage);
router.delete('/:id', authMiddleware, messageController.deleteMessage);

module.exports = router;
