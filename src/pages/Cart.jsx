import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Cart({ cart, onRemoveFromCart, onUpdateQuantity }) {
  const grandTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { opacity: 0, x: -50 }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center py-10 px-4"
    >
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="font-michroma text-xl font-bold text-gray-800">
            Your Shopping Cart
          </h1>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium"
          >
            {cart.length} {cart.length === 1 ? "Item" : "Items"}
          </motion.span>
        </motion.div>

        <AnimatePresence>
          {cart.length === 0 ? (
            <motion.div
              key="empty-cart"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center h-96"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mb-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </motion.div>
              <h3 className=" font-bold text-gray-700 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added anything to your cart yet
              </p>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md"
              >
                Continue Shopping
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="cart-items"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="hidden lg:block bg-white rounded-xl shadow-lg overflow-hidden mb-8"
              >
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="py-4 px-6 text-left font-semibold text-gray-700">
                        Product
                      </th>
                      <th className="py-4 px-6 text-center font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="py-4 px-6 text-center font-semibold text-gray-700">
                        Quantity
                      </th>
                      <th className="py-4 px-6 text-center font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="py-4 px-6 text-center font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {cart.map((item, idx) => (
                        <motion.tr
                          key={item.id || idx}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="border-b hover:bg-gray-50 transition duration-150"
                        >
                          <td className="py-6 px-6">
                            <div className="flex items-center">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border border-gray-200"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </motion.div>
                              <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-800">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  SKU: {idx + 1000}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-6 px-6 text-center">
                            <span className="font-medium text-gray-800">
                              {item.price.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })}
                            </span>
                          </td>
                          <td className="py-6 px-6 text-center">
                            <div className="flex items-center justify-center">
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-500 hover:text-indigo-600 p-1 rounded-full hover:bg-gray-100"
                                onClick={() =>
                                  onUpdateQuantity(idx, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                  />
                                </svg>
                              </motion.button>
                              <span className="mx-3 text-gray-700 font-medium">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-gray-500 hover:text-indigo-600 p-1 rounded-full hover:bg-gray-100"
                                onClick={() =>
                                  onUpdateQuantity(idx, item.quantity + 1)
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </motion.button>
                            </div>
                          </td>
                          <td className="py-6 px-6 text-center">
                            <span className="font-bold text-indigo-600">
                              {(item.price * item.quantity).toLocaleString(
                                "en-IN",
                                {
                                  style: "currency",
                                  currency: "INR",
                                }
                              )}
                            </span>
                          </td>
                          <td className="py-6 px-6 text-center">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onRemoveFromCart(idx)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="lg:hidden space-y-4 mb-8"
              >
                <AnimatePresence>
                  {cart.map((item, idx) => (
                    <motion.div
                      key={item.id || idx}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                    >
                      <div className="p-4">
                        <div className="flex items-start">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden border border-gray-200"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </motion.div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-medium text-gray-800">
                              {item.name}
                            </h3>
                            <p className="text-indigo-600 font-semibold mt-1">
                              {item.price.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })}
                            </p>
                            <div className="flex items-center mt-3">
                              <span className="text-gray-600 mr-3">Qty:</span>
                              <div className="flex items-center border rounded-lg overflow-hidden">
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  onClick={() =>
                                    onUpdateQuantity(idx, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </motion.button>
                                <span className="px-3 py-1 bg-white text-gray-800 font-medium">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200"
                                  onClick={() =>
                                    onUpdateQuantity(idx, item.quantity + 1)
                                  }
                                >
                                  +
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="font-medium text-gray-700">
                            Total:
                          </span>
                          <span className="font-bold text-indigo-600">
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN",
                              {
                                style: "currency",
                                currency: "INR",
                              }
                            )}
                          </span>
                        </div>
                        <div className="mt-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onRemoveFromCart(idx)}
                            className="w-full py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition flex items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6 mb-8"
              >
                <h3 className="font-michroma font-bold text-gray-800 mb-6">
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {grandTotal.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-800">
                      Grand Total
                    </span>
                    <span className="text-xl font-bold text-indigo-600">
                      {grandTotal.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => navigate("/")}
                  className="flex-1 py-3 px-6 font-michroma text-sm font-bold  bg-gray-200 text-gray-800 rounded-lg  transition flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Continue Shopping
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => navigate("/invoice", { state: { cart } })}
                  className="flex-1 py-3 px-6 font-michroma text-sm bg-indigo-600 text-white rounded-lg font-medium shadow-md flex items-center justify-center"
                >
                  Proceed to Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Cart;