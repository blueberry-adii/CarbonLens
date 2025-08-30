const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getDashboardStats,
  getWeeklyTrendData,
} = require("../controllers/analytics.controller");

const router = express.Router();

// Dashboard Stats
router.get("/dashboard", authMiddleware, getDashboardStats);

// Get weekly trend data
router.get("/weekly-trend", authMiddleware, getWeeklyTrendData);

module.exports = router;
