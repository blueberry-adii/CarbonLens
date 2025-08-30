const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getDashboardStats } = require("../controllers/analytics.controller");

const router = express.Router();

// Dashboard Stats
router.get("/dashboard", authMiddleware, getDashboardStats);

module.exports = router;
