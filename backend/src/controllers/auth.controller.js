const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

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

  res.status(201).json(
    new ApiResponse(
      201,
      {
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
