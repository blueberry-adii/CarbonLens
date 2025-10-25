const mongoose = require("mongoose");

const carbonEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      filename: String,
      originalName: String,
      path: String,
      size: Number,
      mimeType: String,
    },
    analysis: {
      detectedItems: [
        {
          name: String,
          confidence: Number,
          category: String,
        },
      ],
      totalCarbon: {
        type: Number,
        required: true,
      },
      carbonSaved: {
        type: Number,
        required: true,
      },
      carbonBreakdown: [
        {
          item: String,
          carbonValue: Number,
          unit: String,
        },
      ],
      processingTime: Number,
      aiConfidence: Number,
    },
    meal: {
      type: {
        type: String,
        enum: ["breakfast", "lunch", "dinner", "snack"],
        default: "snack",
      },
      location: String,
      notes: String,
    },
    insights: {
      tips: [String],
      alternatives: [
        {
          suggestion: String,
          potentialSaving: Number,
        },
      ],
      comparison: {
        avgMeal: Number,
        percentDifference: Number,
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

carbonEntrySchema.index({ userId: 1, date: -1 });
carbonEntrySchema.index({ "analysis.totalCarbon": 1 });

module.exports = mongoose.model("CarbonEntry", carbonEntrySchema);
