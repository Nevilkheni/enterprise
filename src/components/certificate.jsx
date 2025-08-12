import React from "react";
import { useState } from "react";

import midelImg from "../assets/image/logo.png";
import NatureofBusiness from "../assets/image/bussnes.png";
import iso from "../assets/image/leagal.png";
import QualityAssurance from "../assets/image/hand.png";
import ExpertTeam from "../assets/image/staff.png";

function Certificate() {
  const [isRotating, setIsRotating] = useState(false);
  const handleClick = () => {
    setIsRotating(true);

    setTimeout(() => {
      setIsRotating(false);
    }, 2000);
  };
  return (
    <div className="bg-transparent m-auto py-12 px-6 text-center">
      <h2 className="text-3xl font-bold text-black mb-2">Why Choose Us</h2>
      <div className="w-16 h-1 bg-black mx-auto mb-10 rounded-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
            <img src={NatureofBusiness} alt="icon" className="w-8 h-8" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Nature of Business</h3>
              <p className="text-sm text-gray-600">Manufacturer & Exporter</p>
            </div>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
            <img src={iso} alt="icon" className="w-14 h-14" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">An ISO 22000:2018</h3>
              <p className="text-sm text-gray-600">Certified Company</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={midelImg}
            alt="img"
            className={`w-60 h-auto mx-auto ${
              isRotating ? "animate-spin-slow" : ""
            }`}
            onClick={handleClick}
          />
        </div>

        <div className="space-y-8">
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
            <img src={QualityAssurance} alt="icon" className="w-10 h-10" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Quality Assurance</h3>
            </div>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
            <img src={ExpertTeam} alt="icon" className="w-10 h-10" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Expert Team</h3>
              <p className="text-sm text-gray-600">
                Offers a wide range of products and solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
