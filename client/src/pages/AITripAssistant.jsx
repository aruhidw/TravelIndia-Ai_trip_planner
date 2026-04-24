import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const [infoMessage, setInfoMessage] = useState('');  // ← Only ONE declaration, inside component
  const [generatedItinerary, setGeneratedItinerary] = useState(null);
  const [tripId, setTripId] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setInfoMessage('');  // Clear info message when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfoMessage('');
    setGeneratedItinerary(null);

    try {
      console.log('🔄 Generating itinerary (this may take 30-45 seconds)...');
      
      setInfoMessage('Hey hey ! i am preparing... This may take 30-45 seconds for detailed itineraries');
      
      const response = await aiAPI.generateItinerary({
        destination: formData.destination,
        state: formData.state,
        homeLocation: formData.homeLocation
      });

      console.log('✅ Backend response:', response);
      
      if (response.success) {
        setInfoMessage('✅ Itinerary generated successfully!');
        setGeneratedItinerary(response.itinerary);
        setTripId(response.tripId);
        
        setTimeout(() => setInfoMessage(''), 2000);
      } else {
        setError(response.error || 'Failed to generate itinerary');
        setInfoMessage('');
      }
    } catch (err) {
      console.error('❌ Request error:', err);
      
      if (err.message?.includes('timeout') || err.code === 'ECONNABORTED') {
        setInfoMessage('⏳ Still generating... Check "My Trips" in a moment');
      } else {
        setError(err.error || 'Network error. Check if backend is running.');
        setInfoMessage('');
      }
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
      homeLocation: 'Delhi'  // ← Added default home location
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            AI Trip Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get a complete personalized travel itinerary for any destination in India
          </p>
        </div>

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

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!isAuthenticated && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-700">
                🔐 Please <a href="/login" className="font-semibold underline">login</a> or <a href="/register" className="font-semibold underline">register</a> to use the AI Trip Assistant
              </p>
            </div>
          )}

          {/* GREEN INFO MESSAGE */}
          {infoMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700 flex items-center">
                <span className="text-xl mr-3">🤖</span>
                {infoMessage}
              </p>
            </div>
          )}

          {/* RED ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 flex items-center">
                <span className="text-xl mr-3">❌</span>
                {error}
              </p>
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

        {generatedItinerary && (
          <div className="mt-12 space-y-6 fade-in">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-700">
                ✅ Itinerary generated successfully! 
                <Link to={`/itinerary/${tripId}`} className="font-semibold underline ml-2">
                  View full itinerary details →
                </Link>
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your {formData.destination} Itinerary Preview
              </h2>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {generatedItinerary.overview}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3 text-blue-800">📍 Top Places to Visit</h3>
                  <ul className="space-y-2">
                    {generatedItinerary.places?.slice(0, 4).map((place, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{place}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3 text-green-800">💰 Estimated Cost</h3>
                  <p className="text-gray-700">{generatedItinerary.estimatedCost}</p>
                  
                  <h3 className="font-semibold text-lg mb-3 mt-4 text-green-800">🌤️ Best Time to Visit</h3>
                  <p className="text-gray-700">{generatedItinerary.bestTime}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center space-x-4">
                <Link 
                  to={`/itinerary/${tripId}`}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  View Complete Itinerary →
                </Link>
                <button
                  onClick={() => {
                    setFormData({ destination: '', state: '', homeLocation: '' });
                    setGeneratedItinerary(null);
                    setTripId(null);
                    setInfoMessage('');
                    setError('');
                  }}
                  className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  Plan Another Trip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITripAssistant;