const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Trip = require('../models/Trip');
const { auth } = require('../middleware/auth');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate itinerary with AI
router.post('/generate-itinerary', auth, async (req, res) => {
    try {
        const { destination, state, homeLocation } = req.body;
        const userId = req.user._id;

        if (!destination || !state || !homeLocation) {
            return res.status(400).json({
                success: false,
                error: 'Destination, state, and home location are required'
            });
        }

        console.log(`🤖 Generating AI itinerary for ${destination}, ${state} from ${homeLocation}`);

        // Generate itinerary with AI
        const itinerary = await generateAIItinerary(destination, state, homeLocation);

        // Save trip to database
        const trip = new Trip({
            userId,
            destination,
            state,
            homeLocation,
            itinerary
        });

        await trip.save();

        // Add trip to user's saved trips
        await User.findByIdAndUpdate(userId, {
            $push: { savedTrips: trip._id }
        });

        res.json({
            success: true,
            tripId: trip._id,
            itinerary,
            message: 'AI itinerary generated successfully!'
        });

    } catch (error) {
        console.error('AI itinerary error:', error);
        
        // Fallback to predefined itinerary
        const fallbackItinerary = generateFallbackItinerary(
            req.body.destination, 
            req.body.state, 
            req.body.homeLocation
        );

        res.json({
            success: true,
            tripId: 'fallback_' + Date.now(),
            itinerary: fallbackItinerary,
            message: 'Itinerary generated (fallback mode)'
        });
    }
});

// AI Itinerary Generation
async function generateAIItinerary(destination, state, homeLocation) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        As an expert travel planner for India, create a detailed itinerary for ${destination}, ${state} 
        for a traveler from ${homeLocation}. Provide comprehensive information in JSON format:

        {
            "overview": "2-3 paragraph description highlighting key attractions and experiences",
            "bestTime": "Best months to visit with specific reasons",
            "places": ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5"],
            "hotels": [
                {"name": "Budget Hotel Name", "priceRange": "₹800-1500", "rating": 4.0},
                {"name": "Mid-range Hotel", "priceRange": "₹1500-3000", "rating": 4.3},
                {"name": "Luxury Option", "priceRange": "₹3000-6000", "rating": 4.5}
            ],
            "food": ["Local Dish 1", "Street Food", "Traditional Cuisine", "Must-try Specialties"],
            "transport": [
                {"type": "Auto Rickshaw", "cost": "₹30-50 per km"},
                {"type": "Taxi", "cost": "₹12-18 per km"},
                {"type": "Local Bus", "cost": "₹10-50 per trip"}
            ],
            "reach": "Detailed travel options from the home location including train, bus, flight options",
            "estimatedCost": "Budget breakdown for 3-5 days including accommodation, food, transport",
            "weather": "Current and seasonal weather information with recommendations",
            "safety": "Important safety tips and precautions for travelers",
            "carry": ["Essential Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
            "documents": ["Document 1", "Document 2", "Document 3"]
        }

        Make it practical, accurate and helpful for Indian travelers. Focus on authentic local experiences.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON from AI response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        throw new Error('Failed to parse AI response');

    } catch (error) {
        console.log('AI failed, using fallback:', error.message);
        return generateFallbackItinerary(destination, state, homeLocation);
    }
}

