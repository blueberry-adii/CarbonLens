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

  console.log("🔍 Analyzing image with AI...");
  const detectedItems = await aiService.analyzeImage(req.file.path);

  console.log("📊 Calculating carbon footprint...");
  const carbonAnalysis = await carbonCalculator.calculateCarbon(detectedItems);

  console.log("💡 Generating AI insights...");
  const insights = await aiService.generateInsights(
    detectedItems,
    carbonAnalysis.totalCarbon
  );

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

  await User.findByIdAndUpdate(req.user._id, {
    $inc: {
      "stats.totalEntries": 1,
      "stats.totalCarbonTracked": carbonAnalysis.totalCarbon,
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
