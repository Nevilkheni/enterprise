
import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const [isHidden, setIsHidden] = useState(false);
  const phoneNumber = "+916351091508";
  const defaultMessage = "Hello, I need help!";

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`,
      "_blank"
    );
  };

  const handleSwipe = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out ${
        isHidden ? "translate-x-[120%] opacity-60" : "translate-x-0 opacity-100"
      }`}
      onTouchEnd={handleSwipe}
    >
      {/* Tooltip + Button */}
      <div className="relative group">
        {/* Tooltip */}
        <span className="absolute -left-28 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
          Chat with us
        </span>

        {/* WhatsApp Button */}
        <div
          onClick={openWhatsApp}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-600 animate-pulse"
        >
          <FaWhatsapp size={30} />
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
