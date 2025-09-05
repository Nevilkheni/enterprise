

import React, { useState } from "react";

const JobWorkForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    option: "With Roll",
    length: "",
    width: "",
    micron: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); // error clear when typing
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!formData.length || formData.length <= 0)
      newErrors.length = "Length must be greater than 0";
    if (!formData.width || formData.width <= 0)
      newErrors.width = "Width must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (isOrder) => {
    if (!validateForm()) return;

    let message = `Hello! I would like to ${
      isOrder ? "place an order" : "get price"
    } for job work.\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Mobile:* ${formData.mobile}\n`;
    if (formData.email) message += `*Email:* ${formData.email}\n`;
    message += `*Option:* ${formData.option}\n`;
    message += `*Length:* ${formData.length} meters\n`;
    message += `*Width:* ${formData.width} mm\n`;
    if (formData.micron) message += `*Micron:* ${formData.micron}\n\n`;
    message += `${isOrder ? "Order Request" : "Price Quote Request"}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/916351091508?text=${encodedMessage}`, "_blank");

    // reset form after submit
    setFormData({
      name: "",
      mobile: "",
      email: "",
      option: "With Roll",
      length: "",
      width: "",
      micron: "",
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-red-400 text-white p-2 text-center">
          <h1 className="font-bold font-michroma text-md md:text-2xl">
            Job Work Form
          </h1>
          <p className="opacity-90 mt-1 text-xs font-josefin md:text-lg">
            Fill in the details to get price or place order
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 transition-all duration-300 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mobile number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 transition-all duration-300 ${
                errors.mobile ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your mobile number"
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 transition-all duration-300"
              placeholder="Enter your email address"
            />
          </div>

          {/* Option */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Option <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  id="withRoll"
                  name="option"
                  value="With Roll"
                  checked={formData.option === "With Roll"}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">With Roll</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  id="withoutRoll"
                  name="option"
                  value="Without Roll"
                  checked={formData.option === "Without Roll"}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Without Roll</span>
              </label>
            </div>

            {formData.option === "With Roll" && (
              <div className="mt-3 bg-blue-50 border-l-4 border-red-500 p-3 text-sm">
                Note: Only jobwork price will be calculated.
              </div>
            )}

            {formData.option === "Without Roll" && (
              <div className="mt-3 bg-blue-50 border-l-4 border-red-500 p-3 text-sm">
                Note: Roll + Jobwork = Product price
              </div>
            )}
          </div>

          {/* Length */}
          <div>
            <label
              htmlFor="length"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Length in meters <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="length"
              name="length"
              value={formData.length}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 transition-all duration-300 ${
                errors.length ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter length in meters"
              step="0.01"
              min="0"
            />
            {errors.length && (
              <p className="text-red-500 text-xs mt-1">{errors.length}</p>
            )}
          </div>

          {/* Width */}
          <div>
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Width in mm <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.width}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 transition-all duration-300 ${
                errors.width ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter width in mm"
              step="0.01"
              min="0"
            />
            {errors.width && (
              <p className="text-red-500 text-xs mt-1">{errors.width}</p>
            )}
          </div>

          {/* Micron */}
          <div>
            <label
              htmlFor="micron"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Micron (optional)
            </label>
            <input
              type="number"
              id="micron"
              name="micron"
              value={formData.micron}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 transition-all duration-300"
              placeholder="Enter micron value"
              step="0.01"
              min="0"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 pt-4">
            <button
              type="button"
              className="flex-1 font-michroma text-sm flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-[1.02]"
              onClick={() => handleSubmit(false)}
            >
              Get Price
            </button>
            <button
              type="button"
              className="flex-1 font-michroma text-sm flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-[1.02]"
              onClick={() => handleSubmit(true)}
            >
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobWorkForm;
