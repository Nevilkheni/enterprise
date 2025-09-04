// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// function OurStory() {
//   const navigate = useNavigate();

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3,
//         when: "beforeChildren",
//       },
//     },
//   };

//   const videoVariants = {
//     hidden: { x: -100, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//       },
//     },
//   };

//   const textVariants = {
//     hidden: { x: 100, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="bg-white"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <div className="w-full pt-6 md:pt-10 text-center">
//         <motion.h1
//           className="text-lg md:text-3xl font-michroma  font-bold text-black"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           Our Story
//         </motion.h1>
//       </div>

//       <div className="max-w-5xl mx-auto  py-10 grid md:grid-cols-2 gap-8 items-center">
//         <motion.div className="w-full aspect-video" variants={videoVariants}>
//           <iframe
//             className="w-full h-full rounded-lg shadow-lg"
//             src="https://www.youtube.com/embed/VIDEO_ID"
//             title="Our Story Video"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </motion.div>

//         <motion.div
//           className="text-center md:text-left"
//           variants={textVariants}
//         >
//           <h2 className="md:text-2xl font-semibold   text-black mb-4">
//             Simple Beginnings, Clear Vision
//           </h2>
//           <p className="text-gray-800 leading-relaxed mb-6">
//             "Our mission is to bridge creativity with craftsmanship by offering
//             high-quality sequence designing materials for embroidery. We strive
//             to provide designers and artisans with products that inspire
//             innovation, add elegance to every creation, and deliver reliable
//             quality with exceptional service at every step."
//           </p>
//           <motion.button
//             onClick={() => navigate("/about")}
//             className="px-6 py-2 bg-red-600 font-michroma text-sm text-white font-medium rounded hover:bg-red-800 transition"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             About Us
//           </motion.button>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// export default OurStory;


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function OurStory() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const videoVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const textVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Title */}
      <div className="w-full pt-6 md:pt-10 text-center">
        <motion.h1
          className="text-lg md:text-3xl font-michroma font-bold text-black"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our Story
        </motion.h1>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto py-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Video */}
        <motion.div className="w-full aspect-video" variants={videoVariants}>
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
            title="Our Story Video"
            frameBorder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>

        {/* Text */}
        <motion.div
          className="text-center md:text-left"
          variants={textVariants}
        >
          <h2 className="md:text-2xl font-semibold text-black mb-4">
            Simple Beginnings, Clear Vision
          </h2>
          <p className="text-gray-800 leading-relaxed mb-6">
            Our mission is to bridge creativity with craftsmanship by offering
            high-quality sequence designing materials for embroidery. We strive
            to provide designers and artisans with products that inspire
            innovation, add elegance to every creation, and deliver reliable
            quality with exceptional service at every step.
          </p>

          <motion.button
            onClick={() => navigate("/about")}
            aria-label="Learn more about us"
            className="px-6 py-2 bg-red-600 font-michroma text-sm text-white font-medium rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            About Us
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default OurStory;
