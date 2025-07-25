import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10 py-6">
      <div className="container mx-auto text-center">
        <p className="mb-2">📧 contact@techstore.com | 📞 +971-50-123-4567</p>
        <div className="flex justify-center gap-4 text-sm">
          <a href="https://instagram.com" className="hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://linkedin.com" className="hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://twitter.com" className="hover:underline" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
        <p className="mt-4 text-xs text-gray-400">&copy; 2025 Tech Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
