import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import allproducts from "../assets/image/allimages.png";
import cdImage from "../assets/image/img3.jpg"; 
import spoolImage from "../assets/image//blank.png";
import rollImage from "../assets/image/roll2.png";

const Category = () => {
  const { categoryType } = useParams();
  const [products, setProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({
    all: 0,
    cd: 0,
    spool: 0,
    roll: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const allProductsQuery = collection(db, "allProducts");
        const allProductsSnapshot = await getDocs(allProductsQuery);
        const allCount = allProductsSnapshot.size;
        
        const cdQuery = query(collection(db, "categories"), where("categoryType", "==", "cd"));
        const cdSnapshot = await getDocs(cdQuery);
        const cdCount = cdSnapshot.size;
        
        const spoolQuery = query(collection(db, "categories"), where("categoryType", "==", "spool"));
        const spoolSnapshot = await getDocs(spoolQuery);
        const spoolCount = spoolSnapshot.size;
        
        const rollQuery = query(collection(db, "categories"), where("categoryType", "==", "roll"));
        const rollSnapshot = await getDocs(rollQuery);
        const rollCount = rollSnapshot.size;
        
        setProductCounts({
          all: allCount,
          cd: cdCount,
          spool: spoolCount,
          roll: rollCount
        });

        if (categoryType && categoryType !== "all") {
          const categoryQuery = query(
            collection(db, "categories"), 
            where("categoryType", "==", categoryType)
          );
          const categorySnapshot = await getDocs(categoryQuery);
          const categoryProducts = categorySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProducts(categoryProducts);
        } else if (categoryType === "all") {
          const allProductsSnapshot = await getDocs(collection(db, "allProducts"));
          const allProducts = allProductsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryType]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const categories = [
    {
      id: "all",
      name: "All Products",
      image: allproducts,
      path: "/category/all",
      count: productCounts.all,
      description: "Browse our complete product collection"
    },
    {
      id: "cd",
      name: "CD Products",
      image: cdImage,
      path: "/category/cd",
      count: productCounts.cd,
      description: "Explore our CD collection"
    },
    {
      id: "spool",
      name: "Spool Products",
      image: spoolImage,
      path: "/category/spool",
      count: productCounts.spool,
      description: "Discover our spool offerings"
    },
    {
      id: "roll",
      name: "Roll Products",
      image: rollImage,
      path: "/category/roll",
      count: productCounts.roll,
      description: "Check out our roll products"
    }
  ];

  const getBgColor = (categoryId) => {
    switch(categoryId) {
      case "all": return "bg-blue-100";
      case "cd": return "bg-green-100";
      case "spool": return "bg-purple-100";
      case "roll": return "bg-orange-100";
      default: return "bg-gray-100";
    }
  };

  const getTextColor = (categoryId) => {
    switch(categoryId) {
      case "all": return "text-blue-800";
      case "cd": return "text-green-800";
      case "spool": return "text-purple-800";
      case "roll": return "text-orange-800";
      default: return "text-gray-800";
    }
  };

  const getBorderColor = (categoryId) => {
    switch(categoryId) {
      case "all": return "border-blue-200";
      case "cd": return "border-green-200";
      case "spool": return "border-purple-200";
      case "roll": return "border-orange-200";
      default: return "border-gray-200";
    }
  };

  if (categoryType) {
    if (loading) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {categoryType.charAt(0).toUpperCase() + categoryType.slice(1)} Products
            </h1>
            <div className="flex justify-center">
              <div className="animate-pulse bg-gray-200 rounded-xl w-64 h-8"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-80"></div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {categoryType.charAt(0).toUpperCase() + categoryType.slice(1)} Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {products.length} {products.length === 1 ? "product" : "products"} available
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <Link 
              to="/category" 
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Back to Categories
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <motion.div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => openModal(product)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name || product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      {product.name || product.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                to="/category" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Categories
              </Link>
            </div>
          </>
        )}

        {/* Product Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedProduct && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="md:w-1/2 h-64 md:h-auto">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name || selectedProduct.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="md:w-1/2 p-6 overflow-y-auto">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {selectedProduct.name || selectedProduct.title}
                        </h2>
                        <button 
                          onClick={closeModal}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {selectedProduct.description || selectedProduct.shortDescription}
                      </p>
                      
                      <div className="space-y-2 mb-6">
                        {selectedProduct.material && (
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Material:</span> {selectedProduct.material}
                          </p>
                        )}
                        {selectedProduct.thickness && (
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Thickness:</span> {selectedProduct.thickness}
                          </p>
                        )}
                        {selectedProduct.length && (
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Length:</span> {selectedProduct.length}
                          </p>
                        )}
                        {selectedProduct.price && (
                          <p className="text-lg font-semibold text-gray-900 mt-4">
                            Price: {selectedProduct.price}₹
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <button 
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            // Handle get price action
                            alert(`Price for ${selectedProduct.name || selectedProduct.title}: ${selectedProduct.price}₹`);
                          }}
                        >
                          Get Price
                        </button>
                        <button 
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                          onClick={closeModal}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Loading product categories...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-80"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop Categories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our complete product collection ({productCounts.all} items available)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border ${getBorderColor(category.id)}`}
          >
            <Link to={category.path} className="block">
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className={`p-6 ${getBgColor(category.id)}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${getTextColor(category.id)}`}>
                      {category.name}
                    </h3>
                    <p className="text-gray-600">
                      {category.count} {category.count === 1 ? "product" : "products"} available
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTextColor(category.id)} ${getBgColor(category.id).replace('100', '200')}`}>
                    {category.count} {category.count === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="mt-4">
                  <span className={`inline-flex items-center font-medium group-hover:underline ${getTextColor(category.id)}`}>
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
    </div>
  );
};

export default Category;