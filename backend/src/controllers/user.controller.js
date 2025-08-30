const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json(
    new ApiResponse(200, {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profile: req.user.profile,
      stats: req.user.stats,
      settings: req.user.settings,
    }),
    "Got user details successfully"
  );
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
  const { name, bio, location } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      "profile.bio": bio,
      "profile.location": location,
    },
    { new: true, runValidators: true }
  ).select("-password");

  res.json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

exports.updateUserSettings = asyncHandler(async (req, res) => {
  const { dailyReminders, weeklyReports, carbonGoal } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      "settings.dailyReminders": dailyReminders,
      "settings.weeklyReports": weeklyReports,
      "settings.carbonGoal": carbonGoal,
    },
    { new: true }
  ).select("-password");

  res.json({
    success: true,
    message: "Settings updated successfully",
    data: updatedUser.settings,
  });
});
