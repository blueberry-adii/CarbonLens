const aiService = require("../services/aiService");
const carbonCalculator = require("../services/carbonCalculator");
const CarbonEntry = require("../models/carbonEntry.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.analyzeMeal = asyncHandler(async (req, res, next) => {
  if (!req.file) throw new ApiError(400, "Image file is required");

  const startTime = Date.now();
  const today = new Date(startTime);
  const todayStr = today.toISOString().split("T")[0];

  console.log("🔍 Analyzing image with AI...");
  const detectedItems = await aiService.analyzeImage(req.file.path);

  console.log("📊 Calculating carbon footprint...");
  const carbonAnalysis = await carbonCalculator.calculateCarbon(detectedItems);

  console.log("💡 Generating AI insights...");
  const insights = await aiService.generateInsights(
    detectedItems,
    carbonAnalysis.totalCarbon
  );

  const carbonSaved =
    2.25 * (2.25 / (carbonAnalysis.totalCarbon || 2.25)) ** 0.5;

  const processingTime = Date.now() - startTime;

  const carbonEntry = new CarbonEntry({
    userId: req.user._id,
    image: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
    },
    analysis: {
      detectedItems: detectedItems.map((item) => ({
        name: item.name,
        confidence: item.confidence,
        category: item.category || "other",
      })),
      totalCarbon: carbonAnalysis.totalCarbon,
      carbonSaved: carbonSaved,
      carbonBreakdown: carbonAnalysis.breakdown,
      processingTime,
      aiConfidence:
        detectedItems.reduce((avg, item) => avg + item.confidence, 0) /
        detectedItems.length,
    },
    insights: {
      tips: insights.tips,
      alternatives: insights.alternatives,
      comparison: insights.comparison,
    },
  });

  await carbonEntry.save();

  const user = await User.findById(req.user._id);
  let currentStreakInc = 0;
  let longestStreakInc = 0;
  if (user.stats.streak.lastEntry) {
    const lastEntryStr = new Date(user.stats.lastEntry)
      .toISOString()
      .split("T")[0];
    if (
      Number(lastEntryStr.slice(0, 4)) <= Number(todayStr.slice(0, 4)) &&
      Number(lastEntryStr.slice(5, 7)) <= Number(todayStr.slice(5, 7)) &&
      Number(lastEntryStr.slice(8, 10)) < Number(todayStr.slice(8, 10))
    ) {
      currentStreakInc = 1;
    }
  } else {
    currentStreakInc = 1;
  }
  if (
    user.stats.streak.current + currentStreakInc >
    user.stats.streak.longest
  ) {
    longestStreakInc = 1;
  }

  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      "stats.streak.lastEntry": today,
    },
    $inc: {
      "stats.totalEntries": 1,
      "stats.totalCarbonTracked": carbonAnalysis.totalCarbon,
      "stats.carbonSaved": carbonSaved,
      "stats.streak.current": currentStreakInc,
      "stats.streak.longest": longestStreakInc,
    },
  });

  console.log("✅ Analysis completed successfully");

  res.status(200).json(
    new ApiResponse(
      200,
      {
        entryId: carbonEntry._id,
        detectedItems: detectedItems.map((item) => item.name),
        totalCarbon: carbonAnalysis.totalCarbon,
        carbonSaved: carbonSaved,
        breakdown: carbonAnalysis.breakdown,
        tips: insights.tips,
        alternatives: insights.alternatives,
        processingTime,
        confidence: carbonEntry.analysis.aiConfidence,
      },
      "Analysis completed successfully"
    )
  );
});

exports.getUserCarbonEntries = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 20, startDate, endDate } = req.query;

  const query = { userId: req.user._id };

  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) query.date.$lte = new Date(endDate);
  }

  const entries = await CarbonEntry.find(query)
    .sort({ date: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select("-image.path");

  const total = await CarbonEntry.countDocuments(query);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        entries,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalEntries: total,
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      },
      "Got User Carbon Entries successfully"
    )
  );
});

exports.getSpecificEntry = asyncHandler(async (req, res, next) => {
  const entry = await CarbonEntry.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!entry) throw new ApiError(404, "Entry not found");

  res.status(200).json(new ApiResponse(200, entry, "Got Entry successfully"));
});

exports.deleteEntry = asyncHandler(async (req, res, next) => {
  const entry = await CarbonEntry.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!entry) throw new ApiError(404, "Entry not found");

  await User.findByIdAndUpdate(req.user._id, {
    $inc: {
      "stats.totalEntries": -1,
      "stats.totalCarbonTracked": -entry.analysis.totalCarbon,
    },
  });

  res.json(new ApiResponse(200, [], "Entry deleted successfully"));
});
