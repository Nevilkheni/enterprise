
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiTruck, FiSettings, FiPackage } from "react-icons/fi";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: <FiUsers className="text-3xl md:text-4xl" />,
      value: "95%",
      label: "Happy Customers",
      description: "Satisfied clients across India",
    },
    {
      icon: <FiTruck className="text-3xl md:text-4xl" />,
      value: "All India",
      label: "Shipping Coverage",
      description: "We deliver to every corner of India",
    },
    {
      icon: <FiSettings className="text-3xl md:text-4xl" />,
      value: "15+",
      label: "Total Machinery",
      description: "Advanced equipment for quality production",
    },
    {
      icon: <FiPackage className="text-3xl md:text-4xl" />,
      value: "2x",
      label: "Production Capacity",
      description: "Manufacturing and job work services",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.2 },
        },
      }}
      className="my-16 md:my-24"
    >
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-2 md:p-6 text-white shadow-xl overflow-hidden relative">
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-red-400 opacity-20"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-red-400 opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-lg md:text-2xl font-michroma font-bold mb-2 text-center">
            Why Choose Jyot Sequence?
          </h2>
          <p className="font-josefin text-center text-sm mb-4 md:mb-6 text-red-100">
            Delivering excellence since 2008 with cutting-edge technology and
            unmatched service
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-2 text-center border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="flex justify-center mb-2 text-white">
                  {stat.icon}
                </div>
                <motion.div
                  className="text-lg md:text-xl font-michroma font-bold mb-2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.2 + 0.5,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="font-michroma font-semibold mb-2">
                  {stat.label}
                </div>
                <p className="font-josefin text-sm text-red-100">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;
