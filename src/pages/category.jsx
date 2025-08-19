import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import allproducts from "../assets/image/allimages.png";

const Category = ({ productCount }) => {
  const displayCount = productCount !== undefined ? productCount : "Loading...";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Shop Categories
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {typeof displayCount === "number"
            ? `Browse our complete product collection (${displayCount} items available)`
            : "Loading product collection..."}
        </p>
      </div>

      <div className="flex justify-center">
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-sm"
        >
          <Link to="/allproducts" className="block">
            <div className="h-48 overflow-hidden bg-gray-100">
              <img
                src={allproducts}
                alt="All Products"
                className="w-full h-full  object-cover transform group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="bg-blue-100 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-1">
                    All Products
                  </h3>
                  <p className="text-gray-600">
                    {typeof displayCount === "number"
                      ? `Total ${displayCount} ${
                          displayCount === 1 ? "product" : "products"
                        } available`
                      : "Loading products..."}
                  </p>
                </div>
                {typeof displayCount === "number" && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold text-blue-800 bg-blue-200">
                    {displayCount} {displayCount === 1 ? "item" : "items"}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center text-blue-800 font-medium group-hover:underline">
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
      </div>
    </div>
  );
};

export default Category;
