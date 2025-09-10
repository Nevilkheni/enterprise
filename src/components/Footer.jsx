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

  const socialIconVariants = {
    hover: { scale: 1.15, y: -3 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white pt-16 pb-8 px-6 overflow-hidden"
    >
      {/* subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Top Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Contact */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-michroma font-bold text-red-400">
              Contact Us
            </h3>
            <motion.div whileHover={{ x: 5 }} className="flex space-x-3">
              <Mail className="h-5 w-5 text-red-400 mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-300">jyotenterprise135@gmail.com</p>
              </div>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} className="flex space-x-3">
              <Phone className="h-5 w-5 text-red-400 mt-1" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-300">+91 9426154135</p>
                <p className="text-gray-300">+91 9375776364</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-michroma font-bold text-red-400">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Home", path: "/home" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "All Product", path: "/" },
                { name: "Privacy Policy", path: "/privacy" },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  variants={itemVariants}
                  whileHover={{ x: 5, color: "#fff" }}
                  href={link.path}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Business Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-michroma font-bold text-red-400">
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

          {/* Newsletter + Social */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-michroma font-bold text-red-400">
              Stay Connected
            </h3>

            {/* Subscribe box */}
            <form className="flex rounded-lg overflow-hidden border border-gray-700">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 bg-transparent text-gray-200 placeholder-gray-500 outline-none"
              />
              <button className="px-4 bg-red-500 hover:bg-red-600 transition">
                Subscribe
              </button>
            </form>

            {/* Socials */}
            <div className="flex space-x-4">
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
              ].map((s, i) => (
                <motion.a
                  key={i}
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.color} p-3 rounded-full text-white shadow-md hover:shadow-lg transition`}
                  aria-label={s.label}
                >
                  <s.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
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
              (item, i) => (
                <motion.a
                  key={i}
                  whileHover={{ color: "#fff", x: 2 }}
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
