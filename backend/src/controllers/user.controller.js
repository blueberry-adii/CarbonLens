const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");
const CarbonEntry = require("../models/carbonEntry.model");

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

exports.getLeaderboard = asyncHandler(async (req, res) => {
  const { period = "week" } = req.query;

  let startDate;
  const now = new Date();

  switch (period) {
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  const leaderboardData = await CarbonEntry.aggregate([
    {
      $match: {
        date: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: "$userId",
        totalCarbon: { $sum: "$analysis.totalCarbon" },
        entryCount: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        name: "$user.name",
        totalCarbon: 1,
        entryCount: 1,
        carbonSaved: { $subtract: [50, "$totalCarbon"] },
      },
    },
    {
      $sort: { carbonSaved: -1 },
    },
    {
      $limit: 20,
    },
  ]);

  const leaderboard = leaderboardData.map((entry, index) => ({
    rank: index + 1,
    name: entry.name,
    totalCarbon: entry.totalCarbon,
    carbonSaved: Math.max(0, entry.carbonSaved),
    entryCount: entry.entryCount,
    isCurrentUser: entry._id.equals(req.user._id),
  }));

  res.status(200).json(
    new ApiResponse(200, {
      period,
      leaderboard,
      userRank:
        leaderboard.findIndex((entry) => entry.isCurrentUser) + 1 || null,
    })
  );
});

exports.getUserAchievements = (req, res) => {
  const achievements = [
    {
      id: 1,
      name: "Getting Started",
      description: "Logged your first meal",
      icon: "🌱",
      unlocked: req.user.stats.totalEntries > 0,
      unlockedAt: req.user.stats.totalEntries > 0 ? req.user.createdAt : null,
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "Tracked meals for 7 consecutive days",
      icon: "🔥",
      unlocked: req.user.stats.streak.current >= 7,
      unlockedAt:
        req.user.stats.streak.current >= 7
          ? req.user.stats.streak.lastEntry
          : null,
    },
    {
      id: 3,
      name: "Carbon Saver",
      description: "Saved 100kg of CO2",
      icon: "🌍",
      unlocked: req.user.stats.carbonSaved >= 100,
      unlockedAt: null,
    },
    {
      id: 4,
      name: "Social Butterfly",
      description: "Invited 5 friends",
      icon: "🦋",
      unlocked: false,
    },
    {
      id: 5,
      name: "Plant Pioneer",
      description: "30 plant-based meals",
      icon: "🥬",
      unlocked: false,
    },
    {
      id: 6,
      name: "Century Club",
      description: "Logged 100 meals",
      icon: "💯",
      unlocked: req.user.stats.totalEntries >= 100,
      unlockedAt: null,
    },
  ];

  res.status(200).json(new ApiResponse(200, achievements));
};
