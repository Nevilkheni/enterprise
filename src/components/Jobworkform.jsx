import React, { useState } from 'react';

const JobWorkForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    option: 'With Roll',
    length: '',
    width: '',
    micron: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (isOrder) => {
    if (!formData.name || !formData.mobile || !formData.length || !formData.width) {
      alert('Please fill in all required fields');
      return;
    }

    let message = `Hello! I would like to ${isOrder ? 'place an order' : 'get price'} for job work.%0A%0A`;
    message += `*Name:* ${formData.name}%0A`;
    message += `*Mobile:* ${formData.mobile}%0A`;
    if (formData.email) message += `*Email:* ${formData.email}%0A`;
    message += `*Option:* ${formData.option}%0A`;
    message += `*Length:* ${formData.length} meters%0A`;
    message += `*Width:* ${formData.width} mm%0A`;
    if (formData.micron) message += `*Micron:* ${formData.micron}%0A%0A`;
    message += `${isOrder ? 'Order Request' : 'Price Quote Request'}`;

    window.open(`https://wa.me/916351091508?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-red-400 text-white p-2 text-center">
          <h1 className="font-bold font-michroma text-md md:text-2xl">Job Work Form</h1>
          <p className="opacity-90 mt-1 text-xs font-josefin md:text-lg">Fill in the details to get price or place order</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-400 transition"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Enter your mobile number"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Enter your email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4 mt-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="withRoll"
                  name="option"
                  value="With Roll"
                  checked={formData.option === 'With Roll'}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="withRoll" className="ml-2 block text-sm text-gray-700">
                  With Roll
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="withoutRoll"
                  name="option"
                  value="Without Roll"
                  checked={formData.option === 'Without Roll'}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="withoutRoll" className="ml-2 block text-sm text-gray-700">
                  Without Roll
                </label>
              </div>
            </div>
            
            {formData.option === 'With Roll' && (
              <div className="mt-3 bg-blue-50 border-l-4 border-red-500 p-3 text-sm">
                Note: Only jobwork price will be calculated.
              </div>
            )}
            
            {formData.option === 'Without Roll' && (
              <div className="mt-3 bg-blue-50 border-l-4 border-red-500 p-3 text-sm">
                Note: Roll + Jobwork = Product price
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
              Length in meters <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="length"
              name="length"
              value={formData.length}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Enter length in meters"
              step="0.01"
              min="0"
            />
          </div>
          
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
              Width in mm <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Enter width in mm"
              step="0.01"
              min="0"
            />
          </div>
          
          <div>
            <label htmlFor="micron" className="block text-sm font-medium text-gray-700 mb-1">
              Micron (optional)
            </label>
            <input
              type="number"
              id="micron"
              name="micron"
              value={formData.micron}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              placeholder="Enter micron value"
              step="0.01"
              min="0"
            />
          </div>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pt-4">
            <button 
              type="button" 
              className="flex-1 font-michroma text-sm flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
              onClick={() => handleSubmit(false)}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.49"/>
              </svg>
              Get Price
            </button>
            <button 
              type="button" 
              className="flex-1 font-michroma text-sm flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
              onClick={() => handleSubmit(true)}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.49"/>
              </svg>
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWorkForm;