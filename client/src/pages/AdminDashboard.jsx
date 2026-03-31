import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();

  useEffect(() => {
    fetchAdminData();
  }, [activeTab]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      
      // Simulate API calls - in real app, you'd call your backend
      const mockStats = {
        totalUsers: 1248,
        totalTrips: 5672,
        activeUsers: 893,
        popularDestinations: [
          { destination: 'Goa', count: 1245 },
          { destination: 'Manali', count: 987 },
          { destination: 'Jaipur', count: 756 },
          { destination: 'Kerala', count: 654 },
          { destination: 'Shimla', count: 543 }
        ],
        recentTrips: [
          { destination: 'Goa', user: 'john_doe', date: '2024-01-15' },
          { destination: 'Manali', user: 'jane_smith', date: '2024-01-14' },
          { destination: 'Jaipur', user: 'mike_jones', date: '2024-01-14' }
        ]
      };

      const mockUsers = [
        { id: 1, username: 'john_doe', email: 'john@email.com', tripCount: 5, joined: '2024-01-01' },
        { id: 2, username: 'jane_smith', email: 'jane@email.com', tripCount: 3, joined: '2024-01-02' },
        { id: 3, username: 'mike_jones', email: 'mike@email.com', tripCount: 7, joined: '2024-01-03' },
        { id: 4, username: 'sara_wilson', email: 'sara@email.com', tripCount: 2, joined: '2024-01-04' },
        { id: 5, username: 'alex_brown', email: 'alex@email.com', tripCount: 4, joined: '2024-01-05' }
      ];

      setStats(mockStats);
      setUsers(mockUsers);
    } catch (error) {
      console.error('Admin data error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome, {user?.username}! Manage your TravelIndia platform.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'users'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'analytics'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalUsers}</div>
                <div className="text-gray-600">Total Users</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalTrips}</div>
                <div className="text-gray-600">Trips Generated</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.activeUsers}</div>
                <div className="text-gray-600">Active Users</div>
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Destinations</h2>
              <div className="space-y-3">
                {stats.popularDestinations.map((dest, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-800">{dest.destination}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {dest.count} trips
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Trips</h2>
              <div className="space-y-3">
                {stats.recentTrips.map((trip, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <span className="font-medium text-gray-800">{trip.destination}</span>
                      <span className="text-gray-500 text-sm ml-2">by {trip.user}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{trip.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">User</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Trips</th>
                    <th className="text-left py-3 px-4">Joined</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          {user.username}
                        </div>
                      </td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                          {user.tripCount}
                        </span>
                      </td>
                      <td className="py-3 px-4">{user.joined}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Platform Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">User Growth</h3>
                <p className="text-gray-600 text-sm">+15% growth this month</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Trip Success Rate</h3>
                <p className="text-gray-600 text-sm">98% successful itineraries</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Popular Times</h3>
                <p className="text-gray-600 text-sm">Evening (6-9 PM) most active</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">AI Accuracy</h3>
                <p className="text-gray-600 text-sm">94% user satisfaction</p>
              </div>
            </div>
          </div>
        )}

        {/* Coming Soon Message */}
        <div className="mt-8 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 inline-block">
            <p className="text-yellow-700">
              🚧 Advanced admin features are under development. More analytics coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;