const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData
} = require('../controllers/taskController');


const router = express.Router();

router.get('/dashboard-data', protect, getDashboardData);
router.get('/user-dashboard-data', protect, getUserDashboardData);
router.get('/', protect, getTasks);
router.get('/:id', protect, getTaskById);
router.post('/', protect, adminOnly ,createTask); // Admin only
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, adminOnly, deleteTask); // Admin only
router.put('/:id/status', protect, updateTaskStatus);
router.put('/:id/todo', protect, updateTaskChecklist);

module.exports = router;