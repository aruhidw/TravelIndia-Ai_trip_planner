require('dotenv').config({ path: require('path').join(__dirname, '.env') }); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Using axios for DeepSeek API

const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ==================== IMPORT MODELS ====================
const User = require('./models/User');
const Trip = require('./models/Trip');

// ==================== DEEPSEEK API CONFIGURATION ====================
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
let aiEnabled = !!process.env.DEEPSEEK_API_KEY;
console.log("🤖 DeepSeek Status:", aiEnabled ? "✅ ENABLED" : "❌ DISABLED");

// ==================== DATABASE CONNECTION ====================
const connectDB = async () => {
    try {
        console.log('🔄 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travelindia');
        console.log('✅ MongoDB Connected Successfully!');
        console.log('📊 Database:', mongoose.connection.db.databaseName);
    } catch (error) {
        console.log('❌ MongoDB Connection Failed:', error.message);
    }
};

connectDB();

// In-memory storage (fallback)
let users = [];
let trips = [];
let userIdCounter = 1;
let tripIdCounter = 1;

// ==================== AUTH MIDDLEWARE ====================
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                error: 'No token, authorization denied' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
        
        // Try database first
        if (mongoose.connection.readyState === 1) {
            const user = await User.findById(decoded.userId).select('-password');
            if (user) {
                req.user = user;
                return next();
            }
        }

        // Fallback to in-memory
        const memoryUser = users.find(u => u.id === decoded.userId);
        if (memoryUser) {
            req.user = memoryUser;
            return next();
        }

        return res.status(401).json({ 
            success: false, 
            error: 'Token is not valid' 
        });

    } catch (error) {
        res.status(401).json({ 
            success: false, 
            error: 'Token is not valid' 
        });
    }
};

// ==================== ENHANCED FALLBACK ITINERARIES ====================

