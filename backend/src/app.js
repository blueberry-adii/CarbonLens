const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");

const ApiResponse = require("./utils/ApiResponse");

// Routes
const authRoutes = require("./routes/auth.route");

const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/health", (req, res) => {
  res.status(200).json(new ApiResponse(200, {}, "OK"));
});

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server connected on port: ${PORT}`);
});
