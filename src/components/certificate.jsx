import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import midelImg from "../assets/image/logo.png";
import NatureofBusiness from "../assets/image/bussnes.png";
import iso from "../assets/image/leagal.png";
import QualityAssurance from "../assets/image/hand.png";
import ExpertTeam from "../assets/image/staff.png";

function Certificate() {
  const [isRotating, setIsRotating] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 2000);
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const dividerVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.8, delay: 0.3 } }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    })
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        delay: 0.6, 
        type: "spring", 
        stiffness: 100 
      } 
    },
    spinning: {
      rotate: 360,
      transition: { 
        duration: 2, 
        ease: "linear",
        repeat: Infinity 
      }
    }
  };

  return (
    <div 
      className="bg-transparent m-auto py-12 px-6 text-center"
      ref={sectionRef}
    >
      <motion.h2 
        className="text-lg md:text-3xl font-michroma font-bold text-black mb-2"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        Why Choose Us
      </motion.h2>

      <motion.div 
        className="w-16 h-1 bg-black mx-auto mb-10 rounded-full"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={dividerVariants}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
        <div className="space-y-8">
          <motion.div 
            className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            custom={0}
            whileHover={{ y: -5 }}
          >
            <img src={NatureofBusiness} alt="icon" className="w-8 h-8" />
            <div className="text-left">
              <h3 className="font-semibold  text-lg">Nature of Business</h3>
              <p className="text-sm text-gray-600">Manufacturer & Exporter</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            custom={1}
            whileHover={{ y: -5 }}
          >
            <img src={iso} alt="icon" className="w-14 h-14" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">An ISO 22000:2018</h3>
              <p className="text-sm text-gray-600">Certified Company</p>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <motion.img
            src={midelImg}
            alt="img"
            className="w-60 h-auto mx-auto cursor-pointer"
            onClick={handleClick}
            initial="hidden"
            animate={isRotating ? "spinning" : isInView ? "visible" : "hidden"}
            variants={logoVariants}
            whileHover={{ scale: 1.05 }}
          />
        </div>

        <div className="space-y-8">
          <motion.div 
            className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            custom={2}
            whileHover={{ y: -5 }}
          >
            <img src={QualityAssurance} alt="icon" className="w-10 h-10" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Quality Assurance</h3>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white shadow-md p-6 rounded-lg flex items-center gap-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={cardVariants}
            custom={3}
            whileHover={{ y: -5 }}
          >
            <img src={ExpertTeam} alt="icon" className="w-10 h-10" />
            <div className="text-left">
              <h3 className="font-semibold text-lg">Expert Team</h3>
              <p className="text-sm text-gray-600">
                Offers a wide range of products and solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;