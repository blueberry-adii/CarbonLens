const axios = require("axios");
const fs = require("fs");

class AIService {
  constructor() {
    this.clarifaiApiKey = process.env.CLARIFAI_API_KEY;
    this.openaiApiKey = process.env.OPENAI_API_KEY;
  }

  async analyzeImage(imagePath) {
    try {
      if (!this.clarifaiApiKey) {
        console.log("⚠️ No Clarifai API key found, returning mock data");
        return this.getMockAnalysis();
      }

      const imageBase64 = fs.readFileSync(imagePath, { encoding: "base64" });

      const response = await axios.post(
        "https://api.clarifai.com/v2/models/food-item-recognition/outputs",
        {
          inputs: [
            {
              data: {
                image: {
                  base64: imageBase64,
                },
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Key ${this.clarifaiApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const concepts = response.data.outputs[0].data.concepts;

      return concepts
        .filter((concept) => concept.value > 0.7)
        .slice(0, 5)
        .map((concept) => ({
          name: concept.name,
          confidence: concept.value,
          category: this.categorizeFood(concept.name),
        }));
    } catch (error) {
      console.error("Clarifai API error:", error.message);
      return this.getMockAnalysis();
    }
  }

  async generateInsights(detectedItems, totalCarbon) {
    try {
      if (!this.openaiApiKey) {
        console.log("⚠️ No OpenAI API key found, returning mock insights");
        return this.getMockInsights(detectedItems, totalCarbon);
      }

      const itemNames = detectedItems.map((item) => item.name).join(", ");

      const prompt = `
        A user consumed a meal containing: ${itemNames}
        Total carbon footprint: ${totalCarbon} kg CO2
        
        Provide:
        1. 3 specific, actionable tips to reduce carbon footprint
        2. 2 sustainable alternatives for high-carbon items
        3. A brief comparison with average meal carbon footprint (8.5 kg CO2)
        
        Respond in JSON format:
        {
          "tips": ["tip1", "tip2", "tip3"],
          "alternatives": [{"suggestion": "alt1", "potentialSaving": 2.5}],
          "comparison": {"avgMeal": 8.5, "percentDifference": -15}
        }
      `;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${this.openaiApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      return JSON.parse(aiResponse);
    } catch (error) {
      console.error("OpenAI API error:", error.message);
      return this.getMockInsights(detectedItems, totalCarbon);
    }
  }

  getMockAnalysis() {
    const mockItems = [
      { name: "burger", confidence: 0.95, category: "meat" },
      { name: "french fries", confidence: 0.87, category: "processed" },
      { name: "soda", confidence: 0.82, category: "beverages" },
    ];

    return mockItems;
  }

  getMockInsights(detectedItems, totalCarbon) {
    return {
      tips: [
        "Try replacing beef with chicken to reduce carbon by 70%",
        "Choose baked potato over fries to save 2.3 kg CO2",
        "Opt for water instead of soda to eliminate packaging emissions",
      ],
      alternatives: [
        { suggestion: "Plant-based burger", potentialSaving: 5.2 },
        { suggestion: "Sweet potato fries", potentialSaving: 1.8 },
      ],
      comparison: {
        avgMeal: 8.5,
        percentDifference: Math.round(((totalCarbon - 8.5) / 8.5) * 100),
      },
    };
  }

  categorizeFood(itemName) {
    const categories = {
      meat: ["beef", "chicken", "pork", "lamb", "turkey", "bacon", "ham"],
      dairy: ["milk", "cheese", "yogurt", "butter", "cream"],
      grains: ["rice", "bread", "pasta", "cereal", "oats"],
      vegetables: ["lettuce", "tomato", "onion", "carrot", "broccoli"],
      fruits: ["apple", "banana", "orange", "berry", "grape"],
      beverages: ["coffee", "tea", "soda", "juice", "beer", "wine"],
      processed: ["fries", "chips", "cookie", "cake", "pizza"],
    };

    for (const [category, items] of Object.entries(categories)) {
      if (items.some((item) => itemName.toLowerCase().includes(item))) {
        return category;
      }
    }
    return "other";
  }
}

module.exports = new AIService();
