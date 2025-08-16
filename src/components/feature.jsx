// import React, { useState } from "react";
// import middleSectionBg from "../assets/image/midellimge1.png";
// import silver from "../assets/image/blank.png";
// import glitter from "../assets/image/blank.png";

// const products = [
//   {
//     name: "item 1",
//     img: glitter,
//     type: "Chewy Candy",
//     size: "100g pack",
//     length: "500m",
//   },
//   {
//     name: "item 2",
//     img: silver,
//     type: "Sauce",
//     size: "250g bottle",
//     length: "500m",
//   },
//   {
//     name: "item 3",
//     img: glitter,
//     type: "Jelly Candy",
//     size: "50g pack",
//     length: "500m",
//   },
//   {
//     name: "item 4",
//     img: silver,
//     type: "Gummy Candy",
//     size: "150g pack",
//     length: "500m",
//   },
//   {
//     name: "item 5",
//     img: glitter,
//     type: "Biscuit",
//     size: "200g pack",
//     length: "500m",
//   },
//   {
//     name: "item 6",
//     img: silver,
//     type: "Herbal Candy",
//     size: "100g pack",
//     length: "500m",
//   },
//   {
//     name: "item 7",
//     img: glitter,
//     type: "Lollipop",
//     size: "Single piece",
//     length: "500m",
//   },
//   {
//     name: "item 8",
//     img: silver,
//     type: "Roll Candy",
//     size: "30g roll",
//     length: "500m",
//   },
//   {
//     name: "item 9",
//     img: glitter,
//     type: "Fruit Bar",
//     size: "40g bar",
//     length: "500m",
//   },
//   {
//     name: "item 10",
//     img: silver,
//     type: "Drink",
//     size: "200ml bottle",
//     length: "500m",
//   },
// ];

// function Feature() {
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   const filteredProducts = products.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.length.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div
//       className="w-full pb-2 bg-cover bg-center bg-no-repeat bg-fixed text-center"
//       style={{ backgroundImage: `url(${middleSectionBg})` }}
//     >
//       <h2 className="text-3xl font-bold text-white backdrop-blur-3xl p-4">
//         Feature Products
//       </h2>

//       <div className="mx-auto max-w-md px-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search products by name, type, size, or length..."
//           className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="m-6 md:m-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product, idx) => (
//             <div
//               key={idx}
//               className="border rounded-lg pb-4 hover:shadow-lg transition-shadow bg-white cursor-pointer"
//               onClick={() => openModal(product)}
//             >
//               <img
//                 src={product.img}
//                 alt={product.name}
//                 className="mx-auto h-40 p-4 object-contain mb-3"
//               />
//               <h3 className="text-sm font-semibold text-black">
//                 {product.name}
//               </h3>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center py-10">
//             <p className="text-white text-xl">
//               No products found matching your search.
//             </p>
//           </div>
//         )}
//       </div>

//       {isModalOpen && selectedProduct && (
//         <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <div className="flex justify-between items-start mb-4">
//               <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>

//             <img
//               src={selectedProduct.img}
//               alt={selectedProduct.name}
//               className="mx-auto h-48 object-contain mb-4"
//             />

//             <div className="text-left space-y-2">
//               <p>
//                 <span className="font-semibold">Name:</span>{" "}
//                 {selectedProduct.name}
//               </p>
//               <p>
//                 <span className="font-semibold">Type:</span>{" "}
//                 {selectedProduct.type}
//               </p>
//               <p>
//                 <span className="font-semibold">Size:</span>{" "}
//                 {selectedProduct.size}
//               </p>
//               <p>
//                 <span className="font-semibold">Length:</span>{" "}
//                 {selectedProduct.length}
//               </p>
//             </div>

//             <button
//               onClick={closeModal}
//               className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Feature;

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import middleSectionBg from "../assets/image/midellimge1.png";
import silver from "../assets/image/blank.png";
import glitter from "../assets/image/blank.png";

