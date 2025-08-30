const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const { generateToken } = require("../utils/generateToken");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new ApiError(400, "Name, email, and password are required");

  if (password.length < 6)
    throw new ApiError(400, "Password must be at least 6 characters long");

  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ApiError(400, "User with this email already exists");

  const user = new User({ name, email, password });
  await user.save();

  const token = generateToken(user._id);

  res.status(201).json(
    new ApiResponse(
      201,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          joinDate: user.profile.joinDate,
        },
      },
      "User registered successfully"
    )
  );
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ApiError(400, "Email and password are required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "Invalid email or password");

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw new ApiError(400, "Invalid email or password");

  const token = generateToken(user._id);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          stats: user.stats,
          settings: user.settings,
        },
      },
      "Login successful"
    )
  );
});

exports.me = (req, res) => {
  res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          profile: req.user.profile,
          stats: req.user.stats,
          settings: req.user.settings,
        },
      },
      "Fetched User successfully"
    )
  );
};
