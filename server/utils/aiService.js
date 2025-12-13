const { GoogleGenerativeAI } = require("@google/generative-ai");

class AIService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    async generateItinerary(userData) {
        try {
            // Try Gemini AI first
            const aiItinerary = await this.generateWithGemini(userData);
            return aiItinerary;
        } catch (error) {
            console.log('AI failed, using local data:', error.message);
            // Fallback to local database
            return this.generateLocalItinerary(userData);
        }
    }

    async generateWithGemini(userData) {
        const prompt = this.createPrompt(userData);
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        
        // Parse AI response into structured itinerary
        return this.parseAIResponse(response.text(), userData);
    }

    createPrompt(userData) {
        return `
        As an expert travel planner for India, create a detailed itinerary for ${userData.destination}, ${userData.state} 
        for a traveler from ${userData.homeLocation}. Provide comprehensive information in this EXACT JSON format:

        {
            "overview": "2-3 paragraph description",
            "bestTime": "Best months to visit with reasons",
            "places": ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5"],
            "hotels": [
                {"name": "Hotel Name", "priceRange": "₹1000-2000", "rating": 4.2},
                {"name": "Hotel Name", "priceRange": "₹2000-4000", "rating": 4.5}
            ],
            "food": ["Dish 1", "Dish 2", "Dish 3", "Dish 4"],
            "transport": [
                {"type": "Local Auto", "cost": "₹50-100 per km"},
                {"type": "Taxi", "cost": "₹15-20 per km"}
            ],
            "reach": "Detailed travel options from ${userData.homeLocation}",
            "estimatedCost": "Budget breakdown for 3-5 days",
            "weather": "Current and seasonal weather information",
            "safety": "Important safety tips and precautions",
            "carry": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
            "documents": ["Document 1", "Document 2", "Document 3"]
        }

        Make it practical, accurate and helpful for Indian travelers.
        `;
    }

    generateLocalItinerary(userData) {
        // Pre-defined itineraries for popular destinations
        const popularDestinations = {
            'goa': this.getGoaItinerary(),
            'manali': this.getManaliItinerary(),
            'jaipur': this.getJaipurItinerary(),
            'kerala': this.getKeralaItinerary(),
            // Add more destinations...
        };

        const key = userData.destination.toLowerCase();
        return popularDestinations[key] || this.getGenericItinerary(userData);
    }

    getGenericItinerary(userData) {
        // Fallback for any unknown destination
        return {
            overview: `${userData.destination} is a beautiful destination in ${userData.state} offering unique cultural experiences and scenic beauty.`,
            bestTime: "October to March for pleasant weather",
            places: ["Main City Center", "Local Markets", "Historical Sites", "Natural Attractions", "Cultural Spots"],
            hotels: [
                {name: "Budget Hotel", priceRange: "₹800-1500", rating: 3.8},
                {name: "Mid-range Hotel", priceRange: "₹1500-3000", rating: 4.2}
            ],
            food: ["Local Cuisine", "Street Food", "Traditional Dishes"],
            transport: [
                {type: "Auto Rickshaw", cost: "₹30-50 per km"},
                {type: "Local Bus", cost: "₹10-50 per trip"}
            ],
            reach: `Travel options from ${userData.homeLocation} include trains, buses, or flights to nearest major city.`,
            estimatedCost: "₹5000-8000 for 3 days including stay, food and local travel",
            weather: "Check current weather before traveling. Generally pleasant during tourist season.",
            safety: "Follow general travel safety precautions. Keep valuables secure.",
            carry: ["Valid ID", "Medicines", "Comfortable shoes", "Weather-appropriate clothing", "Power bank"],
            documents: ["Government ID", "Travel tickets", "Hotel bookings"]
        };
    }

    parseAIResponse(aiText, userData) {
        try {
            // Extract JSON from AI response
            const jsonMatch = aiText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.log('Failed to parse AI response, using generic');
        }
        return this.getGenericItinerary(userData);
    }

    // Pre-defined itineraries for popular destinations
    getGoaItinerary() {
        return {
            overview: "Goa - India's beach paradise with Portuguese heritage, stunning beaches, and vibrant nightlife.",
            bestTime: "November to February for perfect beach weather",
            places: ["Calangute Beach", "Baga Beach", "Fort Aguada", "Basilica of Bom Jesus", "Anjuna Flea Market"],
            hotels: [
                {name: "Beachside Resort", priceRange: "₹2000-4000", rating: 4.3},
                {name: "Budget Guesthouse", priceRange: "₹800-1500", rating: 4.0}
            ],
            food: ["Fish Curry Rice", "Pork Vindaloo", "Bebinca", "Goan Sausages"],
            transport: [
                {type: "Bike Rental", cost: "₹300-500 per day"},
                {type: "Taxi", cost: "₹15-20 per km"}
            ],
            reach: "Well connected by train, bus and flight from major cities",
            estimatedCost: "₹8000-12000 for 4 days including beach activities",
            weather: "Tropical climate, hot and humid most of the year",
            safety: "Beach safety important. Avoid swimming in rough seas.",
            carry: ["Beachwear", "Sunscreen", "Swimwear", "Light cotton clothes", "Mosquito repellent"],
            documents: ["ID Proof", "Hotel confirmation", "Travel tickets"]
        };
    }

    // Add more pre-defined itineraries as needed...
}

module.exports = new AIService();