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
      className={`fixed bottom-5  right-5 z-50 transition-all duration-300 ease-in-out ${
        isHidden ? "translate-x-[80%] opacity-70" : "translate-x-0 opacity-100"
      }`}
      onTouchEnd={handleSwipe} 
    >
      <div
        className="bg-green-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-green-600 ml-4"
        onClick={openWhatsApp}
      >
        <FaWhatsapp size={28} />
      </div>
    </div>
  );
};

export default WhatsAppButton;