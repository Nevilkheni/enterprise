// import React from "react";
// import { Mail, Phone, Instagram, Youtube, Facebook } from "lucide-react";
// import { motion } from "framer-motion";

// const Footer = () => {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   const TelegramIcon = (props) => (
//     <svg
//       xmlns="../assets/image/Telegram-icon-on-transparent-background-PNG.png"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       className="h-5 w-5"
//       {...props}
//     >
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.78 5.42-.9 6.8-.06.67-.36.89-.89.56-2.45-1.83-3.57-2.98-5.79-4.78-.51-.41-.88-.62-.82-.92.05-.29.58-.3 1.03-.23.53.09 3.47 2.23 3.87 2.49.39.26.67.38.73.64.06.26-.14.41-.61.65-1.01.5-2.87 1.45-3.46 1.7-.59.25-1.13.38-1.62.35-.53-.04-1.55-.32-2.3-.58-.91-.32-1.62-.49-1.56-1.03.03-.33.4-.67 1.1-1.03 4.17-2.53 6.96-4.23 8.38-5.1.89-.55 1.71-.82 1.95-.75.45.14.65.84.49 2.35z"/>
//     </svg>
//   );

//   const socialIconVariants = {
//     hover: { scale: 1.1, y: -3 },
//     tap: { scale: 0.95 },
//   };

//   return (
//     <motion.footer
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, margin: "-100px" }}
//       className="bg-gradient-to-r from-gray-800 to-gray-900 text-white pt-12 pb-6 px-4 sm:px-6"
//     >
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           variants={containerVariants}
//           className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
//         >
//           <motion.div variants={itemVariants} className="space-y-4">
//             <h3 className="text-xl font-michroma font-bold text-red-400 mb-4">
//               Contact Us
//             </h3>
//             <motion.div
//               whileHover={{ x: 5 }}
//               className="flex items-start space-x-3"
//             >
//               <Mail className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
//               <div>
//                 <p className="font-medium">Email</p>
//                 <p className="text-gray-300">jyotenterprise135@gmail.com</p>
//               </div>
//             </motion.div>
//             <motion.div
//               whileHover={{ x: 5 }}
//               className="flex items-start space-x-3"
//             >
//               <Phone className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
//               <div>
//                 <p className="font-medium">Phone</p>
//                 <p className="text-gray-300">+91 9426154135</p>
//                 <p className="text-gray-300">+91 9375776364</p>
//               </div>
//             </motion.div>
//           </motion.div>

//           <motion.div variants={itemVariants} className="space-y-4">
//             <h3 className="text-xl font-michroma  font-bold text-red-400 mb-4">
//               Quick Links
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { name: "Home", path: "/home" },
//                 { name: "Products", path: "/products" },
//                 { name: "About Us", path: "/about" },
//                 { name: "Contact", path: "/contact" },
//                 { name: "Allproduct", path: "/" },
//                 { name: "Privacy Policy", path: "/privacy" },
//               ].map((link, index) => (
//                 <motion.a
//                   key={index}
//                   variants={itemVariants}
//                   whileHover={{
//                     x: 5,
//                     color: "#ffffff",
//                   }}
//                   href={link.path}
//                   className="text-gray-300 transition-colors"
//                 >
//                   {link.name}
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div variants={itemVariants} className="space-y-4">
//             <h3 className="text-xl font-michroma font-bold text-red-400 mb-4">
//               Business Info
//             </h3>
//             <motion.div
//               whileHover={{ x: 5 }}
//               className="flex items-start"
//             >
//               <div>
//                 <p className="font-medium">GSTIN</p>
//                 <p className="text-gray-300">24ABCDE1234F1Z5</p>
//               </div>
//             </motion.div>
//             <motion.div
//               whileHover={{ x: 5 }}
//               className="flex items-start"
//             >
//               <div>
//                 <p className="font-medium">59-60 Vibhag-2,</p>
//                 <p className="text-gray-300">Ghanshyamnagar,Opp Chopati Corner,</p>
//                 <p className="text-gray-300">Varachha,Surat,394101</p>
//               </div>
//             </motion.div>
//           </motion.div>