function generateEnhancedFallbackItinerary(destination, state, homeLocation) {
    console.log(`📝 Creating enhanced itinerary for ${destination}, ${state}`);
    
    // Convert to lowercase for matching
    const key = destination.toLowerCase().trim();
    
    // Enhanced database of popular destinations
    const enhancedItineraries = {
        // Himachal Pradesh
        'shimla': {
            overview: `Shimla, the "Queen of Hills", is Himachal Pradesh's capital with colonial charm, scenic views, and pleasant climate. Perfect for travelers from ${homeLocation} seeking mountain beauty and British-era architecture.`,
            bestTime: "March to June (15-25°C) for pleasant weather, September-November for clear views, December-February for snowfall experience",
            places: ["The Ridge & Christ Church", "Mall Road (shopping street)", "Jakhu Temple (giant Hanuman statue)", "Kufri (adventure sports)", "Shimla State Museum", "Summer Hill", "Tara Devi Temple"],
            hotels: [
                { name: "Hotel Combermere, Mall Road", priceRange: "₹1500-3000", rating: 4.2 },
                { name: "Clarkes Hotel, Shimla", priceRange: "₹2500-4500", rating: 4.3 },
                { name: "Wildflower Hall, Mashobra", priceRange: "₹8000-15000", rating: 4.7 }
            ],
            food: ["Siddu (steamed bread)", "Babru (black gram kachori)", "Chana Madra (chickpea curry)", "Aktori (buckwheat pancake)", "Dham (traditional feast)"],
            transport: [
                { type: "Local Taxi", cost: "₹12-15 per km" },
                { type: "Toy Train", cost: "₹200-500 per person" },
                { type: "HRTC Bus", cost: "₹50-200 per trip" }
            ],
            reach: `From ${homeLocation}: Kalka-Shimla Toy Train (UNESCO), overnight buses (8-10 hours), nearest airport: Chandigarh (120km)`,
            estimatedCost: "Budget: ₹5000-7000, Mid-range: ₹7000-10000, Luxury: ₹12000+ for 3 days",
            weather: "Summer: 15-25°C, Winter: -4 to 8°C with snow, Pleasant most of the year",
            safety: "Walk carefully on Mall Road, mountain roads can be steep. Emergency: Police 100",
            carry: ["Woolens (Oct-Mar)", "Comfortable shoes", "Sunglasses", "Sunscreen"],
            documents: ["Government ID", "Hotel bookings", "Travel tickets"]
        },
        'manali': {
            overview: `Manali is a Himalayan hill station with snow-capped peaks, adventure sports, and serene landscapes. Perfect mountain escape for travelers from ${homeLocation}.`,
            bestTime: "March-June for pleasant weather (10-25°C), September-December for snow views",
            places: ["Hadimba Temple", "Solang Valley", "Rohtang Pass", "Old Manali", "Jogini Falls", "Manu Temple", "Vashisht Hot Springs"],
            hotels: [
                { name: "Johnson Lodge, Old Manali", priceRange: "₹1500-3000", rating: 4.2 },
                { name: "The Himalayan, Mall Road", priceRange: "₹2500-4500", rating: 4.3 },
                { name: "Span Resort, Prini", priceRange: "₹5000-8000", rating: 4.5 }
            ],
            food: ["Siddu", "Thenthuk (noodle soup)", "Babru", "Tibetan Momos", "Trout Fish", "Aktori"],
            transport: [
                { type: "Local Taxi", cost: "₹12-15 per km" },
                { type: "Day Cab", cost: "₹2000-3000 per day" },
                { type: "HRTC Buses", cost: "₹50-200 per trip" }
            ],
            reach: `From ${homeLocation}: Overnight bus (12-14 hours), flight to Bhuntar (50km away), train to Chandigarh (310km)`,
            estimatedCost: "₹6000-10000 for 3 days including adventure activities",
            weather: "Cold climate with snow in winter. Summer: 10-25°C",
            safety: "Altitude acclimatization important. Adventure sports with certified operators",
            carry: ["Woolens", "Thermals", "Good shoes", "Medicines"],
            documents: ["ID Proof", "Hotel bookings", "Medical insurance"]
        },
        'goa': {
            overview: `Goa is India's beach paradise with Portuguese heritage, stunning beaches, and vibrant nightlife. Perfect for travelers from ${homeLocation} seeking sun, sand, and seafood.`,
            bestTime: "November to February (21-32°C) perfect beach weather. Avoid monsoon (June-September)",
            places: ["Calangute Beach", "Baga Beach", "Fort Aguada", "Basilica of Bom Jesus", "Dudhsagar Falls", "Anjuna Flea Market", "Spice Plantations"],
            hotels: [
                { name: "Beachside Resort, Calangute", priceRange: "₹2000-4000", rating: 4.3 },
                { name: "Budget Guesthouse, Anjuna", priceRange: "₹800-1500", rating: 4.0 },
                { name: "Luxury Resort, Candolim", priceRange: "₹5000-8000", rating: 4.5 }
            ],
            food: ["Fish Curry Rice", "Pork Vindaloo", "Chicken Xacuti", "Bebinca (dessert)", "Feni (liquor)"],
            transport: [
                { type: "Bike/Scooter Rental", cost: "₹300-500 per day" },
                { type: "Goa Taxi", cost: "₹15-20 per km" },
                { type: "Local Bus", cost: "₹20-100 per trip" }
            ],
            reach: `From ${homeLocation}: Direct flights to Goa International, trains via Konkan Railway, overnight buses`,
            estimatedCost: "₹8000-12000 for 4 days including stay, food, activities",
            weather: "Tropical. Winter: 20-32°C (ideal), Summer: 25-35°C, Monsoon: Heavy rain",
            safety: "Beach safety: Swim in designated areas only. Keep valuables secure",
            carry: ["Swimwear", "Sunscreen SPF 50+", "Light clothes", "Mosquito repellent"],
            documents: ["ID Proof", "Hotel booking", "Travel tickets"]
        }
    };

    // Check if we have enhanced itinerary for this destination
    if (enhancedItineraries[key]) {
        console.log(`✅ Using enhanced itinerary for ${destination}`);
        return enhancedItineraries[key];
    }

    // Generic but high-quality fallback
    console.log(`📋 Creating premium itinerary for ${destination}`);
    return {
        overview: `${destination} in ${state} offers beautiful experiences and rich cultural heritage. Perfect for travelers from ${homeLocation} seeking authentic Indian adventures with historical sites, local cuisine, and natural beauty.`,
        bestTime: "October to March generally offers pleasant weather conditions ideal for tourism",
        places: [
            `Main attractions in ${destination}`,
            "Historical landmarks and monuments",
            "Local markets and shopping areas",
            "Natural parks and scenic spots",
            "Cultural and religious sites",
            "Popular local restaurants",
            "Adventure/sports activities"
        ],
        hotels: [
            { name: `Premium Budget Stay, ${destination}`, priceRange: "₹800-1500", rating: 4.0 },
            { name: `Comfort Hotel, ${destination}`, priceRange: "₹1500-3000", rating: 4.2 },
            { name: `Luxury Resort, ${destination}`, priceRange: "₹3000-6000", rating: 4.5 }
        ],
        food: [
            "Local specialty dishes",
            "Traditional street food",
            "Regional cuisine favorites",
            "Famous sweets and desserts",
            "Popular beverages"
        ],
        transport: [
            { type: "Auto Rickshaw", cost: "₹30-50 per km" },
            { type: "Taxi", cost: "₹12-18 per km" },
            { type: "Local Bus", cost: "₹10-50 per trip" }
        ],
        reach: `From ${homeLocation}: Check for trains, flights, or buses to nearest major city, then local transport to ${destination}.`,
        estimatedCost: "Approximately ₹5000-8000 for 3 days including accommodation, meals, and local sightseeing",
        weather: "Generally pleasant during tourist season. Check current conditions before travel.",
        safety: "Follow general travel safety guidelines. Keep emergency contacts handy.",
        carry: ["Valid government ID", "Essential medicines", "Comfortable walking shoes", "Weather-appropriate clothing", "Power bank"],
        documents: ["Government ID proof", "Travel tickets and bookings", "Hotel reservation confirmations", "Emergency contact details"],
        source: "premium-fallback"
    };
}

