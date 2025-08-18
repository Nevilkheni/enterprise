import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "All Products",
    description: "Browse our complete product collection",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 120,
    color: "bg-blue-100",
    textColor: "text-blue-800"
  },
  {
    id: 2,
    name: "Roll",
    description: "Various types of rolls for industrial use",
    image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 45,
    color: "bg-green-100",
    textColor: "text-green-800"
  },
  {
    id: 3,
    name: "CD",
    description: "Compact discs and related media",
    image: "https://images.unsplash.com/photo-1583997057406-624d304ac6d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 32,
    color: "bg-purple-100",
    textColor: "text-purple-800"
  },
  {
    id: 4,
    name: "Spool",
    description: "Industrial spools and reels",
    image: "https://images.unsplash.com/photo-1587840178395-940e4f6d6f5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 28,
    color: "bg-yellow-100",
    textColor: "text-yellow-800"
  },
  {
    id: 5,
    name: "Others",
    description: "Additional products and miscellaneous items",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 15,
    color: "bg-red-100",
    textColor: "text-red-800"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Category = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
    >
      <motion.div 
        variants={itemVariants}
        className="text-center mb-12"
      >
        <h1 className="text-lg md:text-3xl font-michroma  font-bold text-gray-900 mb-4">Shop by Category</h1>
        <p className="font-josefin text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of products organized by category
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link to={`/category/${category.id}`} className="block">
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className={`p-6 ${category.color}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-bold ${category.textColor} mb-1`}>
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.textColor} ${category.color.replace('100', '200')}`}>
                    {category.count} items
                  </span>
                </div>

                <div className="mt-4">
                  <span className={`inline-flex items-center ${category.textColor} font-medium group-hover:underline`}>
                    View all
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={itemVariants}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link 
              key={`featured-${category.id}`}
              to={`/category/${category.id}`}
              className={`${category.color} p-4 rounded-lg text-center hover:shadow-md transition`}
            >
              <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span className={`text-2xl font-bold ${category.textColor}`}>
                  {category.name.charAt(0)}
                </span>
              </div>
              <h3 className={`font-medium ${category.textColor}`}>{category.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{category.count} products</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Category;