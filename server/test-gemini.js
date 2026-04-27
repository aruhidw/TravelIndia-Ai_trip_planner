require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

async function testGemini() {
  console.log("🔍 Testing Gemini API...");
  console.log("API Key exists:", process.env.GEMINI_API_KEY ? "YES" : "NO");
  
  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ No API key found in .env");
    return;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    console.log("🔄 Sending test request...");
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Say 'Hello from Gemini API! Working!'",
    });
    
    console.log("✅ SUCCESS! Response:", response.text);
  } catch (error) {
    console.log("❌ FAILED!");
    console.log("Error code:", error.status);
    console.log("Error message:", error.message);
    
    if (error.message.includes("quota") || error.status === 429) {
      console.log("\n💡 SOLUTION:");
      console.log("1. Go to https://aistudio.google.com/");
      console.log("2. Click 'Get API Key'");
      console.log("3. Look for 'Quota Tier' column");
      console.log("4. Click 'Set up billing' to activate free tier");
      console.log("5. You won't be charged, quotas will become active");
    }
  }
}

testGemini();