const CarbonData = require("../models/carbonData.model");

class CarbonCalculator {
  constructor() {
    this.fallbackData = {
      beef: 27.0,
      burger: 15.2,
      hamburger: 15.2,
      chicken: 6.9,
      "chicken breast": 5.7,
      "chicken sandwich": 8.3,
      pork: 12.1,
      bacon: 17.4,
      ham: 13.8,
      fish: 6.1,
      salmon: 11.9,
      tuna: 6.1,
      cheese: 13.5,
      milk: 3.2,
      yogurt: 2.2,
      butter: 23.8,
      rice: 4.0,
      bread: 2.3,
      pasta: 3.3,
      pizza: 7.3,
      potato: 2.9,
      "french fries": 4.6,
      chips: 5.1,
      lettuce: 1.4,
      tomato: 2.1,
      onion: 1.7,
      apple: 1.3,
      banana: 1.9,
      orange: 1.7,
      coffee: 4.6,
      tea: 0.4,
      soda: 1.3,
      beer: 1.9,
      cookie: 2.6,
      cake: 3.8,
      "ice cream": 4.0,
    };
  }

  async calculateCarbon(detectedItems, aiEstimates = {}) {
    try {
      const breakdown = [];
      let totalCarbon = 0;

      for (const item of detectedItems) {
        let carbonValue;

        // Try to get from AI estimates first
        if (aiEstimates && aiEstimates[item.name.toLowerCase()]) {
          carbonValue = aiEstimates[item.name.toLowerCase()];
          console.log(`🤖 Used AI carbon estimate for ${item.name}: ${carbonValue}`);
        } else {
          // Fallback to database/hardcoded
          carbonValue = await this.getCarbonValue(item.name);
        }

        const itemCarbon = carbonValue * this.getServingMultiplier(item.name);

        breakdown.push({
          item: item.name,
          carbonValue: parseFloat(itemCarbon.toFixed(2)),
          unit: "kg CO2e",
        });

        totalCarbon += itemCarbon;
      }

      return {
        breakdown,
        totalCarbon: parseFloat(totalCarbon.toFixed(2)),
        averageConfidence:
          detectedItems.reduce((sum, item) => sum + item.confidence, 0) /
          detectedItems.length,
      };
    } catch (error) {
      console.error("Carbon calculation error:", error);
      throw new Error("Failed to calculate carbon footprint");
    }
  }

  async getCarbonValue(itemName) {
    try {
      const carbonData = await CarbonData.findOne({
        $or: [
          { itemName: itemName.toLowerCase() },
          { aliases: { $in: [itemName.toLowerCase()] } },
        ],
      });

      if (carbonData) {
        return carbonData.carbonPerUnit;
      }

      const normalizedName = itemName.toLowerCase();

      if (this.fallbackData[normalizedName]) {
        return this.fallbackData[normalizedName];
      }

      for (const [key, value] of Object.entries(this.fallbackData)) {
        if (normalizedName.includes(key) || key.includes(normalizedName)) {
          return value;
        }
      }

      console.log(`⚠️ No carbon data found for: ${itemName}, using default`);
      return 5.0;
    } catch (error) {
      console.error("Error fetching carbon value:", error);
      return 5.0;
    }
  }

  getServingMultiplier(itemName) {
    const servingMultipliers = {
      burger: 1.0,
      sandwich: 1.0,
      pizza: 0.8,
      fries: 0.6,
      chips: 0.3,
      cookie: 0.2,
      apple: 0.5,
      banana: 0.4,
      orange: 0.6,
      coffee: 0.3,
      soda: 0.4,
      beer: 0.5,
    };

    const normalizedName = itemName.toLowerCase();

    for (const [key, multiplier] of Object.entries(servingMultipliers)) {
      if (normalizedName.includes(key)) {
        return multiplier;
      }
    }

    return 1.0;
  }

  async seedCarbonDatabase() {
    try {
      const count = await CarbonData.countDocuments();
      if (count > 0) {
        console.log("✅ Carbon database already seeded");
        return;
      }

      const seedData = [
        {
          itemName: "beef",
          category: "meat",
          carbonPerUnit: 27.0,
          unit: "per_100g",
          sustainabilityScore: 2,
        },
        {
          itemName: "chicken",
          category: "meat",
          carbonPerUnit: 6.9,
          unit: "per_100g",
          sustainabilityScore: 6,
        },
        {
          itemName: "pork",
          category: "meat",
          carbonPerUnit: 12.1,
          unit: "per_100g",
          sustainabilityScore: 4,
        },
        {
          itemName: "fish",
          category: "meat",
          carbonPerUnit: 6.1,
          unit: "per_100g",
          sustainabilityScore: 7,
        },
        {
          itemName: "cheese",
          category: "dairy",
          carbonPerUnit: 13.5,
          unit: "per_100g",
          sustainabilityScore: 4,
        },
        {
          itemName: "milk",
          category: "dairy",
          carbonPerUnit: 3.2,
          unit: "per_cup",
          sustainabilityScore: 5,
        },
        {
          itemName: "rice",
          category: "grains",
          carbonPerUnit: 4.0,
          unit: "per_cup",
          sustainabilityScore: 6,
        },
        {
          itemName: "bread",
          category: "grains",
          carbonPerUnit: 2.3,
          unit: "per_slice",
          sustainabilityScore: 7,
        },
        {
          itemName: "potato",
          category: "vegetables",
          carbonPerUnit: 2.9,
          unit: "per_100g",
          sustainabilityScore: 8,
        },
        {
          itemName: "lettuce",
          category: "vegetables",
          carbonPerUnit: 1.4,
          unit: "per_100g",
          sustainabilityScore: 9,
        },
        {
          itemName: "tomato",
          category: "vegetables",
          carbonPerUnit: 2.1,
          unit: "per_100g",
          sustainabilityScore: 8,
        },
        {
          itemName: "apple",
          category: "fruits",
          carbonPerUnit: 1.3,
          unit: "per_piece",
          sustainabilityScore: 9,
        },
        {
          itemName: "banana",
          category: "fruits",
          carbonPerUnit: 1.9,
          unit: "per_piece",
          sustainabilityScore: 8,
        },
        {
          itemName: "coffee",
          category: "beverages",
          carbonPerUnit: 4.6,
          unit: "per_cup",
          sustainabilityScore: 5,
        },
        {
          itemName: "soda",
          category: "beverages",
          carbonPerUnit: 1.3,
          unit: "per_can",
          sustainabilityScore: 3,
        },
      ];

      await CarbonData.insertMany(seedData);
      console.log("✅ Carbon database seeded successfully");
    } catch (error) {
      console.error("❌ Failed to seed carbon database:", error);
    }
  }
}

module.exports = new CarbonCalculator();
