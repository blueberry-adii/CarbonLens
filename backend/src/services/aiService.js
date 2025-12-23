const axios = require("axios");
const fs = require("fs");

class AIService {
  constructor() {
    this.clarifaiApiKey = process.env.CLARIFAI_API_KEY;
    this.geminiApiKey = process.env.GEMINI_API_KEY;

    if (this.geminiApiKey) {
      const { GoogleGenerativeAI, SchemaType } = require("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(this.geminiApiKey);
      this.model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
              tips: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
              },
              alternatives: {
                type: SchemaType.ARRAY,
                items: {
                  type: SchemaType.OBJECT,
                  properties: {
                    suggestion: { type: SchemaType.STRING },
                    potentialSaving: { type: SchemaType.NUMBER },
                  },
                },
              },
              comparison: {
                type: SchemaType.OBJECT,
                properties: {
                  avgMeal: { type: SchemaType.NUMBER },
                  percentDifference: { type: SchemaType.NUMBER },
                },
              },
            },
            required: ["tips", "alternatives", "comparison"],
          },
        },
      });
    }
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
      if (!this.geminiApiKey) {
        console.log("⚠️ No Gemini API key found, returning mock insights");
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
        
        Respond in strict JSON format without any markdown code blocks:
        {
          "tips": ["tip1", "tip2", "tip3"],
          "alternatives": [{"suggestion": "alt1", "potentialSaving": 2.5}],
          "comparison": {"avgMeal": 8.5, "percentDifference": -15}
        }
      `;

      // Retry mechanism
      let retries = 3;
      while (retries > 0) {
        try {
          const result = await this.model.generateContent(prompt);
          const response = await result.response;
          let text = response.text();

          text = text.replace(/```json/g, "").replace(/```/g, "").trim();
          return JSON.parse(text);
        } catch (err) {
          console.log(`⚠️ Gemini API attempt failed (${retries} left):`, err.message);
          retries--;
          if (retries === 0) throw err;
          // Wait 2 seconds before retry
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

    } catch (error) {
      console.error("Gemini API error:", error.message);
      return {
        tips: [
          "Could not connect to the server to generate tips.",
          "Please check your API key and connection.",
          "Try again later.",
        ],
        alternatives: [],
        comparison: {
          avgMeal: 0,
          percentDifference: 0,
        },
      };
    }
  }

  async estimateCarbonFootprint(items) {
    try {
      if (!this.geminiApiKey) {
        return {};
      }

      const prompt = `
        Estimate the carbon footprint (in kg CO2e) for the following food items.
        Items: ${items.join(", ")}
        
        Provide the result as a JSON object where potential keys are the item names (normalized to lowercase) and values are the estimated carbon footprint as a number.
        If you are unsure, do not include the item in the object.
        
        Example:
        {
          "burger": 3.5,
          "fries": 0.5
        }
      `;

      let retries = 3;
      while (retries > 0) {
        try {
          const result = await this.model.generateContent(prompt);
          const response = await result.response;
          let text = response.text();
          text = text.replace(/```json/g, "").replace(/```/g, "").trim();
          return JSON.parse(text);
        } catch (err) {
          console.log(`⚠️ Gemini Carbon Estimate attempt failed (${retries} left):`, err.message);
          retries--;
          if (retries === 0) return {};
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      return {};
    } catch (error) {
      console.error("Gemini Carbon Estimate error:", error.message);
      return {};
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
