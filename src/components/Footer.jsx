// import React from "react";
// import { Mail, Phone, Instagram, Youtube, Facebook } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white pt-12 pb-6 px-4 sm:px-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-red-400 mb-4">Contact Us</h3>
//             <div className="flex items-start space-x-3">
//               <Mail className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
//               <div>
//                 <p className="font-medium">Email</p>
//                 <p className="text-gray-300">jyotenterprise135@gmail.com</p>
//               </div>
//             </div>
//             <div className="flex items-start space-x-3">
//               <Phone className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
//               <div>
//                 <p className="font-medium">Phone</p>
//                 <p className="text-gray-300">+91 9426154135</p>
//                 <p className="text-gray-300">+91 9375776364</p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-red-400 mb-4">
//               Quick Links
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               <a
//                 href="/home"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Home
//               </a>
//               <a
//                 href="/products"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Products
//               </a>
//               <a
//                 href="/about"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 About Us
//               </a>
//               <a
//                 href="/contact"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Contact
//               </a>
//               <a href="/" className="text-gray-300 hover:text-white transition">
//                 FAQs
//               </a>
//               <a href="/" className="text-gray-300 hover:text-white transition">
//                 Privacy Policy
//               </a>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-xl font-bold text-red-400 mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a
//                 href="https://www.instagram.com/jyotenterprice?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-gray-700 hover:bg-pink-600 text-white p-3 rounded-full transition-all duration-300"
//                 aria-label="Instagram"
//               >
//                 <Instagram className="h-5 w-5" />
//               </a>
//               <a
//                 href="https://youtube.com/@khenidhansukh2439?si=QqCDUbVKd2UKPshU"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-gray-700 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-300"
//                 aria-label="LinkedIn"
//               >
//                 <Youtube className="h-5 w-5" />
//               </a>
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-gray-700 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-300"
//                 aria-label="Facebook"
//               >
//                 <Facebook className="h-5 w-5" />
//               </a>
//             </div>
//             <p className="text-gray-400 mt-4">
//               Subscribe to our newsletter for the latest updates and offers.
//             </p>
//             {/* <div className="flex">
//               <input 
//                 type="email" 
//                 placeholder="Your email" 
//                 className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
//               />
//               <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-r-lg transition">
//                 Subscribe
//               </button>
//             </div> */}
//           </div>
//         </div>

//         <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-400 text-sm">
//             &copy; 2025 Jyot Enterprise. All rights reserved.
//           </p>
//           <div className="flex space-x-4 mt-4 md:mt-0">
//             <a
//               href="/"
//               className="text-gray-400 hover:text-white text-sm transition"
//             >
//               Terms of Service
//             </a>
//             <a
//               href="/"
//               className="text-gray-400 hover:text-white text-sm transition"
//             >
//               Privacy Policy
//             </a>
//             <a
//               href="/"
//               className="text-gray-400 hover:text-white text-sm transition"
//             >
//               Cookie Policy
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { Mail, Phone, Instagram, Youtube, Facebook } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    }
  };

  const socialIconVariants = {
    hover: { scale: 1.1, y: -3 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white pt-12 pb-6 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Contact Us Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-red-400 mb-4">Contact Us</h3>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start space-x-3"
            >
              <Mail className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-300">jyotenterprise135@gmail.com</p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-start space-x-3"
            >
              <Phone className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-300">+91 9426154135</p>
                <p className="text-gray-300">+91 9375776364</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-red-400 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Home", path: "/home" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "FAQs", path: "/faqs" },
                { name: "Privacy Policy", path: "/privacy" }
              ].map((link, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    x: 5,
                    color: "#ffffff"
                  }}
                  href={link.path}
                  className="text-gray-300 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-red-400 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                {
                  icon: Instagram,
                  url: "https://www.instagram.com/jyotenterprice?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                  color: "bg-pink-600"
                },
                {
                  icon: Youtube,
                  url: "https://youtube.com/@khenidhansukh2439?si=QqCDUbVKd2UKPshU",
                  color: "bg-red-700"
                },
                {
                  icon: Facebook,
                  url: "https://facebook.com",
                  color: "bg-blue-600"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-gray-700 ${social.color} text-white p-3 rounded-full transition-all duration-300`}
                  aria-label={social.icon.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            <motion.p 
              whileHover={{ x: 5 }}
              className="text-gray-400 mt-4"
            >
              Subscribe to our newsletter for the latest updates and offers.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Jyot Enterprise. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item, index) => (
              <motion.a
                key={index}
                whileHover={{ color: "#ffffff", x: 2 }}
                href="/"
                className="text-gray-400 text-sm transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;