const products = [
 {
    name: "item 1",
    img: glitter,
    type: "Chewy Candy",
    size: "100g pack",
    length: "500m",
  },
  {
    name: "item 2",
    img: silver,
    type: "Sauce",
    size: "250g bottle",
    length: "500m",
  },
  {
    name: "item 3",
    img: glitter,
    type: "Jelly Candy",
    size: "50g pack",
    length: "500m",
  },
  {
    name: "item 4",
    img: silver,
    type: "Gummy Candy",
    size: "150g pack",
    length: "500m",
  },
  {
    name: "item 5",
    img: glitter,
    type: "Biscuit",
    size: "200g pack",
    length: "500m",
  },
  {
    name: "item 6",
    img: silver,
    type: "Herbal Candy",
    size: "100g pack",
    length: "500m",
  },
  {
    name: "item 7",
    img: glitter,
    type: "Lollipop",
    size: "Single piece",
    length: "500m",
  },
  {
    name: "item 8",
    img: silver,
    type: "Roll Candy",
    size: "30g roll",
    length: "500m",
  },
  {
    name: "item 9",
    img: glitter,
    type: "Fruit Bar",
    size: "40g bar",
    length: "500m",
  },
  {
    name: "item 10",
    img: silver,
    type: "Drink",
    size: "200ml bottle",
    length: "500m",
  },];

function Feature() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const titleRef = useRef(null);
  const searchRef = useRef(null);
  const gridRef = useRef(null);
  
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isSearchInView = useInView(searchRef, { once: true, margin: "-100px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const searchVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 0.2, type: "spring" } }
  };

  const productCardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    })
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    exit: { scale: 0.9, opacity: 0 }
  };

  const modalContentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.length.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="w-full pb-2 bg-cover bg-center bg-no-repeat bg-fixed text-center"
      style={{ backgroundImage: `url(${middleSectionBg})` }}
    >
      <motion.div
        ref={titleRef}
        initial="hidden"
        animate={isTitleInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <h2 className="text-3xl font-bold text-white backdrop-blur-3xl p-4">
          Feature Products
        </h2>
      </motion.div>

      <motion.div
        ref={searchRef}
        initial="hidden"
        animate={isSearchInView ? "visible" : "hidden"}
        variants={searchVariants}
        className="mx-auto max-w-md px-4 mb-6"
      >
        <input
          type="text"
          placeholder="Search products by name, type, size, or length..."
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      <motion.div
        ref={gridRef}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="m-6 md:m-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={productCardVariants}
              className="border rounded-lg pb-4 hover:shadow-lg transition-shadow bg-white cursor-pointer"
              onClick={() => openModal(product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={product.img}
                alt={product.name}
                className="mx-auto h-40 p-4 object-contain mb-3"
                whileHover={{ scale: 1.1 }}
              />
              <h3 className="text-sm font-semibold text-black">
                {product.name}
              </h3>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="col-span-full text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white text-xl">
              No products found matching your search.
            </p>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-6"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-start mb-4">
                <motion.h3 
                  className="text-xl font-bold"
                  variants={modalContentVariants}
                >
                  {selectedProduct.name}
                </motion.h3>
                <motion.button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  variants={modalContentVariants}
                >
                  ✕
                </motion.button>
              </div>

              <motion.img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="mx-auto h-48 object-contain mb-4"
                variants={modalContentVariants}
              />

              <motion.div 
                className="text-left space-y-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                <motion.p variants={modalContentVariants}>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedProduct.name}
                </motion.p>
                <motion.p variants={modalContentVariants}>
                  <span className="font-semibold">Type:</span>{" "}
                  {selectedProduct.type}
                </motion.p>
                <motion.p variants={modalContentVariants}>
                  <span className="font-semibold">Size:</span>{" "}
                  {selectedProduct.size}
                </motion.p>
                <motion.p variants={modalContentVariants}>
                  <span className="font-semibold">Length:</span>{" "}
                  {selectedProduct.length}
                </motion.p>
              </motion.div>

              <motion.button
                onClick={closeModal}
                className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
                variants={modalContentVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Feature;
