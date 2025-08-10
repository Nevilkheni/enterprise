// import React, { useState } from 'react';

// const products = [
//   { 
//     id: 1,
//     name: "Imali Ball", 
//     img: "/products/imali-ball.png",
//     description: "Delicious chewy candy with a unique flavor that will tantalize your taste buds."
//   },
//   { 
//     id: 2,
//     name: "Chocolate Bar", 
//     img: "/products/chocolate-bar.png",
//     description: "Rich and creamy milk chocolate for your sweet cravings."
//   },
//   { 
//     id: 3,
//     name: "Gummy Bears", 
//     img: "/products/gummy-bears.png",
//     description: "Colorful and fruity gummy bears in various flavors."
//   },
//   { 
//     id: 4,
//     name: "Lollipop", 
//     img: "/products/lollipop.png",
//     description: "Classic swirl lollipop with long-lasting flavor."
//   },
//   { 
//     id: 5,
//     name: "Sour Belts", 
//     img: "/products/sour-belts.png",
//     description: "Tangy and sweet sour belts for sour candy lovers."
//   },
//   { 
//     id: 6,
//     name: "Caramel Chews", 
//     img: "/products/caramel-chews.png",
//     description: "Buttery soft caramel chews that melt in your mouth."
//   },
// ];

// function AllProducts() {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
      
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
//             onClick={() => openModal(product)}
//           >
//             <div className="aspect-square bg-gray-100 flex items-center justify-center">
//               <img
//                 src={product.img}
//                 alt={product.name}
//                 className="w-full h-full object-contain p-4 group-hover:opacity-75 transition-opacity"
//               />
//             </div>
            
//             <div className="p-3">
//               <h3 className="text-center font-medium text-gray-800">{product.name}</h3>
//             </div>
            
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
//               <div className="text-white text-center p-2">
//                 <p className="font-bold text-lg">{product.name}</p>
//                 <p className="text-sm">More details</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && selectedProduct && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={closeModal}
//         >
//           <div 
//             className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
//               <button 
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700 text-xl"
//               >
//                 &times;
//               </button>
//             </div>
            
//             <div className="aspect-square bg-gray-100 flex items-center justify-center mb-4 rounded-lg">
//               <img
//                 src={selectedProduct.img}
//                 alt={selectedProduct.name}
//                 className="h-48 object-contain"
//               />
//             </div>
            
//             <div className="space-y-3">
//               <p className="text-gray-700">{selectedProduct.description}</p>
//             </div>
            
//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AllProducts;



// AllProducts.js
import React, { useState } from 'react';

const products = [
  { 
    id: 1,
    name: "Imali Ball", 
    img: "/products/imali-ball.png",
    description: "Delicious chewy candy with a unique flavor that will tantalize your taste buds."
  },
  // ... rest of your product data
];

function AllProducts() {
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
            onClick={() => openModal(product)}
          >
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-contain p-4 group-hover:opacity-75 transition-opacity"
              />
            </div>
            
            <div className="p-3">
              <h3 className="text-center font-medium text-gray-800">{product.name}</h3>
            </div>
            
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="text-white text-center p-2">
                <p className="font-bold text-lg">{product.name}</p>
                <p className="text-sm">More details</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>
            
            <div className="aspect-square bg-gray-100 flex items-center justify-center mb-4 rounded-lg">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="h-48 object-contain"
              />
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-700">{selectedProduct.description}</p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;