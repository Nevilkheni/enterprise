import React, { useState } from "react";
import approachImg from "../assets/image/2 5.png";
import experienceImg from "../assets/image/silver.jpg";
import clientsImg from "../assets/image/silver.jpg";
import officeImg from "../assets/image/silver.jpg";

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
      Name: "Line",
      Material: "Sequin",
      Thickness: "130 microns",
      Length: "500 Meter",
    },
  },
  {
    id: 2,
    title: "Our Experience",
    image: experienceImg,
    description: "We bring years of expertise to packaging solutions.",
    color: "red-400",
    textColor: "white",
    hoverBg: "red-500",
  },
  {
    id: 3,
    title: "Our Clients",
    image: clientsImg,
    description: "Trusted by top clients across the globe.",
    color: "white",
    textColor: "red-500",
    hoverBg: "red-50",
  },
  {
    id: 4,
    title: "Our Office",
    image: officeImg,
    description: "State-of-the-art facility and infrastructure.",
    color: "white",
    textColor: "red-500",
    hoverBg: "red-50",
  },
];

function CardShowcase() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {cardData.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative rounded-lg cursor-pointer overflow-hidden h-64 hover:shadow-xl"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
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
            Aurabitur id gravida risus. Fusce eget ex fermentum, ultricies nisi ac sed, lacinia est.
            Quisque ut lectus consequat, venenatis eros et.
          </p>
          <button className="bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition">
            Learn More
          </button>
        </div>
      </div>

      {showModal && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-2 sm:mx-4 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
            >
              ✕
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
              <div className="h-48 sm:h-64 md:h-80 lg:h-full w-full">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="w-full h-full object-cover rounded-lg"
                />
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
                    <p>
                      Additional details about {selectedCard.title.toLowerCase()} would be displayed here.
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="bg-red-400 text-white font-semibold px-4 py-2 rounded hover:bg-red-500 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardShowcase;
