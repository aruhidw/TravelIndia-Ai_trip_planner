const express = require('express');
const { protect } = require('../middleware/auth');
const aiService = require('../services/aiService');
const Trip = require('../models/Trip');
const router = express.Router();

// @route   POST /api/ai/generate-itinerary
router.post('/generate-itinerary', protect, async (req, res) => {
  try {
    const { destination, state, homeLocation } = req.body;
    
    console.log(`🎯 Generating itinerary for ${destination}, ${state} from ${homeLocation}`);
    
    // Validate input
    if (!destination || !state || !homeLocation) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: destination, state, homeLocation'
      });
    }
    
    // Generate itinerary using AI service
    const itineraryData = await aiService.generateItinerary(destination, state, homeLocation);
    
    // Validate the itinerary data structure
    if (!itineraryData || typeof itineraryData !== 'object') {
      throw new Error('Invalid itinerary data received from AI service');
    }
    
    // Ensure arrays exist
    itineraryData.places = itineraryData.places || [];
    itineraryData.food = itineraryData.food || [];
    itineraryData.hotels = itineraryData.hotels || [];
    itineraryData.transport = itineraryData.transport || [];
    itineraryData.carry = itineraryData.carry || [];
    itineraryData.documents = itineraryData.documents || [];
    
    // Create and save trip
    const trip = await Trip.create({
      user: req.user._id,
      destination,
      state,
      homeLocation,
      itinerary: itineraryData
    });
    
    console.log(`✅ Itinerary generated and saved with ID: ${trip._id}`);
    
    res.json({
      success: true,
      tripId: trip._id,
      itinerary: itineraryData,
      message: 'Itinerary generated successfully!'
    });
  } catch (error) {
    console.error('❌ Itinerary generation error:', error);
    
    // Send detailed error response
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate itinerary',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;