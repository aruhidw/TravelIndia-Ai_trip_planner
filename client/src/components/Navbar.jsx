import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-40 transition-all duration-300 bg-gradient-to-t from-white/95 via-primary-50/50 to-primary-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 sm:h-16 lg:h-24 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-0.5 lg:gap-1 flex-shrink-0">
          <Link to="/" className="flex items-center gap-4">
            <div className="relative h-12 w-20 sm:h-14 sm:w-24 lg:h-16 lg:w-28 cursor-pointer">
              <img 
                src="/homepage/logo.png" 
                alt="TravelIndia Logo" 
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TravelIndia
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-1 lg:gap-2">
          <Link to="/">
            <div className="relative px-4 py-2.5 rounded-xl font-semibold text-[15px] transition-colors cursor-pointer text-primary-700 bg-primary-50">
              Home
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-8"></span>
            </div>
          </Link>
          <Link to="/ai-assistant">
            <div className="relative px-4 py-2.5 rounded-xl font-semibold text-[15px] transition-colors cursor-pointer text-neutral-700 hover:text-primary-700 hover:bg-primary-50/60">
              AI Trip Assistant
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-0 group-hover:w-8 transition-all duration-300"></span>
            </div>
          </Link>
          
          {isAuthenticated && (
            <Link to="/dashboard">
              <div className="relative px-4 py-2.5 rounded-xl font-semibold text-[15px] transition-colors cursor-pointer text-neutral-700 hover:text-primary-700 hover:bg-primary-50/60">
                My Trips
              </div>
            </Link>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3 ml-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 text-red-600 border-red-200 bg-white hover:bg-red-50 hover:border-red-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <Link to="/login">
                <button className="px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 text-gray-600 border-gray-200 bg-white hover:bg-gray-50">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 text-white bg-gradient-to-r from-blue-600 to-purple-600 border-transparent hover:shadow-lg hover:shadow-blue-500/25">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden p-2 rounded-xl hover:bg-primary-50 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 py-4 px-4">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/ai-assistant" className="px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium" onClick={() => setIsMenuOpen(false)}>
              AI Trip Assistant
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary-700 font-medium" onClick={() => setIsMenuOpen(false)}>
                My Trips
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 text-gray-500">Hello, {user?.username}</div>
                <button onClick={handleLogout} className="px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-3 rounded-xl text-gray-700 hover:bg-primary-50 font-medium" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-center" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;