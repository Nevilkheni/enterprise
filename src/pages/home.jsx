import React, { useEffect, useState } from "react";
import image1 from "../assets/image/img3.png";
import image2 from "../assets/image/img2.png";
import image3 from "../assets/image/img3.jpg";

import approachImg from "../assets/image/2 5.png";
import experienceImg from "../assets/image/silver.jpg";
import clientsImg from "../assets/image/silver.jpg";
import officeImg from "../assets/image/silver.jpg";

import middleSectionBg2 from "../assets/image/midelimage2.png";
import middleSectionBg from "../assets/image/midellimge1.png";
import submiddleSectionBg from "../assets/image/logo2.png";
import midelImg from "../assets/image/logo.png";

import NatureofBusiness from "../assets/image/icon-nature-of-business.png";
import iso from "../assets/image/icon-llegal-status-of-firm.png";
import QualityAssurance from "../assets/image/icon-year-of-establishment.png";
import ExpertTeam from "../assets/image/icon-expert-team.png";

const images = [image1, image2, image3];

const cardData = [
  {
    id: 1,
    title: "Our Approach",
    image: approachImg,
    description: "Sed ut unde omnis iste natus error sit voluptatem accusantium.",
    color: "white",
    textColor: "red-500",
    hoverBg: "red-50",
    details: {
      "Name": "Line",
      "Material": "Sequin",
      "Thickness": "130 microns",
      "Length": "500 Meter"
    }
  },
  {
    id: 2,
    title: "Our Experience",
    image: experienceImg,
    description: "We bring years of expertise to packaging solutions.",
    color: "red-400",
    textColor: "white",
    hoverBg: "red-500"
  },
  {
    id: 3,
    title: "Our Clients",
    image: clientsImg,
    description: "Trusted by top clients across the globe.",
    color: "white",
    textColor: "red-500",
    hoverBg: "red-50"
  },
  {
    id: 4,
    title: "Our Office",
    image: officeImg,
    description: "State-of-the-art facility and infrastructure.",
    color: "white",
    textColor: "red-500",
    hoverBg: "red-50"
  },
];

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
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* HERO CAROUSEL */}
      <div className="relative w-full h-[30vh] sm:h-[55vh] md:h-[70vh] overflow-hidden">
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

      {/* COMPANY INFO SECTION */}
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

      {/* CARD GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {cardData.map((card) => (
            <div key={card.id} onClick={() => handleCardClick(card)} onMouseEnter={() => setHoveredCard(card.id)} onMouseLeave={() => setHoveredCard(null)} className="relative rounded-lg cursor-pointer overflow-hidden h-64 hover:shadow-xl">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              {hoveredCard === card.id && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-sm mb-2">{card.description}</p>
                  <span className="text-sm font-semibold underline">Click for Details</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-4 px-4">
          <h1 className="text-4xl font-extrabold leading-tight">
            Digital Experience in <br className="hidden sm:block" />
            the Talent Journey and Learning!
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Aurabitur id gravida risus. Fusce eget ex fermentum, ultricies nisi ac sed, lacinia est. Quisque ut lectus consequat, venenatis eros et.
          </p>
          <button className="bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition">Learn More</button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-2 sm:mx-4 relative overflow-y-auto max-h-[90vh]">
            <button onClick={closeModal} className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl">
              ✕
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
              <div className="h-48 sm:h-64 md:h-80 lg:h-full w-full">
                <img src={selectedCard.image} alt={selectedCard.title} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="space-y-2 sm:space-y-4">
                <h2 className="text-2xl font-bold text-red-500">{selectedCard.title}</h2>
                <p className="text-gray-600 text-sm sm:text-base">{selectedCard.description}</p>
                <div className="text-gray-600 text-sm sm:text-base space-y-1">
                  {selectedCard.details ? (
                    Object.entries(selectedCard.details).map(([label, value], idx) => (
                      <p key={idx}>
                        <strong>{label}:</strong> {value}
                      </p>
                    ))
                  ) : (
                    <p>Additional details about {selectedCard.title.toLowerCase()} would be displayed here.</p>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={closeModal} className="bg-red-400 text-white font-semibold px-4 py-2 rounded hover:bg-red-500 transition">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FEATURED PRODUCTS */}
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

      {/* WHY CHOOSE US */}
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
