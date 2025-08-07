import React from 'react';
import { useNavigate } from 'react-router-dom';

function OurStory() {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="w-full py-2 md:py-4 text-center">
        <h1 className="text-4xl font-bold text-black">Our Story</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold text-black mb-4">Simple Beginnings, Clear Vision</h2>
        <p className="text-gray-800 leading-relaxed mb-6">
          We started small with one goal: to do work that matters. 
          No fluff, just quality. Every project reflects our commitment 
          to simplicity and effectiveness.
        </p>
        <button 
          onClick={() => navigate('/about')}
          className="px-6 py-2 bg-black text-white font-medium rounded hover:bg-gray-800 transition"
        >
          About Us
        </button>
      </div>
    </div>
  );
}

export default OurStory;