import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

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

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === "IN") || countries[0]);

  // Check if product name already exists
  const productNameExists = async (productName) => {
    try {
      const q = query(collection(db, 'allProducts'), where('name', '==', productName));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking product name:", error);
      return false;
    }
  };

  // Add product function (example)
  const addProduct = async (productData) => {
    // Check if product name already exists
    const exists = await productNameExists(productData.name);
    
    if (exists) {
      alert('A product with this name already exists!');
      return false;
    }
    
    try {
      const docRef = await addDoc(collection(db, 'allProducts'), productData);
      console.log("Product added with ID: ", docRef.id);
      
      // Update local state
      setProducts(prevProducts => [...prevProducts, { id: docRef.id, ...productData }]);
      return true;
    } catch (error) {
      console.error("Error adding product: ", error);
      return false;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'allProducts'));
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

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
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
      productName: product.name,
      productImage: product.image || '',
      productDescription: product.description || ''
    });
    setIsPriceModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPriceModalOpen(false);
    setSelectedProduct(null);
    setShowCountryDropdown(false);
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

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      <p className="mt-2">Loading products...</p>
    </div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">
      {error}
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
      
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

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? 'No products match your search' : 'No products available'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
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
                
              </div>
            </div>
          ))}
        </div>
      )}

     {isModalOpen && selectedProduct && (
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-product.png";
              }}
            />
          ) : (
            <div className="text-gray-400 text-lg">No Image Available</div>
          )}
        </div>
        
        <div className="w-1/2 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
            <button 
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-4 flex-grow">
            <p className="text-gray-700">
              {selectedProduct.description || "No description available"}
            </p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => {
                setIsModalOpen(false);
                openPriceModal(selectedProduct);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              disabled={!user}
            >
              Get Price
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
      <div className="md:hidden">
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
            <button 
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
          </div>
          
          <div className="aspect-square bg-gray-100 flex items-center justify-center mb-4 rounded-lg">
            {selectedProduct.image ? (
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-48 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-product.png";
                }}
              />
            ) : (
              <div className="text-gray-400 text-lg">No Image Available</div>
            )}
          </div>
          
          <div className="space-y-3">
            <p className="text-gray-700">
              {selectedProduct.description || "No description available"}
            </p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => {
                setIsModalOpen(false);
                openPriceModal(selectedProduct);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              disabled={!user}
            >
              Get Price
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-product.png";
              }}
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
                  <span className="mr-2">{selectedCountry.flag}</span>
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
                        <span className="mr-2">{country.flag}</span>
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
                Send 
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="md:hidden p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">Price Inquiry: {selectedProduct.name}</h3>
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
              alt={selectedProduct.name}
              className="h-32 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/placeholder-product.png";
              }}
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
                <span className="mr-2">{selectedCountry.flag}</span>
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
                      <span className="mr-2">{country.flag}</span>
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
    </div>
  );
}

export default AllProducts;