// Fallback itinerary generator
function generateFallbackItinerary(destination, state, homeLocation) {
    const popularItineraries = {
        'goa': {
            overview: `Goa is India's beach paradise with Portuguese heritage, stunning beaches, and vibrant nightlife. Perfect for both relaxation and adventure seekers from ${homeLocation}.`,
            bestTime: "November to February for perfect beach weather",
            places: ["Calangute Beach", "Baga Beach", "Fort Aguada", "Basilica of Bom Jesus", "Anjuna Flea Market"],
            hotels: [
                {name: "Beachside Resort", priceRange: "₹2000-4000", rating: 4.3},
                {name: "Budget Guesthouse", priceRange: "₹800-1500", rating: 4.0},
                {name: "Luxury Hotel", priceRange: "₹5000-8000", rating: 4.5}
            ],
            food: ["Fish Curry Rice", "Pork Vindaloo", "Bebinca", "Goan Sausages"],
            transport: [
                {type: "Bike Rental", cost: "₹300-500 per day"},
                {type: "Taxi", cost: "₹15-20 per km"},
                {type: "Local Bus", cost: "₹20-100 per trip"}
            ],
            reach: `From ${homeLocation}, you can take direct flights (2 hours from Delhi) or trains (24 hours). Multiple travel options available.`,
            estimatedCost: "₹8000-12000 for 4 days including stay, food and activities",
            weather: "Tropical climate, hot and humid. Winter months are most pleasant for beach activities.",
            safety: "Beach safety important. Avoid swimming in rough seas. Keep valuables secure.",
            carry: ["Beachwear", "Sunscreen", "Swimwear", "Light cotton clothes", "Mosquito repellent"],
            documents: ["ID Proof", "Hotel confirmation", "Travel tickets"]
        },
        'manali': {
            overview: `Manali is a beautiful hill station in the Himalayas with snow-capped mountains, adventure sports, and serene landscapes. Perfect mountain escape for travelers from ${homeLocation}.`,
            bestTime: "March to June & September to December",
            places: ["Hadimba Temple", "Solang Valley", "Rohtang Pass", "Old Manali", "Jogini Falls"],
            hotels: [
                {name: "Mountain Resort", priceRange: "₹1500-3000", rating: 4.2},
                {name: "Cozy Cottage", priceRange: "₹800-1500", rating: 4.1},
                {name: "Luxury Stay", priceRange: "₹3000-6000", rating: 4.4}
            ],
            food: ["Siddu", "Thenthuk", "Babru", "Tibetan Momos", "Local Trout"],
            transport: [
                {type: "Taxi", cost: "₹12-15 per km"},
                {type: "Local Cab", cost: "₹2000-3000 per day"},
                {type: "Walking", cost: "Free (best for local exploration)"}
            ],
            reach: `From ${homeLocation}, take train to Chandigarh then cab to Manali, or direct buses available.`,
            estimatedCost: "₹6000-10000 for 3 days including adventure activities",
            weather: "Cold climate. Snow in winter. Pleasant in summer. Carry woolens always.",
            safety: "Mountain safety important. Follow guide instructions for adventure sports.",
            carry: ["Woolen clothes", "Thermals", "Good shoes", "Medicines", "Sunglasses"],
            documents: ["ID Proof", "Hotel bookings", "Travel tickets", "Medical insurance"]
        }
    };

    const key = destination.toLowerCase();
    return popularItineraries[key] || generateGenericItinerary(destination, state, homeLocation);
}

function generateGenericItinerary(destination, state, homeLocation) {
    return {
        overview: `${destination} in ${state} is a beautiful destination with rich cultural heritage and amazing experiences. Perfect for travelers from ${homeLocation} seeking authentic Indian experiences.`,
        bestTime: "October to March for pleasant weather conditions",
        places: [
            "Main City Center & Markets",
            "Historical & Cultural Sites", 
            "Natural Attractions & Parks",
            "Local Temples & Monuments",
            "Shopping & Food Streets"
        ],
        hotels: [
            {name: "Budget Hotel", priceRange: "₹800-1500", rating: 4.0},
            {name: "Comfort Stay", priceRange: "₹1500-3000", rating: 4.2},
            {name: "Luxury Resort", priceRange: "₹3000-6000", rating: 4.5}
        ],
        food: [
            "Local Cuisine Specialties",
            "Traditional Street Food", 
            "Famous Restaurant Dishes",
            "Regional Sweet Delicacies"
        ],
        transport: [
            {type: "Auto Rickshaw", cost: "₹30-50 per km"},
            {type: "Taxi", cost: "₹12-18 per km"},
            {type: "Local Bus", cost: "₹10-50 per trip"}
        ],
        reach: `From ${homeLocation} by train, bus or flight to nearest major city, then local transport to ${destination}.`,
        estimatedCost: "₹5000-8000 for 3 days (budget travel with basic amenities)",
        weather: "Generally pleasant during tourist season. Check forecast before travel.",
        safety: "Standard travel precautions advised. Keep valuables secure. Emergency: 112",
        carry: [
            "Valid Government ID",
            "Essential Medicines", 
            "Comfortable Walking Shoes",
            "Weather-appropriate Clothing",
            "Power Bank"
        ],
        documents: [
            "Government ID (Aadhar/Driving License)",
            "Travel Tickets & Bookings", 
            "Hotel Reservation Confirmations"
        ]
    };
}

module.exports = router;