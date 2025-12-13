// routes/trips.js

const express = require('express');
const Trip = require('../models/Trip');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get all trips for current user
router.get('/my-trips', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const trips = await Trip.find({ userId }).sort({ createdAt: -1 });
        
        res.json({
            success: true,
            trips,
            count: trips.length
        });
    } catch (error) {
        console.error('Get trips error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch trips'
        });
    }
});

// Get single trip by ID
router.get('/:tripId', auth, async (req, res) => {
    try {
        const { tripId } = req.params;
        const userId = req.user._id;
        
        const trip = await Trip.findOne({ _id: tripId, userId });
        
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

// Delete trip
router.delete('/:tripId', auth, async (req, res) => {
    try {
        const { tripId } = req.params;
        const userId = req.user._id;
        
        const trip = await Trip.findOneAndDelete({ _id: tripId, userId });
        
        if (!trip) {
            return res.status(404).json({
                success: false,
                error: 'Trip not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Trip deleted successfully'
        });
    } catch (error) {
        console.error('Delete trip error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete trip'
        });
    }
});

// Get public trips
router.get('/public', async (req, res) => {
    try {
        const trips = await Trip.find({ isPublic: true })
            .sort({ createdAt: -1 })
            .limit(20)
            .populate('userId', 'username email');
            
        res.json({
            success: true,
            trips,
            count: trips.length
        });
    } catch (error) {
        console.error('Get public trips error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch public trips'
        });
    }
});

// Save AI-generated trip
router.post('/ai-save', auth, async (req, res) => {
    try {
        const { destination, state, homeLocation, itinerary } = req.body;
        const userId = req.user._id;
        
        const trip = new Trip({
            userId,
            destination,
            state,
            homeLocation,
            itinerary,
            source: 'ai-generated'
        });
        
        await trip.save();
        
        res.json({
            success: true,
            tripId: trip._id,
            message: 'Trip saved successfully'
        });
    } catch (error) {
        console.error('Save AI trip error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save trip'
        });
    }
});

module.exports = router;