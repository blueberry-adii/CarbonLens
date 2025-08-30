const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getDashboardStats,
  getWeeklyTrendData,
  carbonCategoryBreakdown,
} = require("../controllers/analytics.controller");

const router = express.Router();

// Dashboard Stats
router.get("/dashboard", authMiddleware, getDashboardStats);

// Get weekly trend data
router.get("/weekly-trend", authMiddleware, getWeeklyTrendData);

// Get carbon by category breakdown
router.get("/category-breakdown", authMiddleware, carbonCategoryBreakdown);

module.exports = router;
