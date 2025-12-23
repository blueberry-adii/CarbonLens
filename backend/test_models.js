require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // Current SDK doesn't always expose listModels directly on genAI instance depending on version,
        // but usually it's there or on a specific manager.
        // For @google/generative-ai, we might need to use the model manager if exposed, 
        // or just try a standard one.
        // Actually the standard way is:
        // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // But to list... 
        // There is no direct listModels in the high level SDK usually?
        // Let's rely on documentation knowledge or try a simpler fallback:
        // Just try to generate content with 'gemini-1.5-flash' and 'gemini-2.0-flash' and 'gemini-1.5-pro'
        // and see which one doesn't give 404.

        // Attempting to list via REST if SDK is obscure, but let's try a known standard model for 2024/2025.
        // 'gemini-1.5-flash' should exist.

        // If the user got 404 on 1.5-flash, that is very suspicious.

        const modelsToTry = ["gemini-2.0-flash", "gemini-2.0-flash-exp", "gemini-1.5-flash-8b", "gemini-exp-1206"];

        for (const modelName of modelsToTry) {
            console.log(`Testing model: ${modelName}`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello?");
                const response = await result.response;
                console.log(`✅ ${modelName} is working. Response: ${response.text().slice(0, 20)}...`);
            } catch (e) {
                console.log(`❌ ${modelName} failed: ${e.message.split(']')[1] || e.message}`); // Clean up error log
            }
        }

    } catch (error) {
        console.error("Fatal error:", error);
    }
}

listModels();
