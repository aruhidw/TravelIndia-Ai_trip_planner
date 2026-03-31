import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { aiAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AITripAssistant = () => {
  const [formData, setFormData] = useState({
    destination: '',
    state: '',
    homeLocation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

// In AITripAssistant.jsx handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    console.log('🔄 Generating itinerary...');
    const response = await aiAPI.generateItinerary({
      destination: formData.destination,
      state: formData.state,
      homeLocation: formData.homeLocation
    });

    console.log('✅ Backend response:', response);
    
    if (response.success) {
      setGeneratedItinerary(response.itinerary);
      setTripId(response.tripId);
      // Success!
    } else {
      setError(response.error || 'Failed to generate itinerary');
    }
  } catch (err) {
    console.error('❌ Request error:', err);
    setError(err.error || 'Network error. Check if backend is running.');
  } finally {
    setLoading(false);
  }
};

  const popularDestinations = [
    { name: 'Goa', state: 'Goa' },
    { name: 'Manali', state: 'Himachal Pradesh' },
    { name: 'Jaipur', state: 'Rajasthan' },
    { name: 'Kerala', state: 'Kerala' },
    { name: 'Shimla', state: 'Himachal Pradesh' },
    { name: 'Darjeeling', state: 'West Bengal' },
    { name: 'Rishikesh', state: 'Uttarakhand' },
    { name: 'Varanasi', state: 'Uttar Pradesh' }
  ];

  const fillExample = (destination, state) => {
    setFormData({
      destination,
      state,
      homeLocation: 'Delhi'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            AI Trip Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get a complete personalized travel itinerary for any destination in India
          </p>
        </div>

        {/* Quick Destinations */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            Quick Pick Popular Destinations:
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularDestinations.map((dest, index) => (
              <button
                key={index}
                onClick={() => fillExample(dest.name, dest.state)}
                className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                {dest.name}, {dest.state}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!isAuthenticated && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-700">
                🔐 Please <a href="/login" className="font-semibold underline">login</a> or <a href="/register" className="font-semibold underline">register</a> to use the AI Trip Assistant
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                🏝️ Destination in India
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g., Goa, Manali, Jaipur, Kerala..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                required
                disabled={!isAuthenticated}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                🗺️ State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g., Goa, Himachal Pradesh, Rajasthan..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                required
                disabled={!isAuthenticated}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                🏠 Your Home Location
              </label>
              <input
                type="text"
                name="homeLocation"
                value={formData.homeLocation}
                onChange={handleChange}
                placeholder="e.g., Delhi, Mumbai, Bangalore, Kolkata..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                required
                disabled={!isAuthenticated}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !isAuthenticated}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="small" text="" />
                  <span className="ml-3">Generating Your Itinerary...</span>
                </div>
              ) : (
                '🚀 Generate AI Itinerary'
              )}
            </button>
          </form>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">🌄</span>
              </div>
              <h3 className="font-semibold text-gray-800">Complete Itinerary</h3>
              <p className="text-gray-600 text-sm">Day-by-day travel plan</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-800">Cost Estimates</h3>
              <p className="text-gray-600 text-sm">Budget planning included</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">🏨</span>
              </div>
              <h3 className="font-semibold text-gray-800">Hotel & Food</h3>
              <p className="text-gray-600 text-sm">Best stays & local cuisine</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITripAssistant;