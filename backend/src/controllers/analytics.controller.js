const asyncHandler = require("../utils/asyncHandler");
const CarbonEntry = require("../models/carbonEntry.model");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [todayStats, weeklyStats, monthlyStats, recentEntries] =
    await Promise.all([
      CarbonEntry.aggregate([
        { $match: { userId, date: { $gte: todayStart } } },
        {
          $group: {
            _id: null,
            totalCarbon: { $sum: "$analysis.totalCarbon" },
            count: { $sum: 1 },
          },
        },
      ]),

      CarbonEntry.aggregate([
        { $match: { userId, date: { $gte: weekStart } } },
        {
          $group: {
            _id: null,
            totalCarbon: { $sum: "$analysis.totalCarbon" },
            count: { $sum: 1 },
          },
        },
      ]),

      CarbonEntry.aggregate([
        { $match: { userId, date: { $gte: monthStart } } },
        {
          $group: {
            _id: null,
            totalCarbon: { $sum: "$analysis.totalCarbon" },
            count: { $sum: 1 },
          },
        },
      ]),

      CarbonEntry.find({ userId })
        .sort({ date: -1 })
        .limit(5)
        .select("analysis.detectedItems analysis.totalCarbon date"),
    ]);

  const dashboard = {
    today: {
      carbon: todayStats[0]?.totalCarbon || 0,
      entries: todayStats[0]?.count || 0,
    },
    weekly: {
      carbon: weeklyStats[0]?.totalCarbon || 0,
      entries: weeklyStats[0]?.count || 0,
      average: weeklyStats[0] ? (weeklyStats[0].totalCarbon / 7).toFixed(1) : 0,
    },
    monthly: {
      carbon: monthlyStats[0]?.totalCarbon || 0,
      entries: monthlyStats[0]?.count || 0,
    },
    recentEntries: recentEntries.map((entry) => ({
      id: entry._id,
      items: entry.analysis.detectedItems.map((item) => item.name),
      carbon: entry.analysis.totalCarbon,
      date: entry.date,
    })),
  };

  res.json({
    success: true,
    data: dashboard,
  });
});
