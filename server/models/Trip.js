const mongoose = require('mongoose');

// Define sub-schemas for better organization
const hotelSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  priceRange: { type: String, default: '' },
  rating: { type: Number, default: 0 }
}, { _id: false });

const transportSchema = new mongoose.Schema({
  type: { type: String, default: '' },
  cost: { type: String, default: '' }
}, { _id: false });

const itinerarySchema = new mongoose.Schema({
  overview: { type: String, default: '' },
  bestTime: { type: String, default: '' },
  places: [{ type: String }],
  hotels: [hotelSchema],
  food: [{ type: String }],
  transport: [transportSchema],
  reach: { type: String, default: '' },
  estimatedCost: { type: String, default: '' },
  weather: { type: String, default: '' },
  safety: { type: String, default: '' },
  carry: [{ type: String }],
  documents: [{ type: String }]
}, { _id: false });

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  homeLocation: {
    type: String,
    required: [true, 'Home location is required'],
    trim: true
  },
  itinerary: {
    type: itinerarySchema,
    required: true,
    default: () => ({}) // Empty default object
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Add an index for faster queries
tripSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Trip', tripSchema);