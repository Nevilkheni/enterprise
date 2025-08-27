import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import middleSectionBg from "../assets/image/midellimge1.png";
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
  {
    name: "item 9",
    img: glitter,
    type: "Fruit Bar",
    size: "40g bar",
    length: "500m",
  },
  {
    name: "item 10",
    img: silver,
    type: "Drink",
    size: "200ml bottle",
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

  const formVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { scale: 0.9, opacity: 0 },
  };

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

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormData({
      name: "",
      mobile: "",
      message: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGetPrice = () => {
    if (!formData.name || !formData.mobile) {
      alert("Please fill in your name and mobile number");
      return;
    }

    if (!selectedProduct) return;

    let message = `Hello! I would like to get price for this product.%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${formData.name}%0A`;
    message += `Mobile: ${formData.mobile}%0A`;
    if (formData.message) message += `Message: ${formData.message}%0A%0A`;

    message += `*Product Details:*%0A`;
    message += `Product Name: ${selectedProduct.name}%0A`;
    message += `Type: ${selectedProduct.type}%0A`;
    message += `Size: ${selectedProduct.size}%0A`;
    message += `Length: ${selectedProduct.length}%0A%0A`;
    message += `Price Quote Request`;

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
      className="w-full p-4  bg-cover bg-center bg-no-repeat bg-fixed text-center"
      style={{ backgroundImage: `url(${middleSectionBg})` }}
    >
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

      <motion.div
        ref={gridRef}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="m-6 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6"
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
                      className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold flex items-center justify-center"
                      variants={modalContentVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.极客时间-.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.极客时间-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 极客时间 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 极客时间 11.893-11.893A11.821 11.821 0 0020.864 3.49" />
                      </svg>
                      Get Price
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.极客时间-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.极客时间-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 极客时间 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.49" />
                  </svg>
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
