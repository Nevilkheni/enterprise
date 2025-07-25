// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-gray-700 text-lg leading-relaxed">
        Welcome to <strong>TechStore</strong>, your number one source for all things tech.
        We're dedicated to giving you the very best of electronics, with a focus on quality, customer service, and uniqueness.
      </p>
      <p className="mt-4 text-gray-600">
        Founded in 2025, TechStore has come a long way from its beginnings. When we first started out, our passion
        for cutting-edge gadgets drove us to start our own business.
      </p>
      <p className="mt-4 text-gray-600">
        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments,
        please don't hesitate to contact us.
      </p>
    </div>
  );
};

export default About;
