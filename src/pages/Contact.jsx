import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert("Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const isFormValid = form.name && form.email && form.message;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-600 mb-3">
        Get in Touch
      </h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        We'd love to hear from you! Whether you have a question about products,
        pricing, or anything else — our team is ready to answer all your
        questions.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 text-sm text-center">Message sent successfully!</p>
          )}
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-4">
            <MapPin className="text-blue-600 w-6 h-6" />
            <div>
              <p className="font-medium text-gray-800">Our Office</p>
              <p className="text-gray-500 text-sm">123 Tech Street, Mumbai, India</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Phone className="text-blue-600 w-6 h-6" />
            <div>
              <p className="font-medium text-gray-800">Phone</p>
              <p className="text-gray-500 text-sm">+91 98765 43210</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Mail className="text-blue-600 w-6 h-6" />
            <div>
              <p className="font-medium text-gray-800">Email</p>
              <p className="text-gray-500 text-sm">support@techstore.com</p>
            </div>
          </div>

          <div className="mt-6">
            <iframe
              title="Our Location on Google Maps"
              aria-label="Google Maps location of Tech Store office"
              className="w-full rounded-xl shadow-md"
              height="250"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160977339!2d72.7410994!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzU2LjAiTiA3MsKwNDQnMjMuMCJF!5e0!3m2!1sen!2sin!4v1678890000000!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
