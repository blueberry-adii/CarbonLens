const { register, login, me } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

module.exports = router;
