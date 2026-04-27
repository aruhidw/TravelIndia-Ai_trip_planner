const express = require('express');
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Trip = require('../models/Trip');
const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard stats
router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrips = await Trip.countDocuments();
    const activeUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    
    // Popular destinations
    const popularDestinations = await Trip.aggregate([
      { $group: { _id: '$destination', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $project: { destination: '$_id', count: 1, _id: 0 } }
    ]);
    
    // Recent trips
    const recentTrips = await Trip.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'username');
    
    res.json({
      success: true,
      stats: {
        totalUsers,
        totalTrips,
        activeUsers,
        popularDestinations,
        recentTrips: recentTrips.map(trip => ({
          destination: trip.destination,
          user: trip.user.username,
          date: trip.createdAt.toISOString().split('T')[0]
        }))
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch admin data'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users (admin only)
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const tripsCount = await Trip.aggregate([
      { $group: { _id: '$user', count: { $sum: 1 } } }
    ]);
    
    const usersWithTripCount = users.map(user => ({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      joined: user.createdAt.toISOString().split('T')[0],
      tripCount: tripsCount.find(t => t._id.toString() === user._id.toString())?.count || 0
    }));
    
    res.json({
      success: true,
      users: usersWithTripCount
    });
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

module.exports = router;