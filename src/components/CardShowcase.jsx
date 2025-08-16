// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import midelImg from "../assets/image/logo.png";
// import "../pages/allproduct"

// const CardShowcase = () => {    
//   const navigate = useNavigate();
//   // Removed unused 'cards' state
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [positions, setPositions] = useState({
//     1: null,
//     2: null,
//     3: null,
//     4: null,
//   });

//   const fetchCards = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "showcaseCards"));
//       const fetchedCards = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       const newPositions = { 1: null, 2: null, 3: null, 4: null };
//       fetchedCards.forEach((card) => {
//         if (card.position && card.position >= 1 && card.position <= 4) {
//           newPositions[card.position] = card;
//         }
//       });

//       setPositions(newPositions);
//       // Removed setCards as 'cards' state is not used
//     } catch (error) {
//       console.error("❌ Error fetching showcaseCards:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCards();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const openModal = (card) => {
//     setSelectedCard(card);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedCard(null);
//     setModalOpen(false);
//   };

//   return (
//     <div className="container mx-auto  py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="w-full lg:w-1/2 flex flex-wrap gap-4 justify-center items-center">
//           {[1, 2, 3, 4].map((pos) => (
//             <div
//               key={pos}
//               className="w-[300px] h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer flex items-center justify-center"
//               onClick={() => positions[pos] && openModal(positions[pos])}
//             >
//               {positions[pos] ? (
//                 <img
//                   src={positions[pos].image}
//                   alt={positions[pos].title}
//                   className="w-full m-24 h-full object-cover transition-transform duration-300  hover:scale-110"
//                 />
//               ) : (
//                 <span className="text-gray-400">Card {pos} Empty</span>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="w-full lg:w-auto flex flex-col text-center md:text-left justify-center">
//           <h2 className="text-2xl font-bold mx-auto mb-4">New Product</h2>
//           <ul className="list-disc list-inside mx-auto text-gray-700 space-y-2 mb-6">
//             <li>Trending item in market</li>
//             <li>Available in all regions</li>
//             <li>Click card for full details</li>
//           </ul>
//           <button
//             className="px-6 py-2 bg-red-600 text-center text-white rounded hover:bg-red-700 w-max mx-auto"
//             onClick={() => navigate('/AllProducts')}
//           >
//             More Details
//           </button>
//         </div>
//         <img src={midelImg} alt="img" className="w-60 h-60 m-auto" />
//       </div>

//       {modalOpen && selectedCard && (
//         <div className="fixed inset-0 z-50  backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4">
//           <div className="bg-white p-6 rounded-lg max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
//             >
//               ×
//             </button>

//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="md:w-1/2">
//                 <img
//                   src={selectedCard.image}
//                   alt={selectedCard.title}
//                   className="w-full h-64 md:h-80 object-cover rounded-lg"
//                 />
//               </div>

//               <div className="md:w-1/2">
//                 <h2 className="text-2xl font-bold mb-2">
//                   {selectedCard.title}
//                 </h2>

//                 <div className="space-y-4">
//                   <div>
//                     <h3 className="font-medium text-gray-900">Material</h3>
//                     <p className="text-gray-600">
//                       {selectedCard.shortDescription}
//                     </p>
//                   </div>

//                   {selectedCard.longDescription && (
//                     <div>
//                       <h3 className="font-medium text-gray-900">Description</h3>
//                       <p className="text-gray-600">
//                         {selectedCard.longDescription}
//                       </p>
//                     </div>
//                   )}

//                   {selectedCard.features &&
//                     selectedCard.features.length > 0 && (
//                       <div>
//                         <h3 className="font-medium text-gray-900">
//                           Specifications
//                         </h3>
//                         <ul className="list-disc list-inside space-y-1 text-gray-600">
//                           {selectedCard.features.map((feature, index) => (
//                             <li key={index}>{feature}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardShowcase;


import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import midelImg from "../assets/image/logo.png";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "../pages/allproduct";

const CardShowcase = () => {    
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [positions, setPositions] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const infoRef = useRef(null);
  const logoRef = useRef(null);
  
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });
  const isLogoInView = useInView(logoRef, { once: true, margin: "-100px" });

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const cardVariants = {
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

  const rightContentVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2
      }
    }
  };

  const listItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.6 + i * 0.1 }
    })
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.9 } }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay: 1.0, type: "spring" } }
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
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        ref={titleRef}
        initial="hidden"
        animate={isTitleInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          ref={cardsRef}
          className="w-full lg:w-1/2 flex flex-wrap gap-4 justify-center items-center"
          initial="hidden"
          animate={isCardsInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {[1, 2, 3, 4].map((pos, i) => (
            <motion.div
              key={pos}
              custom={i}
              variants={cardVariants}
              className="w-[300px] h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer flex items-center justify-center"
              onClick={() => positions[pos] && openModal(positions[pos])}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {positions[pos] ? (
                <motion.img
                  src={positions[pos].image}
                  alt={positions[pos].title}
                  className="w-full m-24 h-full object-cover transition-transform duration-300 hover:scale-110"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                />
              ) : (
                <span className="text-gray-400">Card {pos} Empty</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={infoRef}
          className="w-full lg:w-auto flex flex-col text-center md:text-left justify-center"
          initial="hidden"
          animate={isInfoInView ? "visible" : "hidden"}
          variants={rightContentVariants}
        >
          <h2 className="text-2xl font-bold mx-auto mb-4">New Product</h2>
          <ul className="list-disc list-inside mx-auto text-gray-700 space-y-2 mb-6">
            {["Trending item in market", "Available in all regions", "Click card for full details"].map((item, i) => (
              <motion.li
                key={i}
                custom={i}
                variants={listItemVariants}
                initial="hidden"
                animate={isInfoInView ? "visible" : "hidden"}
              >
                {item}
              </motion.li>
            ))}
          </ul>
          <motion.button
            className="px-6 py-2 bg-red-600 text-center text-white rounded hover:bg-red-700 w-max mx-auto"
            onClick={() => navigate('/AllProducts')}
            variants={buttonVariants}
            initial="hidden"
            animate={isInfoInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More Details
          </motion.button>
        </motion.div>
        
        <motion.img
          ref={logoRef}
          src={midelImg}
          alt="img"
          className="w-60 h-60 m-auto"
          variants={logoVariants}
          initial="hidden"
          animate={isLogoInView ? "visible" : "hidden"}
        />
      </div>

     <AnimatePresence>
  {modalOpen && selectedCard && (
    <motion.div
      className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ×
        </motion.button>

        <div className="flex flex-col md:flex-row gap-6">
          <motion.div 
            className="md:w-1/2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src={selectedCard.image}
              alt={selectedCard.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </motion.div>

          <motion.div 
            className="md:w-1/2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-2">
              {selectedCard.title || "No Title Available"}
            </h2>

            <div className="space-y-4">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-medium text-gray-900">Material</h3>
                <p className="text-gray-600">
                  {selectedCard.shortDescription || "No description available"}
                </p>
              </motion.div>

              {selectedCard.longDescription && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-medium text-gray-900">Description</h3>
                  <p className="text-gray-600">
                    {selectedCard.longDescription}
                  </p>
                </motion.div>
              )}

              {selectedCard.features && selectedCard.features.length > 0 && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="font-medium text-gray-900">Specifications</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {selectedCard.features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default CardShowcase;