
import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import compnylogo from "../assets/image/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const userMenuRef = useRef(null);

  const leftNavItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Category", path: "/category" },
  ];

  const rightNavItems = [
    { name: "About", path: "/about" },
    { name: "Shop", path: "/shop" }, // fix: typo corrected
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNavigation = (path) => {
    if (location.pathname !== path && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        navigate(path);
        setMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gray-200 shadow-sm font-josefin sticky top-0 mx-0 lg:mx-4 rounded-lg z-50 border-b border-b-gray-900"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* User / Login */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                    aria-label="User menu"
                    aria-haspopup="true"
                    aria-expanded={userMenuOpen}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-red-400 flex items-center justify-center text-white font-medium"
                    >
                      {user.email.charAt(0).toUpperCase()}
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                      >
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors duration-150"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation("/login")}
                  className="flex items-center space-x-1 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-indigo-600 text-white rounded-lg hover:from-red-700 hover:to-indigo-700 transition-all shadow-sm"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </motion.button>
              )}
            </div>

            {/* Left Nav */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {leftNavItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-red-600 px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
                  aria-label={`Go to ${item.name}`}
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 cursor-pointer flex items-center mx-2"
              onClick={() => handleNavigation("/")}
            >
              <img
                src={compnylogo}
                alt="Jyot Enterprise Logo" // fix: proper alt text
                className="h-8 w-auto"
              />
              <span className="font-michroma text-sm md:text-lg font-bold text-red-600 ml-1 sm:ml-2">
                Jyot<span className="text-gray-900">Enterprise</span>
              </span>
            </motion.div>

            {/* Right Nav */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {rightNavItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-red-600 px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
                  aria-label={`Go to ${item.name}`}
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNavigation("/cart")}
                className="p-2 rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50 relative"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </motion.button>

              <div className="lg:hidden flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition"
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                >
                  {menuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {[...leftNavItems, ...rightNavItems].map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    whileHover={{ x: 5 }}
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50"
                    aria-label={`Go to ${item.name}`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>

              {/* Mobile User Section */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5 space-x-3">
                  {user ? (
                    <>
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.email}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleLogout}
                        className="flex-shrink-0 p-2 rounded-full text-gray-400 hover:text-gray-500"
                        aria-label="Logout"
                      >
                        <LogOut className="h-5 w-5" />
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigation("/login")}
                      className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-600 to-indigo-600 text-white rounded-lg hover:from-red-700 hover:to-indigo-700 transition-all"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Sign in
                    </motion.button>
                  )}
                </div>
                <div className="mt-3 px-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavigation("/cart")}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    View Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;
