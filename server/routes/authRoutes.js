const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', authMiddleware, async (req, res) => {
  res.json({ message: 'Protected route', userId: req.userId });
});

module.exports = router;
