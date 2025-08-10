import React, { useState } from 'react';
import middleSectionBg from "../assets/image/midellimge1.png";

import silver from "../assets/image/silver.png";
import glitter from "../assets/image/glitter.jpg";

const products = [
  { 
    name: "item 1", 
    img: glitter,
    type: "Chewy Candy",
    size: "100g pack"
  },
  { 
    name: "item 2", 
    img: silver,
    type: "Sauce",
    size: "250g bottle"
  },
  { 
    name: "item 3", 
    img: glitter,
    type: "Jelly Candy",
    size: "50g pack"
  },
  { 
    name: "item 4", 
    img: silver,
    type: "Gummy Candy",
    size: "150g pack"
  },
  { 
    name: "item 5", 
    img: glitter,
    type: "Biscuit",
    size: "200g pack"
  },
  { 
    name: "item 6", 
    img: silver,
    type: "Herbal Candy",
    size: "100g pack"
  },
  { 
    name: "item 7", 
    img: glitter,
    type: "Lollipop",
    size: "Single piece"
  },
  { 
    name: "item 8", 
    img: silver,
    type: "Roll Candy",
    size: "30g roll"
  },
  { 
    name: "item 9", 
    img: glitter,
    type: "Fruit Bar",
    size: "40g bar"
  },
  { 
    name: "item 10", 
    img: silver,
    type: "Drink",
    size: "200ml bottle"
  },
];

function Feature() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div
      className="w-full pb-2 bg-cover bg-center bg-no-repeat bg-fixed text-center"
      style={{ backgroundImage: `url(${middleSectionBg})` }}
    >
      <h2 className="text-3xl font-bold text-white backdrop-blur-3xl p-4">
        Feature Products
      </h2>
      <div className="m-6 md:m-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="border rounded-lg pb-4 hover:shadow-lg transition-shadow bg-white cursor-pointer"
            onClick={() => openModal(product)}
          >
            <img
              src={product.img}
              alt={product.name}
              className="mx-auto h-40  object-contain mb-3"
            />
            <h3 className="text-sm font-semibold text-black">
              {product.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <img
              src={selectedProduct.img}
              alt={selectedProduct.name}
              className="mx-auto h-48 object-contain mb-4"
            />
            
            <div className="text-left space-y-2">
              <p><span className="font-semibold">Type:</span> {selectedProduct.type}</p>
              <p><span className="font-semibold">Size:</span> {selectedProduct.size}</p>
            </div>
            
            <button
              onClick={closeModal}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feature;