const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const {
  analyzeMeal,
  getUserCarbonEntries,
  getSpecificEntry,
  deleteEntry,
} = require("../controllers/carbon.controller");

const router = express.Router();

// Analyze meal image
router.post("/analyze", authMiddleware, upload.single("image"), analyzeMeal);

// Get user's carbon entries
router.get("/entries", authMiddleware, getUserCarbonEntries);

// Get specific entry
router.get("/entries/:id", authMiddleware, getSpecificEntry);

// Delete entry
router.delete("/entries/:id", authMiddleware, deleteEntry);
