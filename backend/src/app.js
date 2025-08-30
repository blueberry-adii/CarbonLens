const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");

const ApiResponse = require("./utils/ApiResponse");
const errorHandler = require("./middlewares/error.middleware");

// Import Routes
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const analyticsRoutes = require("./routes/analytics.route");

const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/analytics", analyticsRoutes);

// Health endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "OK"));
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server connected on port: ${PORT}`);
});
