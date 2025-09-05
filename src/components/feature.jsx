
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import middleSectionBg from "../assets/image/midellimge1.jpg";
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
];

function Feature() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    message: "",
  });

  const titleRef = useRef(null);
  const searchRef = useRef(null);
  const gridRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isSearchInView = useInView(searchRef, { once: true, margin: "-100px" });
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  const searchVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.2, type: "spring" },
    },
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
        damping: 10,
      },
    }),
  };
  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { scale: 0.9, opacity: 0 },
  };
  const formVariants = modalVariants;
  const modalContentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => {
    setIsFormOpen(false);
    setFormData({ name: "", mobile: "", message: "" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGetPrice = () => {
    if (!formData.name || !formData.mobile) {
      alert("Please fill in your name and mobile number");
      return;
    }
    if (!selectedProduct) return;

    let message = `Hello! I would like to get price for this product.%0A%0A`;
    message += `*Customer Details:*%0AName: ${formData.name}%0AMobile: ${formData.mobile}%0A`;
    if (formData.message) message += `Message: ${formData.message}%0A%0A`;
    message += `*Product Details:*%0AProduct Name: ${selectedProduct.name}%0AType: ${selectedProduct.type}%0ASize: ${selectedProduct.size}%0ALength: ${selectedProduct.length}%0A%0APrice Quote Request`;

    window.open(`https://wa.me/916351091508?text=${message}`, "_blank");
    closeForm();
    closeModal();
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
      className="w-full p-4 bg-cover bg-center bg-no-repeat bg-fixed text-center"
      style={{ backgroundImage: `url(${middleSectionBg})` }}
    >
      {/* Title */}
      <motion.div
        ref={titleRef}
        initial="hidden"
        animate={isTitleInView ? "visible" : "hidden"}
        variants={titleVariants}
      >
        <h2 className="text-lg md:text-3xl font-michroma font-bold text-white backdrop-blur-3xl p-4">
          Feature Products
        </h2>
      </motion.div>

      {/* Search */}
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
          className="w-full p-2 m-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

      {/* Product Grid */}
      <motion.div
        ref={gridRef}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="my-8 max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-4"
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={productCardVariants}
              className="border rounded-lg pb-4 hover:shadow-lg transition-shadow bg-white cursor-pointer flex flex-col"
              onClick={() => openModal(product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={product.img}
                alt={product.name}
                className="w-full h-40 p-4 object-contain mb-3"
                whileHover={{ scale: 1.1 }}
              />
              <h3 className="text-sm font-semibold text-black px-2">
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg max-w-4xl w-full p-6"
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
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  variants={modalContentVariants}
                >
                  ✕
                </motion.button>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                <motion.div
                  className="lg:w-1/2"
                  variants={modalContentVariants}
                >
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    className="w-full h-64 lg:h-80 object-contain rounded-lg"
                  />
                </motion.div>

                <motion.div
                  className="lg:w-1/2 flex flex-col justify-between"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                >
                  <div className="space-y-4">
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
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <motion.button
                      onClick={closeModal}
                      className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                      variants={modalContentVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                    <motion.button
                      onClick={openForm}
                      className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                      variants={modalContentVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Price
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <AnimatePresence>
        {isFormOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full p-6"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-start mb-4">
                <motion.h3
                  className="text-xl font-bold"
                  variants={modalContentVariants}
                >
                  Get Price for {selectedProduct.name}
                </motion.h3>
                <motion.button
                  onClick={closeForm}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  variants={modalContentVariants}
                >
                  ✕
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      handleFormChange({ target: { name: "mobile", value } });
                    }}
                    maxLength={10}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your 10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Any additional information..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  onClick={closeForm}
                  className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleGetPrice}
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send to WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Feature;
