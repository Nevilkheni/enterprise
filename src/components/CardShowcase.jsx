// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import { motion, useInView, AnimatePresence } from "framer-motion";

// const CardShowcase = () => {
//   const navigate = useNavigate();
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [positions, setPositions] = useState({
//     1: null,
//     2: null,
//     3: null,
//     4: null,
//   });

//   const titleRef = useRef(null);
//   const cardsRef = useRef(null);
//   const infoRef = useRef(null);

//   const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
//   const isCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
//   const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });

//   const titleVariants = {
//     hidden: { y: -50, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
//   };

//   const cardVariants = {
//     hidden: { y: 50, opacity: 0 },
//     visible: (i) => ({
//       y: 0,
//       opacity: 1,
//       transition: {
//         delay: i * 0.1,
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//       },
//     }),
//   };

//   const buttonVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { delay: 0.8 } },
//   };

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
//     } catch (error) {
//       console.error("❌ Error fetching showcaseCards:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCards();
//   }, []);

//   const openModal = (card) => {
//     setSelectedCard(card);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   return (
//     <div className="container mx-auto max-w-5xl  py-8">
//       <motion.div
//         ref={titleRef}
//         initial="hidden"
//         animate={isTitleInView ? "visible" : "hidden"}
//         variants={titleVariants}
//       >
//         <h1 className="font-bold text-center text-lg md:text-3xl font-michroma mb-8">
//           Our Products
//         </h1>
//       </motion.div>

//       <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
//         <motion.div
//           ref={cardsRef}
//           className="flex  flex-col gap-6 px-4 w-full lg:w-1/3"
//           initial="hidden"
//           animate={isCardsInView ? "visible" : "hidden"}
//         >
//           {[1, 2].map((pos, i) => (
//             <motion.div
//               key={pos}
//               custom={i}
//               variants={cardVariants}
//               className="w-full h-48  bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer flex items-center justify-center"
//               onClick={() => positions[pos] && openModal(positions[pos])}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {positions[pos] ? (
//                 <motion.img
//                   src={positions[pos].image}
//                   alt={positions[pos].title}
//                   className="w-auto h-full object-cover transition-transform duration-300 hover:scale-110"
//                 />
//               ) : (
//                 <span className="text-gray-400">Card {pos} Empty</span>
//               )}
//             </motion.div>
//           ))}
//         </motion.div>

//         <motion.div
//           ref={infoRef}
//           className="w-full  m-auto lg:w-1/3 text-center flex flex-col items-center justify-center"
//           initial="hidden"
//           animate={isInfoInView ? "visible" : "hidden"}
//         >
//           <h2 className="text-2xl font-josefin font-bold mb-4">New Product</h2>
//           <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 text-left">
//             <li>Trending item in market</li>
//             <li>Available in all regions</li>
//             <li>Click card for full details</li>
//           </ul>
//           <motion.button
//             className="px-6 py-2 font-michroma text-sm bg-red-600 text-white rounded hover:bg-red-700 mx-auto"
//             onClick={() => navigate("/AllProducts")}
//             variants={buttonVariants}
//             initial="hidden"
//             animate="visible"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             More Details
//           </motion.button>
//         </motion.div>

//         <motion.div
//           ref={cardsRef}
//           className="flex flex-col px-4 gap-6 w-full lg:w-1/3"
//           initial="hidden"
//           animate={isCardsInView ? "visible" : "hidden"}
//         >
//           {[3, 4].map((pos, i) => (
//             <motion.div
//               key={pos}
//               custom={i}
//               variants={cardVariants}
//               className="w-full h-48 bg-white rounded-lg overflow-hidden shadow-md cursor-pointer flex items-center justify-center"
//               onClick={() => positions[pos] && openModal(positions[pos])}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {positions[pos] ? (
//                 <motion.img
//                   src={positions[pos].image}
//                   alt={positions[pos].title}
//                   className="w-auto h-full object-cover transition-transform duration-300 hover:scale-110"
//                 />
//               ) : (
//                 <span className="text-gray-400">Card {pos} Empty</span>
//               )}
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {modalOpen && selectedCard && (
//           <motion.div
//             className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-50 flex justify-center items-center p-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white p-6 rounded-lg max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//             >
//               <motion.button
//                 onClick={closeModal}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
//               >
//                 ×
//               </motion.button>

//               <div className="flex flex-col md:flex-row gap-6">
//                 <div className="md:w-1/2">
//                   <img
//                     src={selectedCard.image}
//                     alt={selectedCard.title}
//                     className="w-full h-64 md:h-80 object-cover rounded-lg"
//                   />
//                 </div>

//                 <div className="md:w-1/2">
//                   <h2 className="text-2xl font-bold mb-2">
//                     {selectedCard.title || "No Title Available"}
//                   </h2>

//                   <div className="space-y-4">
//                     <div>
//                       <h3 className="font-medium text-gray-900">Material</h3>
//                       <p className="text-gray-600">
//                         {selectedCard.shortDescription ||
//                           "No description available"}
//                       </p>
//                     </div>

//                     {selectedCard.longDescription && (
//                       <div>
//                         <h3 className="font-medium text-gray-900">Description</h3>
//                         <p className="text-gray-600">
//                           {selectedCard.longDescription}
//                         </p>
//                       </div>
//                     )}

//                     {selectedCard.features &&
//                       selectedCard.features.length > 0 && (
//                         <div>
//                           <h3 className="font-medium text-gray-900">
//                             Specifications
//                           </h3>
//                           <ul className="list-disc list-inside space-y-1 text-gray-600">
//                             {selectedCard.features.map((feature, index) => (
//                               <li key={index}>{feature}</li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default CardShowcase;



import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion, useInView, AnimatePresence } from "framer-motion";

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
  const leftCardsRef = useRef(null);
  const rightCardsRef = useRef(null);
  const infoRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isLeftCardsInView = useInView(leftCardsRef, { once: true, margin: "-100px" });
  const isRightCardsInView = useInView(rightCardsRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px" });

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
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
        damping: 10,
      },
    }),
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.8 } },
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
    <div className="container mx-auto max-w-5xl py-8">
      {/* Title */}
      <motion.div
        ref={titleRef}
        initial="hidden"
        animate={isTitleInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <h1 className="font-bold text-center text-lg md:text-3xl font-michroma mb-8">
          Our Products
        </h1>
      </motion.div>

      {/* Cards & Info Section */}
      <div className="flex flex-col sm:flex-row gap-8 items-start justify-center">
        {/* Left Cards */}
        <motion.div
          ref={leftCardsRef}
          className="flex flex-col gap-6 px-4 w-full lg:w-1/3"
          initial="hidden"
          animate={isLeftCardsInView ? "visible" : "hidden"}
        >
          {[1, 2].map((pos, i) => (
            <motion.div
              key={pos}
              custom={i}
              variants={cardVariants}
              className="w-full h-48 bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer flex items-center justify-center"
              onClick={() => positions[pos] && openModal(positions[pos])}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {positions[pos] ? (
                <motion.img
                  src={positions[pos].image || "/placeholder.png"} // fix: placeholder image
                  alt={positions[pos].title || "Product Image"}
                  className="w-auto h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <span className="text-gray-400">Card {pos} Empty</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Info Section */}
        <motion.div
          ref={infoRef}
          className="w-full m-auto lg:w-1/3 text-center flex flex-col items-center justify-center"
          initial="hidden"
          animate={isInfoInView ? "visible" : "hidden"}
        >
          <h2 className="text-2xl font-josefin font-bold mb-4">New Product</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 text-left">
            <li>Trending item in market</li>
            <li>Available in all regions</li>
            <li>Click card for full details</li>
          </ul>
          <motion.button
            className="px-6 py-2 font-michroma text-sm bg-red-600 text-white rounded hover:bg-red-700 mx-auto"
            onClick={() => navigate("/AllProducts")}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More Details
          </motion.button>
        </motion.div>

        {/* Right Cards */}
        <motion.div
          ref={rightCardsRef}
          className="flex flex-col px-4 gap-6 w-full lg:w-1/3"
          initial="hidden"
          animate={isRightCardsInView ? "visible" : "hidden"}
        >
          {[3, 4].map((pos, i) => (
            <motion.div
              key={pos}
              custom={i}
              variants={cardVariants}
              className="w-full h-48 bg-white rounded-lg overflow-hidden shadow-md cursor-pointer flex items-center justify-center"
              onClick={() => positions[pos] && openModal(positions[pos])}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {positions[pos] ? (
                <motion.img
                  src={positions[pos].image || "/placeholder.png"} // fix: placeholder image
                  alt={positions[pos].title || "Product Image"}
                  className="w-auto h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <span className="text-gray-400">Card {pos} Empty</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </motion.button>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img
                    src={selectedCard.image || "/placeholder.png"} // fix: placeholder image
                    alt={selectedCard.title || "Product Image"}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                </div>

                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedCard.title || "No Title Available"}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900">Material</h3>
                      <p className="text-gray-600">
                        {selectedCard.shortDescription ||
                          "No description available"}
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
                              <li key={index}>{feature || "N/A"}</li> // fix: placeholder for empty feature
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardShowcase;
