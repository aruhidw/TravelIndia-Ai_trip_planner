import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripsAPI } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const ItineraryPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItinerary();
  }, [tripId]);

  const fetchItinerary = async () => {
    try {
      const response = await tripsAPI.getTrip(tripId);
      if (response.success) {
        setTrip(response.trip);
      } else {
        setError('Itinerary not found');
      }
    } catch (error) {
      console.error('Fetch itinerary error:', error);
      setError('Failed to load itinerary');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItinerary = () => {
    // For now, just show alert. Can be extended to save to user profile
    alert('Itinerary saved to your trips!');
  };

  const handleDownloadPDF = () => {
    alert('PDF download feature coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner text="Loading your itinerary..." />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Itinerary Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested itinerary could not be found.'}</p>
          <button
            onClick={() => navigate('/ai-assistant')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New Itinerary
          </button>
        </div>
      </div>
    );
  }

  const { destination, state, homeLocation, itinerary } = trip;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your {destination} Itinerary
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Traveling from {homeLocation} to {destination}, {state}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSaveItinerary}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              💾 Save Itinerary
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 Download PDF
            </button>
          </div>
        </div>

        {/* Itinerary Sections */}
        <div className="space-y-6">
          {/* Overview */}
          <Section title="🌄 Overview" content={itinerary.overview} />

          {/* Best Time to Visit */}
          <Section title="📅 Best Time to Visit" content={itinerary.bestTime} />

          {/* Places to Visit */}
          <ListSection title="🏛️ Places to Visit" items={itinerary.places} />

          {/* Hotels */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🏨 Hotels & Stays</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {itinerary.hotels.map((hotel, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
                  <h3 className="font-semibold text-gray-800 text-lg">{hotel.name}</h3>
                  <p className="text-gray-600">{hotel.priceRange}</p>
                  <p className="text-yellow-600">⭐ {hotel.rating}/5</p>
                </div>
              ))}
            </div>
          </div>

          {/* Food */}
          <ListSection title="🍛 Local Food to Try" items={itinerary.food} />

          {/* Transport */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🚗 Local Transport</h2>
            <div className="grid gap-3">
              {itinerary.transport.map((transport, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-800">{transport.type}</span>
                  <span className="text-blue-600 font-semibold">{transport.cost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Sections */}
          <Section title="📍 How to Reach" content={itinerary.reach} />
          <Section title="💰 Estimated Cost" content={itinerary.estimatedCost} />
          <Section title="🌤️ Weather Information" content={itinerary.weather} />
          <Section title="🛡️ Safety Tips" content={itinerary.safety} />
          <ListSection title="🎒 What to Carry" items={itinerary.carry} />
          <ListSection title="📄 Documents Required" items={itinerary.documents} />
        </div>

        {/* Action Buttons - Fixed */}
        <div className="fixed bottom-6 right-6 space-x-4">
          <button
            onClick={handleSaveItinerary}
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
          >
            💾 Save
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            📄 PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, content }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 fade-in">
    <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{content}</p>
  </div>
);

// Reusable List Section Component
const ListSection = ({ title, items }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 fade-in">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-500 mr-3 mt-1">•</span>
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ItineraryPage;