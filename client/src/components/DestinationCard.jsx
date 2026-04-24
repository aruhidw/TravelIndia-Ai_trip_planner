import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const DestinationCard = ({ destination }) => {
  return (
    <div className="relative group h-full">

      {/* 🔥 Glow Border */}
      <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl blur-md opacity-0 group-hover:opacity-60 transition duration-500"></div>

      {/* 🧊 Card */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden 
      shadow-[0_20px_60px_rgba(0,0,0,0.15)] 
      hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)] 
      transition-all duration-500 transform hover:-translate-y-3">

        {/* IMAGE */}
        <div className="relative h-52 overflow-hidden">
          <img 
            src={destination.image} 
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

          {/* State Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-1.5 shadow-md">
            <span className="text-xs font-semibold text-gray-800">
              {destination.state}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 flex flex-col gap-4">

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition">
            {destination.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {destination.description}
          </p>

          {/* BUTTON */}
          <Button to="/ai-assistant" className="w-full">
  Explore with AI
</Button>

        </div>
      </div>
    </div>
  );
};

export default DestinationCard;