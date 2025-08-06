import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CardShowcase = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [positions, setPositions] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  });

  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "showcaseCards"));
      const fetchedCards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      const newPositions = {1: null, 2: null, 3: null, 4: null};
      fetchedCards.forEach(card => {
        if (card.position && card.position >= 1 && card.position <= 4) {
          newPositions[card.position] = card;
        }
      });
      
      setPositions(newPositions);
      setCards(fetchedCards);
    } catch (error) {
      console.error("❌ Error fetching showcaseCards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((position) => (
          <div 
            key={position} 
            className="relative group overflow-hidden rounded-xl shadow-lg"
            onClick={() => positions[position] && openModal(positions[position])}
          >
            {positions[position] ? (
              <>
                <img
                  src={positions[position].image || "/default.jpg"}
                  alt={positions[position].title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                  <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-white text-xl font-bold mb-1">
                      {positions[position].title}
                    </h2>
                    <p className="text-gray-200 text-sm line-clamp-2">
                      {positions[position].shortDescription}
                    </p>
                    <button 
                      className="mt-2 text-white text-sm font-medium hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(positions[position]);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-400">
                <p>Position {position} - Empty</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {modalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center p-4">
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
                <h2 className="text-2xl font-bold mb-2">{selectedCard.title}</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Material</h3>
                    <p className="text-gray-600">{selectedCard.shortDescription}</p>
                  </div>
                  
                  {selectedCard.longDescription && (
                    <div>
                      <h3 className="font-medium text-gray-900">Description</h3>
                      <p className="text-gray-600">{selectedCard.longDescription}</p>
                    </div>
                  )}
                  
                  {selectedCard.features && selectedCard.features.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900">Specifications</h3>
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