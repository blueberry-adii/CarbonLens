const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getUserProfile } = require("../controllers/user.controller");

const router = express.Router();

// Get Profile
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