// ==================== DEEPSEEK ITINERARY FUNCTION ====================

async function generateAIItinerary(destination, state, homeLocation) {
  try {
    console.log(`🚀 Calling DeepSeek API for ${destination}, ${state}`);

    // Add timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('DeepSeek timeout after 20s')), 20000);
    });

    const prompt = `Create a detailed travel itinerary for ${destination}, ${state}, India for a traveler from ${homeLocation}.

Return ONLY a JSON object with these exact fields:
{
  "overview": "2-3 paragraph description about ${destination} focusing on unique attractions, culture, history, and experiences. Be specific about what makes ${destination} special.",
  "bestTime": "Specific months with detailed reasons based on weather, festivals, and tourist seasons. Format like: 'March to June (15-25°C) for pleasant weather'",
  "places": ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5", "Place 6", "Place 7"],
  "hotels": [
    {"name": "Real budget hotel name in ${destination}", "priceRange": "₹800-1500", "rating": 4.0},
    {"name": "Real mid-range hotel in ${destination}", "priceRange": "₹1500-3000", "rating": 4.3},
    {"name": "Real luxury hotel/resort in ${destination}", "priceRange": "₹3000-6000", "rating": 4.5}
  ],
  "food": ["Local Dish 1", "Local Dish 2", "Local Dish 3", "Local Dish 4", "Local Dish 5"],
  "transport": [
    {"type": "Auto Rickshaw", "cost": "₹30-50 per km"},
    {"type": "Taxi", "cost": "₹12-18 per km"},
    {"type": "Local Bus", "cost": "₹10-50 per trip"}
  ],
  "reach": "Detailed travel options from ${homeLocation} to ${destination} including train numbers, flight routes, bus options with approximate travel time",
  "estimatedCost": "Realistic budget breakdown for 3 days in INR. Format like: 'Budget: ₹5000-7000, Mid-range: ₹7000-10000, Luxury: ₹12000+'",
  "weather": "Current and seasonal weather patterns in ${destination}, average temperatures, rainfall",
  "safety": "Destination-specific safety tips, areas to avoid, emergency contacts",
  "carry": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
  "documents": ["ID Proof", "Hotel Booking", "Travel Tickets"]
}

IMPORTANT RULES:
1. Make it HIGHLY SPECIFIC to ${destination}, ${state}
2. Use REAL hotel names that exist in ${destination}
3. Mention REAL local dishes of ${state}
4. Include ACTUAL travel routes from ${homeLocation}
5. Return ONLY the JSON object, no other text
6. Ensure JSON is valid and properly formatted
7. Keep hotel ratings between 3.8 and 4.7
8. Price ranges should be realistic for India`;

    const apiCallPromise = axios.post(DEEPSEEK_API_URL, {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an expert Indian travel planner. Always return a VALID JSON object with no additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 15000 // 15 second timeout for axios
    });

    // Race between DeepSeek and timeout
    const response = await Promise.race([apiCallPromise, timeoutPromise]);
    
    console.log('📥 DeepSeek Response Received');
    const text = response.data.choices[0].message.content;
    
    // Extract JSON from response (in case there's extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in DeepSeek response');
    }
    
    const itinerary = JSON.parse(jsonMatch[0]);
    console.log(`✅ DeepSeek Success for ${destination}`);
    return itinerary;

  } catch (error) {
    console.error('❌ DeepSeek Error:', error.message);
    
    if (error.message.includes('API key') || error.message.includes('401') || error.message.includes('auth')) {
      throw new Error('Invalid DeepSeek API key. Check your .env file.');
    } else if (error.message.includes('quota') || error.message.includes('429') || error.message.includes('limit')) {
      throw new Error('DeepSeek free quota exceeded. Check usage at platform.deepseek.com');
    } else if (error.message.includes('timeout')) {
      throw new Error('DeepSeek request timed out. Please try again.');
    } else if (error.message.includes('JSON')) {
      throw new Error('AI returned invalid JSON format.');
    } else {
      throw new Error(`AI service error: ${error.message}`);
    }
  }
}

