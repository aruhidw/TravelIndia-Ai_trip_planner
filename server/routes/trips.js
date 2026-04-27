const express = require('express');
const { protect } = require('../middleware/auth');
const Trip = require('../models/Trip');
const router = express.Router();

// @route   GET /api/trips/my-trips
router.get('/my-trips', protect, async (req, res) => {
  try {
    console.log(`📝 Fetching trips for user: ${req.user._id}`);
    
    const trips = await Trip.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${trips.length} trips`);
    
    res.json({
      success: true,
      trips: trips.map(trip => ({
        id: trip._id,
        destination: trip.destination,
        state: trip.state,
        homeLocation: trip.homeLocation,
        itinerary: trip.itinerary,
        createdAt: trip.createdAt
      }))
    });
  } catch (error) {
    console.error('❌ Fetch trips error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch trips'
    });
  }
});

// @route   GET /api/trips/:tripId
router.get('/:tripId', protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }
    
    // Check if user owns the trip
    if (trip.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to view this trip'
      });
    }
    
    res.json({
      success: true,
      trip: {
        id: trip._id,
        destination: trip.destination,
        state: trip.state,
        homeLocation: trip.homeLocation,
        itinerary: trip.itinerary,
        createdAt: trip.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Fetch trip error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch trip'
    });
  }
});

// @route   DELETE /api/trips/:tripId
router.delete('/:tripId', protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }
    
    if (trip.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this trip'
      });
    }
    
    await trip.deleteOne();
    
    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete trip error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to delete trip'
    });
  }
});

module.exports = router;