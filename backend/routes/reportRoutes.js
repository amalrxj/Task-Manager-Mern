const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  exportTasksReport,
  exportUsersReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/export/tasks", exportTasksReport);
router.get("/export/users", exportUsersReport);

module.exports = router;
