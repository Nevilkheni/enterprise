import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import midelImg from "../assets/image/logo.png";
import "../pages/allproduct"

const CardShowcase = () => {    
  const navigate = useNavigate();
  // Removed unused 'cards' state
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [positions, setPositions] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "showcaseCards"));
      const fetchedCards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const newPositions = { 1: null, 2: null, 3: null, 4: null };
      fetchedCards.forEach((card) => {
        if (card.position && card.position >= 1 && card.position <= 4) {
          newPositions[card.position] = card;
        }
      });

      setPositions(newPositions);
      // Removed setCards as 'cards' state is not used
    } catch (error) {
      console.error("❌ Error fetching showcaseCards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (card) => {
    setSelectedCard(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto  py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 flex flex-wrap gap-4 justify-center items-center">
          {[1, 2, 3, 4].map((pos) => (
            <div
              key={pos}
              className="w-[300px] h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer flex items-center justify-center"
              onClick={() => positions[pos] && openModal(positions[pos])}
            >
              {positions[pos] ? (
                <img
                  src={positions[pos].image}
                  alt={positions[pos].title}
                  className="w-full m-24 h-full object-cover transition-transform duration-300  hover:scale-110"
                />
              ) : (
                <span className="text-gray-400">Card {pos} Empty</span>
              )}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-auto flex flex-col text-center md:text-left justify-center">
          <h2 className="text-2xl font-bold mx-auto mb-4">New Product</h2>
          <ul className="list-disc list-inside mx-auto text-gray-700 space-y-2 mb-6">
            <li>Trending item in market</li>
            <li>Available in all regions</li>
            <li>Click card for full details</li>
          </ul>
          <button
            className="px-6 py-2 bg-red-600 text-center text-white rounded hover:bg-red-700 w-max mx-auto"
            onClick={() => navigate('/AllProducts')}
          >
            More Details
          </button>
        </div>
        <img src={midelImg} alt="img" className="w-60 h-60 m-auto" />
      </div>

      {modalOpen && selectedCard && (
        <div className="fixed inset-0 z-50  backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>

              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedCard.title}
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Material</h3>
                    <p className="text-gray-600">
                      {selectedCard.shortDescription}
                    </p>
                  </div>

                  {selectedCard.longDescription && (
                    <div>
                      <h3 className="font-medium text-gray-900">Description</h3>
                      <p className="text-gray-600">
                        {selectedCard.longDescription}
                      </p>
                    </div>
                  )}

                  {selectedCard.features &&
                    selectedCard.features.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Specifications
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          {selectedCard.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardShowcase;