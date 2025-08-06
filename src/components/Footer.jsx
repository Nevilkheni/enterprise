import React from "react";
import { Mail, Phone, Instagram, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white pt-12 pb-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Contact Us</h3>
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-300">jyotenterprise135@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-300">+91 9426154135</p>
                <p className="text-gray-300">+91 9375776364</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400 mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/home"
                className="text-gray-300 hover:text-white transition"
              >
                Home
              </a>
              <a
                href="/products"
                className="text-gray-300 hover:text-white transition"
              >
                Products
              </a>
              <a
                href="/about"
                className="text-gray-300 hover:text-white transition"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="text-gray-300 hover:text-white transition"
              >
                Contact
              </a>
              <a href="/" className="text-gray-300 hover:text-white transition">
                FAQs
              </a>
              <a href="/" className="text-gray-300 hover:text-white transition">
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-pink-600 text-white p-3 rounded-full transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-600 text-white p-3 rounded-full transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 mt-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            {/* <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition">
                Subscribe
              </button>
            </div> */}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Jyot Enterprise. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="/"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              Terms of Service
            </a>
            <a
              href="/"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              Privacy Policy
            </a>
            <a
              href="/"
              className="text-gray-400 hover:text-white text-sm transition"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
