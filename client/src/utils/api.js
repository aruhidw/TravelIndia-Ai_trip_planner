import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🔄 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with detailed error logging
 api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.config.url}`, response.data);
    return response.data;  // <-- FIXED HERE
  },
  (error) => {
    console.error('❌ API Error Details:', {
      URL: error.config?.url,
      Method: error.config?.method,
      Status: error.response?.status,
      StatusText: error.response?.statusText,
      ErrorMessage: error.message,
      ResponseData: error.response?.data
    });

    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Backend is not running!');
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject({
      success: false,
      error: error.response?.data?.error || error.message || 'Network error'
    });
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};

// AI API
export const aiAPI = {
  generateItinerary: (data) => api.post('/ai/generate-itinerary', data),
};

// Trips API
export const tripsAPI = {
  getMyTrips: () => api.get('/trips/my-trips'),
  getTrip: (tripId) => api.get(`/trips/${tripId}`),
  deleteTrip: (tripId) => api.delete(`/trips/${tripId}`),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
};

export default api;