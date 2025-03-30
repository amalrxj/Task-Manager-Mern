const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getUsers, getUserById } = require('../controllers/userController');

const router = express.Router();

// User Controller Functions
router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, getUserById);

module.exports = router;