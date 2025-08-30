const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getUserProfile,
  updateUserProfile,
  updateUserSettings,
  getUserAchievements,
} = require("../controllers/user.controller");

const router = express.Router();

// Get Profile
router.get("/profile", authMiddleware, getUserProfile);

// Update Profile
router.put("/profile", authMiddleware, updateUserProfile);

// Update user settings
router.put("/settings", authMiddleware, updateUserSettings);

// Get leaderboard
router.get("/leaderboard", authMiddleware, getLeaderboard);

// Get user achievements
router.get("/achievements", authMiddleware, getUserAchievements);

module.exports = router;