//           <motion.div variants={itemVariants} className="space-y-4">
//             <h3 className="text-xl font-michroma font-bold text-red-400 mb-4">
//               Follow Us
//             </h3>
//             <div className="flex space-x-4">
//               {[
//                 {
//                   icon: Instagram,
//                   url: "https://www.instagram.com/jyotenterprice?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
//                   color: "bg-pink-600",
//                   label: "Instagram"
//                 },
//                 {
//                   icon: Youtube,
//                   url: "https://youtube.com/@khenidhansukh2439?si=QqCDUbVKd2UKPshU",
//                   color: "bg-red-700",
//                   label: "YouTube"
//                 },
//                 {
//                   icon: Facebook,
//                   url: "https://www.facebook.com/share/1BGN5w8iqJ/",
//                   color: "bg-blue-600",
//                   label: "Facebook"
//                 },
//                 {
//                   icon: TelegramIcon,
//                   url: "https://t.me/yourchannel",
//                   color: "bg-blue-500",
//                   label: "Telegram"
//                 },
//               ].map((social, index) => (
//                 <motion.a
//                   key={index}
//                   variants={socialIconVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`${social.color} text-white p-3 rounded-full transition-all duration-100`}
//                   aria-label={social.label}
//                 >
//                   <social.icon className="h-5 w-5" />
//                 </motion.a>
//               ))}
//             </div>
//             <motion.p whileHover={{ x: 5 }} className="text-gray-400 mt-4">
//               Subscribe to our newsletter for the latest updates and offers.
//             </motion.p>
//           </motion.div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.4 }}
//           className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center"
//         >
//           <p className="text-gray-400  font-michroma text-sm">
//             &copy; {new Date().getFullYear()} Jyot Enterprise. All rights
//             reserved.
//           </p>
//           <div className="flex space-x-4 mt-4 md:mt-0">
//             {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
//               (item, index) => (
//                 <motion.a
//                   key={index}
//                   whileHover={{ color: "#ffffff", x: 2 }}
//                   href="/"
//                   className="text-gray-400 text-sm transition-colors"
//                 >
//                   {item}
//                 </motion.a>
//               )
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </motion.footer>
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // ✅ Fixed Telegram SVG
  const TelegramIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 
      10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 
      1.58-.78 5.42-.9 6.8-.06.67-.36.89-.89.56
      -2.45-1.83-3.57-2.98-5.79-4.78-.51-.41-.88
      -.62-.82-.92.05-.29.58-.3 1.03-.23.53.09 
      3.47 2.23 3.87 2.49.39.26.67.38.73.64.06.26
      -.14.41-.61.65-1.01.5-2.87 1.45-3.46 1.7
      -.59.25-1.13.38-1.62.35-.53-.04-1.55-.32
      -2.3-.58-.91-.32-1.62-.49-1.56-1.03.03-.33.4
      -.67 1.1-1.03 4.17-2.53 6.96-4.23 8.38-5.1.89
      -.55 1.71-.82 1.95-.75.45.14.65.84.49 2.35z"
      />
    </svg>
  );

  const socialIconVariants = {
    hover: { scale: 1.1, y: -3 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white pt-12 pb-6 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
        >
          {/* Contact */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-michroma font-bold text-red-400 mb-4">
              Contact Us
            </h3>
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

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-michroma font-bold text-red-400 mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Home", path: "/home" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "All Product", path: "/" },
                { name: "Privacy Policy", path: "/privacy" },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5, color: "#ffffff" }}
                  href={link.path}
                  className="text-gray-300 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Business Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-michroma font-bold text-red-400 mb-4">
              Business Info
            </h3>
            <motion.div whileHover={{ x: 5 }}>
              <p className="font-medium">GSTIN</p>
              <p className="text-gray-300">24ABCDE1234F1Z5</p>
            </motion.div>
            <motion.div whileHover={{ x: 5 }}>
              <p className="font-medium">Address</p>
              <p className="text-gray-300">59-60 Vibhag-2,</p>
              <p className="text-gray-300">
                Ghanshyamnagar, Opp Chopati Corner,
              </p>
              <p className="text-gray-300">Varachha, Surat, 394101</p>
            </motion.div>
          </motion.div>

          {/* Social */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-michroma font-bold text-red-400 mb-4">
              Follow Us
            </h3>
            <div className="flex flex-wrap  space-x-4">
              {[
                {
                  icon: Instagram,
                  url: "https://www.instagram.com/jyotenterprice",
                  color: "bg-pink-600",
                  label: "Instagram",
                },
                {
                  icon: Youtube,
                  url: "https://youtube.com/@khenidhansukh2439",
                  color: "bg-red-700",
                  label: "YouTube",
                },
                {
                  icon: Facebook,
                  url: "https://www.facebook.com/share/1BGN5w8iqJ/",
                  color: "bg-blue-600",
                  label: "Facebook",
                },
                {
                  icon: TelegramIcon,
                  url: "https://t.me/yourchannel",
                  color: "bg-blue-500",
                  label: "Telegram",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} text-white p-3 rounded-full transition-all duration-100`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            <motion.p whileHover={{ x: 5 }} className="text-gray-400 mt-4">
              Subscribe to our newsletter for the latest updates and offers.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 font-michroma text-sm">
            &copy; {new Date().getFullYear()} Jyot Enterprise. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
              (item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ color: "#ffffff", x: 2 }}
                  href="/"
                  className="text-gray-400 text-sm transition-colors"
                >
                  {item}
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
