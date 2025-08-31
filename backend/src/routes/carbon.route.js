const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const { analyzeMeal } = require("../controllers/carbon.controller");

const router = express.Router();

// Analyze meal image
router.post("/analyze", authMiddleware, upload.single("image"), analyzeMeal);
