const { GoogleGenAI } = require("@google/genai");

class AIService {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("❌ GEMINI_API_KEY not found in .env file");
    }
    
    this.ai = new GoogleGenAI({ apiKey: apiKey });
    // CHANGE THIS LINE - Use Gemma 4 model
    this.model = "gemma-4-31b-it";  // or "gemma-4-26b-a4b-it"
    console.log("✅ Gemma 4 model ready - 1,500 free requests/day");
  }

  async generateItinerary(destination, state, homeLocation) {
    const prompt = this.buildPrompt(destination, state, homeLocation);
    
    console.log(`🔄 Calling Gemma 4 for ${destination}...`);
    
    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: prompt,
      config: {
        temperature: 0.9,
        maxOutputTokens: 2500,
        responseMimeType: "application/json",
      },
    });

    let text = response.text;
    text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    const itinerary = JSON.parse(text);
    
    console.log(`✅ Itinerary generated for ${destination}`);
    return itinerary;
  }


  buildPrompt(destination, state, homeLocation) {
    return `Generate a travel itinerary for ${destination}, ${state}, India. 
Traveler from ${homeLocation}.

Return ONLY valid JSON:
{
  "overview": "Description of ${destination}",
  "bestTime": "Best months to visit",
  "places": ["attraction 1", "attraction 2", "attraction 3", "attraction 4", "attraction 5"],
  "hotels": [
    {"name": "hotel name", "priceRange": "₹X - ₹Y", "rating": 4.0},
    {"name": "hotel name 2", "priceRange": "₹X - ₹Y", "rating": 4.0},
    {"name": "hotel name 3", "priceRange": "₹X - ₹Y", "rating": 4.0}
  ],
  "food": ["dish 1", "dish 2", "dish 3", "dish 4"],
  "transport": [
    {"type": "transport type", "cost": "₹X"},
    {"type": "transport type 2", "cost": "₹X"},
    {"type": "transport type 3", "cost": "₹X"}
  ],
  "reach": "How to reach from ${homeLocation}",
  "estimatedCost": "Budget for 5 days",
  "weather": "Weather info",
  "safety": "Safety tips",
  "carry": ["item 1", "item 2", "item 3", "item 4", "item 5"],
  "documents": ["doc 1", "doc 2"]
}`;
  }
}

module.exports = new AIService();