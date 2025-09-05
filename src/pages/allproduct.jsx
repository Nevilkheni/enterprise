import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ Country List
const countries = [
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "United States", code: "US", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", dialCode: "+44" },
  { name: "Canada", code: "CA", dialCode: "+1" },
  { name: "Australia", code: "AU", dialCode: "+61" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966" },
  { name: "Germany", code: "DE", dialCode: "+49" },
  { name: "France", code: "FR", dialCode: "+33" },
  { name: "Singapore", code: "SG", dialCode: "+65" },
];

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  // ✅ Form Data
  const [formData, setFormData] = useState({
    phone: '+91',
    email: user?.email || '',
    message: '',
    productName: '',
    productImage: '',
    productDescription: ''
  });

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find(c => c.dialCode === "+91") || countries[0]
  );

  // ✅ Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Update email from logged-in user
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  // ✅ Filter products by search
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Open Product Detail Modal
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // ✅ Open Price Inquiry Modal
  const openPriceModal = (product) => {
    if (!user) {
      alert('Please login to get price information');
      return;
    }
    setSelectedProduct(product);
    setFormData({
      phone: selectedCountry.dialCode,
      email: user?.email || '',
      message: '',
      productName: product.name || '',
      productImage: product.image || '',
      productDescription: product.description || ''
    });
    setIsPriceModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // ✅ Close Modals
  const closeModal = () => {
    setIsModalOpen(false);
    setIsPriceModalOpen(false);
    setSelectedProduct(null);
    setShowCountryDropdown(false);
    document.body.style.overflow = 'auto';
  };

  // ✅ Handle Country Select
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setFormData({
      ...formData,
      phone: country.dialCode + (formData.phone.replace(/^\+\d+/, ''))
    });
  };

  // ✅ Phone Change
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith(selectedCountry.dialCode) || value === '') {
      setFormData({
        ...formData,
        phone: value
      });
    }
  };

  // ✅ Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // ✅ Form Submit → WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const whatsappMessage = `Hello, I'm interested in this product:

*Product Details:*
🔹 Name: ${formData.productName}
🔹 Description: ${formData.productDescription || "No description available"}
${selectedProduct?.material ? `🔹 Material: ${selectedProduct.material}` : ''}
${selectedProduct?.thickness ? `🔹 Thickness: ${selectedProduct.thickness}` : ''}
${selectedProduct?.length ? `🔹 Length: ${selectedProduct.length}` : ''}

*My Contact Information:*
📱 Phone: ${formData.phone}
📧 Email: ${formData.email}
🌍 Country: ${selectedCountry.name}

*My Message:*
${formData.message}

Please provide more details about pricing and availability.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/916351091508?text=${encodedMessage}`, '_blank');
    closeModal();
  };

  // ✅ Loading & Error States
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-2">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
      
      {/* ✅ Search Bar */}
      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search products by name..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 transition-colors"
          onClick={() => setSearchTerm('')}
        >
          Clear
        </button>
      </div>

      {/* ✅ Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? 'No products match your search' : 'No products available'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div 
                className="w-full pt-[100%] relative bg-gray-100 cursor-pointer overflow-hidden"
                onClick={() => openModal(product)}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-contain p-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-product.png";
                    }}
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              
              <div className="p-3 flex flex-col flex-grow">
                <h3 
                  className="font-medium text-gray-800 text-center mb-2 line-clamp-2 cursor-pointer"
                  onClick={() => openModal(product)}
                >
                  {product.name}
                </h3>
                
                <button
                  onClick={() => openPriceModal(product)}
                  className="mt-auto px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                  disabled={!user}
                >
                  Get Price
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✅ Product Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
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
                <div className="md:w-1/2 h-64 md:h-auto">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full p-16 rounded-md object-cover"
                  />
                </div>
                
                <div className="md:w-1/2 p-6 overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProduct.name}
                    </h2>
                    <button 
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    {selectedProduct.description}
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
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button 
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      onClick={() => {
                        setIsModalOpen(false);
                        openPriceModal(selectedProduct);
                      }}
                      disabled={!user}
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
        )}
      </AnimatePresence>

      {/* ✅ Price Inquiry Modal */}
      <AnimatePresence>
        {isPriceModalOpen && selectedProduct && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hidden md:flex">
                <div className="w-1/2 p-6 flex items-center justify-center bg-gray-100">
                  {selectedProduct.image ? (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="max-h-[70vh] object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-lg">No Image Available</div>
                  )}
                </div>
                
                <div className="w-1/2 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">Price Inquiry: {selectedProduct.name}</h3>
                    <button 
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ✅ Phone */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">Phone Number*</label>
                      <div className="relative">
                        <div 
                          className="absolute left-0 top-0 h-full flex items-center pl-3 cursor-pointer border-r border-gray-300 pr-2 bg-gray-100 rounded-l"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        >
                          <span>{selectedCountry.dialCode}</span>
                          <svg 
                            className={`w-4 h-4 ml-1 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="w-full pl-24 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                        {showCountryDropdown && (
                          <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
                            {countries.map((country) => (
                              <div
                                key={country.code}
                                className={`px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${selectedCountry.code === country.code ? 'bg-gray-100' : ''}`}
                                onClick={() => handleCountrySelect(country)}
                              >
                                <span className="mr-2 font-medium">{country.dialCode}</span>
                                <span className="text-sm">{country.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* ✅ Email */}
                    <div>
                      <label className="block text-gray-700 mb-1">Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    
                    {/* ✅ Message */}
                    <div>
                      <label className="block text-gray-700 mb-1">Message*</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows="3"
                        placeholder="Please include any specific requirements or questions about this product"
                        required
                      ></textarea>
                    </div>
                    
                    {/* ✅ Buttons */}
                    <div className="pt-2 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Send via WhatsApp
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* ✅ Mobile View */}
              <div className="md:hidden p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">Price Inquiry: {selectedProduct.name}</h3>
                  <button 
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
                <div className="mb-4 bg-gray-100 flex items-center justify-center p-4 rounded-lg">
                  {selectedProduct.image ? (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="h-32 object-contain"
                    />
                  ) : (
                    <div className="text-gray-400">No Image Available</div>
                  )}
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Phone Number*</label>
                    <div className="relative">
                      <div 
                        className="absolute left-0 top-0 h-full flex items-center pl-3 cursor-pointer border-r border-gray-300 pr-2 bg-gray-100 rounded-l"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      >
                        <span>{selectedCountry.dialCode}</span>
                        <svg 
                          className={`w-4 h-4 ml-1 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full pl-24 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                      {showCountryDropdown && (
                        <div className="absolute left-0 mt-1 w-56 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
                          {countries.map((country) => (
                            <div
                              key={country.code}
                              className={`px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${selectedCountry.code === country.code ? 'bg-gray-100' : ''}`}
                              onClick={() => handleCountrySelect(country)}
                            >
                              <span className="mr-2 font-medium">{country.dialCode}</span>
                              <span className="text-sm">{country.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Message*</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      rows="3"
                      placeholder="Please include any specific requirements or questions about this product"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="pt-2 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Send via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AllProducts;