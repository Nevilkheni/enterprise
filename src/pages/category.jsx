import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

import allproducts from "../assets/image/allimages.png";
import cdImage from "../assets/image/img3.jpg"; 
import spoolImage from "../assets/image//blank.png";
import rollImage from "../assets/image/roll2.png";

const countries = [
  { name: "Afghanistan", code: "AF", dialCode: "+93" },
  { name: "Albania", code: "AL", dialCode: "+355" },
  { name: "Algeria", code: "DZ", dialCode: "+213" },
  { name: "Andorra", code: "AD", dialCode: "+376" },
  { name: "Angola", code: "AO", dialCode: "+244" },
  { name: "Argentina", code: "AR", dialCode: "+54" },
  { name: "Armenia", code: "AM", dialCode: "+374" },
  { name: "Australia", code: "AU", dialCode: "+61" },
  { name: "Austria", code: "AT", dialCode: "+43" },
  { name: "Azerbaijan", code: "AZ", dialCode: "+994" },
  { name: "Bahamas", code: "BS", dialCode: "+1-242" },
  { name: "Bahrain", code: "BH", dialCode: "+973" },
  { name: "Bangladesh", code: "BD", dialCode: "+880" },
  { name: "Belarus", code: "BY", dialCode: "+375" },
  { name: "Belgium", code: "BE", dialCode: "+32" },
  { name: "Belize", code: "BZ", dialCode: "+501" },
  { name: "Benin", code: "BJ", dialCode: "+229" },
  { name: "Bhutan", code: "BT", dialCode: "+975" },
  { name: "Bolivia", code: "BO", dialCode: "+591" },
  { name: "Bosnia & Herzegovina", code: "BA", dialCode: "+387" },
  { name: "Brazil", code: "BR", dialCode: "+55" },
  { name: "Brunei", code: "BN", dialCode: "+673" },
  { name: "Bulgaria", code: "BG", dialCode: "+359" },
  { name: "Cambodia", code: "KH", dialCode: "+855" },
  { name: "Cameroon", code: "CM", dialCode: "+237" },
  { name: "Canada", code: "CA", dialCode: "+1" },
  { name: "Chile", code: "CL", dialCode: "+56" },
  { name: "China", code: "CN", dialCode: "+86" },
  { name: "Colombia", code: "CO", dialCode: "+57" },
  { name: "Costa Rica", code: "CR", dialCode: "+506" },
  { name: "Croatia", code: "HR", dialCode: "+385" },
  { name: "Cuba", code: "CU", dialCode: "+53" },
  { name: "Cyprus", code: "CY", dialCode: "+357" },
  { name: "Czech Republic", code: "CZ", dialCode: "+420" },
  { name: "Denmark", code: "DK", dialCode: "+45" },
  { name: "Dominican Republic", code: "DO", dialCode: "+1-809" },
  { name: "Ecuador", code: "EC", dialCode: "+593" },
  { name: "Egypt", code: "EG", dialCode: "+20" },
  { name: "Estonia", code: "EE", dialCode: "+372" },
  { name: "Ethiopia", code: "ET", dialCode: "+251" },
  { name: "Fiji", code: "FJ", dialCode: "+679" },
  { name: "Finland", code: "FI", dialCode: "+358" },
  { name: "France", code: "FR", dialCode: "+33" },
  { name: "Germany", code: "DE", dialCode: "+49" },
  { name: "Greece", code: "GR", dialCode: "+30" },
  { name: "Hong Kong", code: "HK", dialCode: "+852" },
  { name: "Hungary", code: "HU", dialCode: "+36" },
  { name: "Iceland", code: "IS", dialCode: "+354" },
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "Indonesia", code: "ID", dialCode: "+62" },
  { name: "Iran", code: "IR", dialCode: "+98" },
  { name: "Iraq", code: "IQ", dialCode: "+964" },
  { name: "Ireland", code: "IE", dialCode: "+353" },
  { name: "Israel", code: "IL", dialCode: "+972" },
  { name: "Italy", code: "IT", dialCode: "+39" },
  { name: "Japan", code: "JP", dialCode: "+81" },
  { name: "Jordan", code: "JO", dialCode: "+962" },
  { name: "Kazakhstan", code: "KZ", dialCode: "+7" },
  { name: "Kenya", code: "KE", dialCode: "+254" },
  { name: "Kuwait", code: "KW", dialCode: "+965" },
  { name: "Latvia", code: "LV", dialCode: "+371" },
  { name: "Lebanon", code: "LB", dialCode: "+961" },
  { name: "Lithuania", code: "LT", dialCode: "+370" },
  { name: "Luxembourg", code: "LU", dialCode: "+352" },
  { name: "Malaysia", code: "MY", dialCode: "+60" },
  { name: "Maldives", code: "MV", dialCode: "+960" },
  { name: "Mexico", code: "MX", dialCode: "+52" },
  { name: "Morocco", code: "MA", dialCode: "+212" },
  { name: "Nepal", code: "NP", dialCode: "+977" },
  { name: "Netherlands", code: "NL", dialCode: "+31" },
  { name: "New Zealand", code: "NZ", dialCode: "+64" },
  { name: "Nigeria", code: "NG", dialCode: "+234" },
  { name: "Norway", code: "NO", dialCode: "+47" },
  { name: "Oman", code: "OM", dialCode: "+968" },
  { name: "Pakistan", code: "PK", dialCode: "+92" },
  { name: "Philippines", code: "PH", dialCode: "+63" },
  { name: "Poland", code: "PL", dialCode: "+48" },
  { name: "Portugal", code: "PT", dialCode: "+351" },
  { name: "Qatar", code: "QA", dialCode: "+974" },
  { name: "Romania", code: "RO", dialCode: "+40" },
  { name: "Russia", code: "RU", dialCode: "+7" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966" },
  { name: "Singapore", code: "SG", dialCode: "+65" },
  { name: "South Africa", code: "ZA", dialCode: "+27" },
  { name: "South Korea", code: "KR", dialCode: "+82" },
  { name: "Spain", code: "ES", dialCode: "+34" },
  { name: "Sri Lanka", code: "LK", dialCode: "+94" },
  { name: "Sweden", code: "SE", dialCode: "+46" },
  { name: "Switzerland", code: "CH", dialCode: "+41" },
  { name: "Thailand", code: "TH", dialCode: "+66" },
  { name: "Turkey", code: "TR", dialCode: "+90" },
  { name: "Ukraine", code: "UA", dialCode: "+380" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971" },
  { name: "United Kingdom", code: "GB", dialCode: "+44" },
  { name: "United States", code: "US", dialCode: "+1" },
  { name: "Vietnam", code: "VN", dialCode: "+84" },
  { name: "Zimbabwe", code: "ZW", dialCode: "+263" },
];


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
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const { user } = useAuth();
  
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
    countries.find(country => country.dialCode === '+91') || countries[0]
  ); 

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

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

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
      productName: product.name || product.title,
      productImage: product.image || '',
      productDescription: product.description || product.shortDescription || ''
    });
    setIsPriceModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPriceModalOpen(false);
    setSelectedProduct(null);
    setShowCountryDropdown(false);
    document.body.style.overflow = 'auto';
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setFormData({
      ...formData,
      phone: country.dialCode + (formData.phone.replace(/^\+\d+/, ''))
    });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value.startsWith(selectedCountry.dialCode) || value === '') {
      setFormData({
        ...formData,
        phone: value
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const whatsappMessage = `Hello, I'm interested in this product:
    
*Product Details:*
🔹 Name: ${formData.productName}
🔹 Description: ${formData.productDescription || "No description available"}
${selectedProduct.material ? `🔹 Material: ${selectedProduct.material}` : ''}
${selectedProduct.thickness ? `🔹 Thickness: ${selectedProduct.thickness}` : ''}
${selectedProduct.length ? `🔹 Length: ${selectedProduct.length}` : ''}

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
      name: "Roll ",
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
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
                    <div className="md:w-1/2 h-64 md:h-auto">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name || selectedProduct.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
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
            </>
          )}
        </AnimatePresence>

        {/* Price Inquiry Modal */}
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
                        alt={selectedProduct.name || selectedProduct.title}
                        className="max-h-[70vh] object-contain"
                      />
                    ) : (
                      <div className="text-gray-400 text-lg">No Image Available</div>
                    )}
                  </div>
                  
                  <div className="w-1/2 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">Price Inquiry: {selectedProduct.name || selectedProduct.title}</h3>
                      <button 
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                      >
                        &times;
                      </button>
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
                
                <div className="md:hidden p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">Price Inquiry: {selectedProduct.name || selectedProduct.title}</h3>
                    <button 
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      &times;
                    </button>
                  </div>
                  
                  <div className="mb-4 bg-gray-100 flex items-center justify-center p-4 rounded-lg">
                    {selectedProduct.image ? (
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name || selectedProduct.title}
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