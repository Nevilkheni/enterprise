import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, IndianRupee, ArrowLeft, CheckCircle, User, MapPin, Mail, Phone } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const validateForm = () => {
    const newErrors = {};
    
    // Validate customer details
    if (!customerDetails.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!customerDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!customerDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerDetails.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }
    if (!customerDetails.address.trim()) newErrors.address = 'Address is required';
    if (!customerDetails.city.trim()) newErrors.city = 'City is required';
    if (!customerDetails.state.trim()) newErrors.state = 'State is required';
    if (!customerDetails.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{6}$/.test(customerDetails.zipCode)) {
      newErrors.zipCode = 'Invalid zip code (6 digits required)';
    }
    
    // Validate payment details based on method
    if (paymentMethod === 'card') {
      if (!cardDetails.number.trim() || cardDetails.number.replace(/\D/g, '').length !== 16) {
        newErrors.cardNumber = 'Valid card number is required (16 digits)';
      }
      if (!cardDetails.name.trim()) newErrors.cardName = 'Cardholder name is required';
      if (!cardDetails.expiry.trim() || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        newErrors.cardExpiry = 'Valid expiry date is required (MM/YY)';
      }
      if (!cardDetails.cvv.trim() || !/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cardCvv = 'Valid CVV is required (3-4 digits)';
      }
    } else if (paymentMethod === 'upi') {
      if (!customerDetails.upiId || !/^[\w.-]+@[\w]+$/.test(customerDetails.upiId)) {
        newErrors.upiId = 'Valid UPI ID is required (e.g., name@upi)';
      }
    } else if (paymentMethod === 'netbanking') {
      if (!customerDetails.selectedBank) {
        newErrors.selectedBank = 'Please select a bank';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardDetails(prev => ({
      ...prev,
      expiry: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const proceedToInvoice = () => {
    navigate('/invoice', { 
      state: { 
        cart, 
        customerDetails,
        paymentDetails: paymentMethod === 'card' ? cardDetails : 
                        paymentMethod === 'upi' ? { upiId: customerDetails.upiId } : 
                        { bank: customerDetails.selectedBank },
        paymentMethod,
        subtotal,
        gst,
        grandTotal
      } 
    });
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-indigo-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <CheckCircle className="h-16 w-16 text-green-500" strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your order has been processed successfully.</p>
          
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">
              Order Total: <IndianRupee className="inline h-4 w-4" /> 
              {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-700 mb-2">Shipping to:</h3>
            <p className="text-gray-600">{customerDetails.fullName}</p>
            <p className="text-gray-600">{customerDetails.address}</p>
            <p className="text-gray-600">{customerDetails.city}, {customerDetails.state} - {customerDetails.zipCode}</p>
            <p className="text-gray-600">{customerDetails.phone}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={proceedToInvoice}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            View Invoice
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center mb-8"
        >
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information Section */}
            <motion.div 
              layout
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer Information
                </h2>
              </div>
              
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      name="fullName"
                      value={customerDetails.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={customerDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerDetails.phone}
                        onChange={handleInputChange}
                        placeholder="Enter 10-digit phone"
                        maxLength="10"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                    <input
                      type="text"
                      name="address"
                      value={customerDetails.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                      <input
                        type="text"
                        name="city"
                        value={customerDetails.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                      <input
                        type="text"
                        name="state"
                        value={customerDetails.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code*</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={customerDetails.zipCode}
                        onChange={handleInputChange}
                        placeholder="6-digit code"
                        maxLength="6"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Payment Method Section */}
            <motion.div 
              layout
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3 px-4 rounded-lg border-2 transition ${paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <CreditCard className="h-5 w-5 mx-auto text-gray-700" />
                    <span className="block mt-2 text-sm font-medium">Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-3 px-4 rounded-lg border-2 transition ${paymentMethod === 'upi' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <svg className="h-5 w-5 mx-auto text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10.5 15.97V8.03h3.03l-1.89-3.39h-3.72L6 8.03h3.48v7.94H6l1.92 3.38h3.72l1.89-3.38h-3.03z"/>
                    </svg>
                    <span className="block mt-2 text-sm font-medium">UPI</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`py-3 px-4 rounded-lg border-2 transition ${paymentMethod === 'netbanking' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <svg className="h-5 w-5 mx-auto text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                    </svg>
                    <span className="block mt-2 text-sm font-medium">Net Banking</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number*</label>
                      <input
                        type="text"
                        name="number"
                        value={formatCardNumber(cardDetails.number)}
                        onChange={(e) => setCardDetails(prev => ({
                          ...prev,
                          number: e.target.value.replace(/\D/g, '')
                        }))}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name*</label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardInputChange}
                        placeholder="Name on card"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date*</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className={`w-full px-4 py-3 rounded-lg border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV*</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails(prev => ({
                            ...prev,
                            cvv: e.target.value.replace(/\D/g, '')
                          }))}
                          placeholder="123"
                          maxLength="4"
                          className={`w-full px-4 py-3 rounded-lg border ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {errors.cardCvv && <p className="mt-1 text-sm text-red-600">{errors.cardCvv}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID*</label>
                      <input
                        type="text"
                        name="upiId"
                        value={customerDetails.upiId || ''}
                        onChange={(e) => setCustomerDetails(prev => ({
                          ...prev,
                          upiId: e.target.value
                        }))}
                        placeholder="yourname@upi"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {errors.upiId && <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>}
                    </div>
                    <div className="text-sm text-gray-500">
                      You'll be redirected to your UPI app to complete the payment
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'netbanking' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank*</label>
                      <select 
                        value={customerDetails.selectedBank || ''}
                        onChange={(e) => setCustomerDetails(prev => ({
                          ...prev,
                          selectedBank: e.target.value
                        }))}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.selectedBank ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                      >
                        <option value="">Select your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">AXIS Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                      </select>
                      {errors.selectedBank && <p className="mt-1 text-sm text-red-600">{errors.selectedBank}</p>}
                    </div>
                    <div className="text-sm text-gray-500">
                      You'll be redirected to your bank's website to complete the payment
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                    <span className="font-medium">
                      <IndianRupee className="inline h-4 w-4" />
                      {subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-medium">
                      <IndianRupee className="inline h-4 w-4" />
                      {gst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-indigo-600">
                      <IndianRupee className="inline h-5 w-5" />
                      {grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold text-white transition ${isProcessing ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ${grandTotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })}`
                  )}
                </button>

                <div className="mt-4 text-xs text-gray-500">
                  By completing your purchase you agree to our Terms of Service
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;