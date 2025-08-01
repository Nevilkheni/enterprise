import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Cutting-edge gadgets and devices",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 42,
    color: "bg-blue-100",
    textColor: "text-blue-800"
  },
  {
    id: 2,
    name: "Computers",
    description: "Laptops, desktops and accessories",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 36,
    color: "bg-purple-100",
    textColor: "text-purple-800"
  },
  {
    id: 3,
    name: "Smartphones",
    description: "Latest mobile devices",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 28,
    color: "bg-green-100",
    textColor: "text-green-800"
  },
  {
    id: 4,
    name: "Audio",
    description: "Headphones and speakers",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 19,
    color: "bg-red-100",
    textColor: "text-red-800"
  },
  {
    id: 5,
    name: "Wearables",
    description: "Smart watches and fitness trackers",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 15,
    color: "bg-yellow-100",
    textColor: "text-yellow-800"
  },
  {
    id: 6,
    name: "Gaming",
    description: "Consoles and accessories",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    count: 22,
    color: "bg-indigo-100",
    textColor: "text-indigo-800"
  },
];

// Animation variants
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
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of technology products organized by category
        </p>
      </motion.div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link to={`/category/${category.id}`} className="block">
              {/* Category Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Category Info */}
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

                {/* View Button */}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((category) => (
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