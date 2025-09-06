const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

// Project routes
router.post('/create', authMiddleware, projectController.createProject);
router.get('/getall', authMiddleware, projectController.getAllProjects);
router.get('/:id', authMiddleware, projectController.getProjectById);
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);
router.post('/add-member', authMiddleware, projectController.addMember);
router.post('/remove-member', authMiddleware, projectController.removeMember);

module.exports = router;
