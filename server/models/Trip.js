const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  type: String,
  cost: String
});

const hotelSchema = new mongoose.Schema({
  name: String,
  priceRange: String,
  rating: Number
});

const cachedItinerarySchema = new mongoose.Schema({
  destination: { type: String, required: true, index: true },
  state: { type: String, required: true },
  homeLocation: { type: String, required: true, index: true },
  itinerary: {
    overview: String,
    bestTime: String,
    places: [String],
    hotels: [hotelSchema],
    food: [String],
    transport: [transportSchema],
    reach: String,
    estimatedCost: String,
    weather: String,
    safety: String,
    carry: [String],
    documents: [String]
  },
  createdAt: { type: Date, default: Date.now, expires: 2592000 } // auto delete after 30 days (optional)
});

module.exports = mongoose.model('CachedItinerary', cachedItinerarySchema);