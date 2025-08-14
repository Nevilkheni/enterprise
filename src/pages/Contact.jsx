import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
import emailjs from 'emailjs-com';

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const serviceId = 'service_wh40pf9';
    const templateId = 'template_9myv7i9'; 
    const userId = '5bOthriCx1s6kYody'; 

    emailjs.sendForm(serviceId, templateId, e.target, userId)
      .then((result) => {
        console.log(result.text);
        setSubmitted(true);
        setIsLoading(false);
        setForm({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }, (error) => {
        console.log(error.text);
        setError('Failed to send message. Please try again later.');
        setIsLoading(false);
      });
  };

  const handleEmailClick = () => {
    const email = 'nevilkheni135@gmail.com';
    const subject = 'Contact from Website';
    const body = 'Hello, I would like to get in touch...\n\n';
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setTimeout(() => {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        '_blank'
      );
    }, 300);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('nevilkheni135@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = form.name && form.email && form.phone && form.message;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or want to get in touch? We'd love to hear from you!
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-red-600 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="Name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      placeholder="+91 1234567890"
                      pattern="[0-9]{10}"
                      title="Please enter a 10-digit phone number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className={`w-full flex justify-center items-center py-4 px-6 rounded-lg font-medium text-white transition-all ${
                      isFormValid
                        ? "bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
                        : "bg-gray-400 cursor-not-allowed"
                    } ${isLoading ? "opacity-80" : ""}`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {error}
                  </div>
                )}

                {submitted && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Your message has been sent successfully!
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Our Address
                      </h3>
                      <p className="mt-1 text-gray-600">
                        59-60 Vibhag-2,Ghanshyamnagar,Chopati Corner
                        Opp,Varachha,Surat{" "}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Phone
                      </h3>
                      <p className="mt-1 text-gray-600">+91 93757 76363</p>
                      <p className="mt-1 text-gray-600">+91 94261 53135</p>
                      <p className="text-gray-600">Mon-Sat: 8am-8pm</p>
                      <p className="text-gray-600">Sun: 8am-12pm</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Email
                      </h3>
                      <p className="mt-1 text-gray-600">
                        nevilkheni135@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleEmailClick}
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700"
                  >
                    Email Us Directly
                    <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
                  </button>

                  <button 
                    onClick={copyEmailToClipboard}
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    {copied ? 'Copied to Clipboard!' : 'Copy Email Address'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Our Location
                </h3>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <iframe
                    title="Our Location on Google Maps"
                    aria-label="Google Maps location of Tech Store office"
                    className="w-full h-64 sm:h-80"
                    src="https://www.google.com/maps/embed?pb=!1m13!1m11!1m3!1d364.3905791401623!2d72.85945603838168!3d21.208946558260465!2m2!1f0!2f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1754473306618!5m2!1sen!2sin"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;