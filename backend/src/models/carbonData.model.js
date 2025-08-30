const mongoose = require("mongoose");

const carbonDataSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "meat",
        "dairy",
        "grains",
        "vegetables",
        "fruits",
        "beverages",
        "processed",
        "other",
      ],
    },
    carbonPerUnit: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: ["per_100g", "per_cup", "per_piece", "per_serving", "per_kg"],
    },
    aliases: [String],
    nutritionInfo: {
      calories: Number,
      protein: Number,
      fat: Number,
      carbs: Number,
    },
    sustainabilityScore: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CarbonData", carbonDataSchema);
