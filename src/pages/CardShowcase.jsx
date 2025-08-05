import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CardShowcase = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "showcaseCards"));
      const fetchedCards = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("🔥 Fetched showcaseCards:", fetchedCards);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-xl shadow-lg cursor-pointer transition hover:scale-105"
          onClick={() => openModal(card)}
        >
          <img
            src={card.image || "/default.jpg"}
            alt={card.name}
            className="h-48 w-full object-cover rounded-t-xl"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{card.name}</h2>
            <p className="text-sm text-gray-600">Material: {card.material}</p>
            <p className="text-sm text-gray-600">Thickness: {card.thickness}</p>
            <p className="text-sm text-gray-600">Length: {card.length}</p>
          </div>
        </div>
      ))}

      {modalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 text-2xl font-bold"
            >
              ×
            </button>
            <img
              src={selectedCard.image}
              alt={selectedCard.name}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedCard.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Material:</strong> {selectedCard.material}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Thickness:</strong> {selectedCard.thickness}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Length:</strong> {selectedCard.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardShowcase;