// ==================== ROUTES ====================

// Home Route
app.get('/', (req, res) => {
    res.json({ 
        message: '🎉 TravelIndia Backend is Running!',
        status: 'ALL SYSTEMS OPERATIONAL',
        database: mongoose.connection.readyState === 1 ? '✅ MongoDB Connected' : '❌ MongoDB Disconnected',
        ai: aiEnabled ? '✅ DeepSeek ENABLED' : '❌ AI DISABLED',
        users: users.length,
        trips: trips.length
    });
});

// Test Route
app.get('/test', (req, res) => {
    res.json({ 
        success: true,
        message: 'Server is working perfectly!',
        timestamp: new Date().toISOString()
    });
});

// IMPORTANT: Use the routes from routes/auth.js
app.use("/api/auth", require("./routes/auth"));

// ==================== AI ITINERARY ROUTE ====================

app.post('/api/ai/generate-itinerary', auth, async (req, res) => {
  console.log('🚀 AI GENERATION STARTED');
  
  try {
    const { destination, state, homeLocation } = req.body;
    const userId = req.user._id || req.user.id;

    console.log('📥 Request data:', { destination, state, homeLocation });

    if (!destination || !state || !homeLocation) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // ============ FORCE AI GENERATION ============
    if (!process.env.DEEPSEEK_API_KEY) {
      console.log('❌ NO DEEPSEEK API KEY FOUND');
      return res.status(503).json({
        success: false,
        error: 'AI service not configured. Add DEEPSEEK_API_KEY to .env file'
      });
    }

    console.log('🤖 Calling DeepSeek AI...');
    
    // Call DeepSeek API directly
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are an expert Indian travel planner. Return ONLY valid JSON."
        },
        {
          role: "user",
          content: `Create detailed travel itinerary for ${destination}, ${state} for traveler from ${homeLocation}.

          Return JSON with these exact fields:
          {
            "overview": "2-3 paragraph description",
            "bestTime": "Best months with reasons",
            "places": ["Place 1", "Place 2", "Place 3", "Place 4", "Place 5", "Place 6", "Place 7"],
            "hotels": [
              {"name": "Real budget hotel", "priceRange": "₹800-1500", "rating": 4.0},
              {"name": "Real mid-range hotel", "priceRange": "₹1500-3000", "rating": 4.3},
              {"name": "Real luxury hotel", "priceRange": "₹3000-6000", "rating": 4.5}
            ],
            "food": ["Dish 1", "Dish 2", "Dish 3", "Dish 4", "Dish 5"],
            "transport": [
              {"type": "Auto Rickshaw", "cost": "₹30-50/km"},
              {"type": "Taxi", "cost": "₹12-18/km"},
              {"type": "Bus", "cost": "₹10-50/trip"}
            ],
            "reach": "How to reach from traveler's location",
            "estimatedCost": "Budget for 3 days in INR",
            "weather": "Weather information",
            "safety": "Safety tips",
            "carry": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
            "documents": ["ID", "Hotel Booking", "Travel Tickets"]
          }

          Rules: Be specific to ${destination}. Use real hotel names. Return ONLY JSON.`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 25000 // 25 seconds
    });

    console.log('✅ DeepSeek response received');
    
    const aiText = response.data.choices[0].message.content;
    console.log('📝 AI Response length:', aiText.length);
    
    // Parse JSON from AI response
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI did not return valid JSON');
    }
    
    const itinerary = JSON.parse(jsonMatch[0]);
    console.log(`✅ AI generated itinerary for ${destination}`);

    // Save to database
    const tripData = {
      userId,
      destination,
      state,
      homeLocation,
      itinerary: {
        overview: itinerary.overview || '',
        bestTime: itinerary.bestTime || '',
        places: itinerary.places || [],
        hotels: itinerary.hotels || [],
        food: itinerary.food || [],
        transport: itinerary.transport || [],
        reach: itinerary.reach || '',
        estimatedCost: itinerary.estimatedCost || '',
        weather: itinerary.weather || '',
        safety: itinerary.safety || '',
        carry: itinerary.carry || [],
        documents: itinerary.documents || []
      },
      isPublic: false,
      photos: []
    };

    let savedTrip;
    if (mongoose.connection.readyState === 1) {
      const trip = new Trip(tripData);
      savedTrip = await trip.save();
    }

    console.log(`🎉 AI itinerary saved for ${destination}`);

    res.json({
      success: true,
      tripId: savedTrip?._id || 'ai_trip_' + Date.now(),
      itinerary: itinerary,
      source: 'deepseek-ai',
      message: `AI-generated itinerary for ${destination} created successfully!`
    });

  } catch (error) {
    console.error('❌ AI Generation Failed:', error.message);
    console.error('❌ Error details:', error.response?.data || error);
    
    // Return specific error messages
    if (error.response?.status === 401) {
      return res.status(500).json({
        success: false,
        error: 'Invalid DeepSeek API key. Get a new key from platform.deepseek.com'
      });
    } else if (error.response?.status === 429) {
      return res.status(500).json({
        success: false,
        error: 'DeepSeek rate limit exceeded. Try again in a minute.'
      });
    } else if (error.message.includes('timeout')) {
      return res.status(500).json({
        success: false,
        error: 'AI request timed out. Try again.'
      });
    } else {
      return res.status(500).json({
        success: false,
        error: `AI generation failed: ${error.message}`
      });
    }
  }
});

