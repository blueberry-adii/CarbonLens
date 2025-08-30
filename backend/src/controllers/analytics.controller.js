const asyncHandler = require("../utils/asyncHandler");
const CarbonEntry = require("../models/carbonEntry.model");
const ApiResponse = require("../utils/ApiResponse");

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

  res
    .status(200)
    .json(new ApiResponse(200, dashboard, "Got Dashboard Stats successfully"));
});

exports.getWeeklyTrendData = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const weeklyData = await CarbonEntry.aggregate([
    {
      $match: {
        userId,
        date: { $gte: weekAgo },
      },
    },
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        },
        totalCarbon: { $sum: "$analysis.totalCarbon" },
        entryCount: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.date": 1 },
    },
  ]);

  const filledData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateString = date.toISOString().split("T")[0];

    const existingData = weeklyData.find((d) => d._id.date === dateString);

    filledData.push({
      date: dateString,
      carbon: existingData?.totalCarbon || 0,
      entries: existingData?.entryCount || 0,
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
    });
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, filledData, "Got weekly trend data successfully")
    );
});

exports.carbonCategoryBreakdown = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { period = "month" } = req.query;

  let startDate;
  const now = new Date();

  switch (period) {
    case "week":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  const categoryData = await CarbonEntry.aggregate([
    {
      $match: {
        userId,
        date: { $gte: startDate },
      },
    },
    {
      $unwind: "$analysis.detectedItems",
    },
    {
      $group: {
        _id: "$analysis.detectedItems.category",
        totalCarbon: { $sum: "$analysis.totalCarbon" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { totalCarbon: -1 },
    },
  ]);

  res.status(200).json(
    new ApiResponse(
      200,
      categoryData.map((item) => ({
        category: item._id || "other",
        carbon: item.totalCarbon,
        count: item.count,
        percentage: 0,
      })),
      "Categorized carbon data successfully"
    )
  );
});
