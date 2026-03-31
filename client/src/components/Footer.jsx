import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="text-xl font-bold">TravelIndia</span>
            </div>
            <p className="text-gray-400">
              AI-powered travel planning for incredible India. Discover, plan, and explore like never before.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/ai-assistant" className="text-gray-400 hover:text-white transition-colors">AI Trip Assistant</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">My Trips</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">AI Itinerary Planning</li>
              <li className="text-gray-400">Cost Estimation</li>
              <li className="text-gray-400">Hotel Recommendations</li>
              <li className="text-gray-400">Local Transport Guide</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: support@travelindia.com</li>
              <li className="text-gray-400">Phone: +91 986757xxxx</li>
              <li className="text-gray-400">24/7 Customer Support</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 TravelIndia. All rights reserved. Made with ❤️ for India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;