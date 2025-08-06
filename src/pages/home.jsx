import React, { useEffect, useState } from "react";
import image1 from "../assets/image/img3.png";
import image2 from "../assets/image/img2.png";
import image3 from "../assets/image/img3.jpg";


import middleSectionBg2 from "../assets/image/midelimage2.png";
import middleSectionBg from "../assets/image/midellimge1.png";
import submiddleSectionBg from "../assets/image/logo2.png";
import midelImg from "../assets/image/logo.png";

import NatureofBusiness from "../assets/image/icon-nature-of-business.png";
import iso from "../assets/image/icon-llegal-status-of-firm.png";
import QualityAssurance from "../assets/image/icon-year-of-establishment.png";
import ExpertTeam from "../assets/image/icon-expert-team.png";
import CardShowcase from "./CardShowcase";

const images = [image1, image2, image3];



const products = [
  { name: "img", img: "/products/imali-ball.png" },
  { name: "img", img: "/products/tomato-ketchup.png" },
  { name: "img", img: "/products/jelly-pop.png" },
  { name: "img", img: "/products/fruit-gummies.png" },
  { name: "img", img: "/products/mum-mum.png" },
  { name: "img", img: "/products/amla-candy.png" },
  { name: "img", img: "/products/imali-pop.png" },
  { name: "img", img: "/products/fruit-roll-pop.png" },
  { name: "img", img: "/products/mix-fruit-bar.png" },
  { name: "img", img: "/products/fruit-crush.png" },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };


  return (
    <div>
      
      <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>

        <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition">
          &lt;
        </button>
        <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition">
          &gt;
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition ${currentIndex === index ? "bg-white" : "bg-white/50"}`} />
          ))}
        </div>
      </div>

      <div className="w-full py-16 md:py-24 bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url(${middleSectionBg2})` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="w-full lg:w-2/3 bg-black/70 backdrop-blur-lg rounded-xl p-8 shadow-lg">
              <h2 className="text-4xl font-bold mb-4 text-white">Welcome to Our Company</h2>
              <p className="text-xl mb-6 text-gray-200">Creating exceptional digital experiences for your talent journey</p>
              <p className="text-base text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition">Discover More</button>
            </div>
            <div className="overflow-hidden rounded-full">
              <img src={submiddleSectionBg} alt="Company Logo" className="w-full h-full object-contain mt-6 animate-roll" />
            </div>
          </div>
        </div>
      </div>



      <CardShowcase />


      <div className="w-full py-16 md:py-24 bg-cover bg-center bg-no-repeat bg-fixed text-center" style={{ backgroundImage: `url(${middleSectionBg})` }}>
        <h2 className="text-3xl font-bold text-red-400 mb-2">Feature Products</h2>
        <div className="w-16 h-1 bg-red-400 mx-auto mb-10 rounded-full" />
        <div className="m-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
              <img src={product.img} alt={product.name} className="mx-auto h-40 object-contain mb-3" />
              <h3 className="text-sm font-semibold text-black">{product.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-transparent m-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-red-400 mb-2">Why Choose Us</h2>
        <div className="w-16 h-1 bg-red-400 mx-auto mb-10 rounded-full" />
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
              <img src={iso} alt="icon" className="w-8 h-8" />
              <div className="text-left">
                <h3 className="font-semibold text-lg">An ISO 22000:2018</h3>
                <p className="text-sm text-gray-600">Certified Company</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img src={midelImg} alt="img" className="w-60 h-auto mx-auto" />
          </div>

          <div className="space-y-8">
            <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
              <img src={QualityAssurance} alt="icon" className="w-8 h-8" />
              <div className="text-left">
                <h3 className="font-semibold text-lg">Quality Assurance</h3>
              </div>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4">
              <img src={ExpertTeam} alt="icon" className="w-8 h-8" />
              <div className="text-left">
                <h3 className="font-semibold text-lg">Expert Team</h3>
                <p className="text-sm text-gray-600">Offers a wide range of products and solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