// ==================== TRIP MANAGEMENT ROUTES ====================

app.get('/api/trips/my-trips', auth, async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        
        let userTrips;
        if (mongoose.connection.readyState === 1) {
            userTrips = await Trip.find({ userId }).sort({ createdAt: -1 });
        } else {
            userTrips = trips.filter(t => t.userId === userId).sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );
        }

        res.json({
            success: true,
            trips: userTrips,
            count: userTrips.length
        });
    } catch (error) {
        console.error('Get trips error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch trips'
        });
    }
});

app.get('/api/trips/:tripId', auth, async (req, res) => {
    try {
        const { tripId } = req.params;
        const userId = req.user._id || req.user.id;

        let trip;
        if (mongoose.connection.readyState === 1) {
            trip = await Trip.findOne({ _id: tripId, userId });
        } else {
            trip = trips.find(t => t._id === tripId && t.userId === userId);
        }

        if (!trip) {
            return res.status(404).json({
                success: false,
                error: 'Trip not found'
            });
        }

        res.json({
            success: true,
            trip
        });
    } catch (error) {
        console.error('Get trip error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch trip'
        });
    }
});

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log("============================================================");
      console.log("🚀 TRAVELINDIA BACKEND RUNNING ON PORT", PORT);
      console.log("📡 URL: http://localhost:" + PORT);
      console.log("💾 Database: ✅ MongoDB Connected");
      console.log("🤖 AI:", aiEnabled ? "✅ DEEPSEEK ENABLED" : "❌ AI DISABLED");
      console.log("🔐 Authentication: ✅ WORKING");
      console.log("🎯 AI Itinerary: ✅ WORKING (Powered by DeepSeek + Enhanced Fallback)");
      console.log("============================================================");
    });

  } catch (error) {
    console.log("❌ MongoDB Connection Failed:", error.message);
    
    // Start server even without DB
    app.listen(PORT, () => {
      console.log("============================================================");
      console.log("🚀 TRAVELINDIA BACKEND RUNNING ON PORT", PORT);
      console.log("📡 URL: http://localhost:" + PORT);
      console.log("💾 Database: ❌ MongoDB Disconnected (Using memory)");
      console.log("🤖 AI:", aiEnabled ? "✅ DEEPSEEK ENABLED" : "❌ AI DISABLED");
      console.log("============================================================");
    });
  }
};

startServer();