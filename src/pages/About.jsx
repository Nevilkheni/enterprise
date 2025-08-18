import React from "react";
import { motion } from "framer-motion";
import silver from "../assets/image/silver.jpg";

import machine from "../assets/image/Sequin-Punching-Machine.avif";
import machine1 from "../assets/image/machine.jpg";


const companyHistory = [
  {
    year: "2008",
    title: "Milestone 2008",
    description: "Description for the year 2008 milestone.",
    image: machine,
    imagePosition: "left",
  },
  {
    year: "2009",
    title: "Milestone 2009",
    description: "Description for the year 2009 milestone.",
    image: machine1,
    imagePosition: "right",
  },
  {
    year: "2010",
    title: "Milestone 2010",
    description: "Description for the year 2010 milestone.",
    image: silver,
    imagePosition: "left",
  },
  {
    year: "2011",
    title: "Milestone 2011",
    description: "Description for the year 2011 milestone.",
    image: silver,
    imagePosition: "right",
  },
  {
    year: "2012",
    title: "Milestone 2012",
    description: "Description for the year 2012 milestone.",
    image: silver,
    imagePosition: "left",
  },
  {
    year: "2013",
    title: "Milestone 2013",
    description: "Description for the year 2013 milestone.",
    image: silver,
    imagePosition: "right",
  },
  {
    year: "2014",
    title: "Milestone 2014",
    description: "Description for the year 2014 milestone.",
    image: silver,
    imagePosition: "left",
  },
  {
    year: "2015",
    title: "Milestone 2015",
    description: "Description for the year 2015 milestone.",
    image: silver,
    imagePosition: "right",
  },
  {
    year: "2016",
    title: "Milestone 2016",
    description: "Description for the year 2016 milestone.",
    image: silver,
    imagePosition: "left",
  },
  {
    year: "2017",
    title: "Milestone 2017",
    description: "Description for the year 2017 milestone.",
    image: silver,
    imagePosition: "right",
  },
  {
    year: "2018",
    title: "Milestone 2018",
    description: "Description for the year 2018 milestone.",
    image: silver,
    imagePosition: "left",
  },
  {
    year: "2019",
    title: "Milestone 2019",
    description: "Description for the year 2019 milestone.",
    image: silver,
    imagePosition: "right",
  },
  {
    year: "2020",
    title: "Milestone 2020",
    description: "Description for the year 2020 milestone.",
    image: silver,
    imagePosition: "left",
  },
  {
    year: "2021",
    title: "Milestone 2021",
    description: "Description for the year 2021 milestone.",
    image: silver,
    imagePosition: "right",
  },
  {
    year: "2022",
    title: "Milestone 2022",
    description: "Description for the year 2022 milestone.",
    image: silver,
    imagePosition: "left",
  },
  {
    year: "2023",
    title: "Milestone 2023",
    description: "Description for the year 2023 milestone.",
    image: silver,
    imagePosition: "right",
  },
  {
    year: "2024",
    title: "Milestone 2024",
    description: "Description for the year 2024 milestone.",
    image: silver,
    imagePosition: "left",
  },
  {
    year: "2025",
    title: "Milestone 2025",
    description: "Description for the year 2025 milestone.",
    image: silver,
    imagePosition: "right",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const imageVariantsRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          },
        }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl font-michroma  md:text-4xl font-bold text-gray-900 mb-6">
          About Jyot Sequence
        </h1>
        <p className="font-josefin text-lx text-gray-600 max-w-3xl mx-auto">
          From humble beginnings to global technology leader - our journey of
          innovation and customer dedication.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.2 },
          },
        }}
        className="mb-20"
      >
        <div className="bg-gray-50 rounded-xl p-8 md:p-10 shadow-sm">
          <p className="text-gray-700 font-josefin text-lg leading-relaxed mb-4">
            Welcome to <strong className="text-red-600 text-sm font-michroma">Jyot Sequence</strong>,
            your premier destination for cutting-edge technology. Founded in
            2008, we've grown from a small startup to a global leader in tech
            retail, serving millions of customers worldwide.
          </p>
          <p className="text-gray-600 font-josefin text-sm leading-relaxed">
            Our mission is to bridge the gap between innovative technology and
            everyday users. We carefully curate our product selection to bring
            you the best devices that enhance your life while providing
            exceptional customer service at every step.
          </p>
        </div>
      </motion.div>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 h-full w-1 bg-gray-200 transform -translate-x-1/2"></div>

        {companyHistory.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className={`relative mb-16 md:flex ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center justify-between`}
          >
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-16 h-16 bg-red-600 rounded-full items-center justify-center z-10 shadow-lg">
              <span className="text-white font-bold text-lg">{item.year}</span>
            </div>

            <div className="md:hidden mb-4">
              <span className="inline-block px-4 py-2 bg-red-600  text-white font-bold rounded-full">
                {item.year}
              </span>
            </div>

            <motion.div
              custom={index}
              variants={
                item.imagePosition === "left"
                  ? imageVariants
                  : imageVariantsRight
              }
              className={`w-full md:w-5/12 mb-6 md:mb-0 ${
                item.imagePosition === "left" ? "md:pr-8" : "md:pl-8"
              }`}
            >
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover transform hover:scale-105 transition duration-500"
                />
              </div>
            </motion.div>

            <div
              className={`w-full md:w-5/12 ${
                item.imagePosition === "left" ? "md:text-right" : "md:text-left"
              }`}
            >
              <h3 className=" font-bold text-lg font-michroma text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          },
        }}
        className="mt-20 bg-red-400  rounded-xl p-8 md:p-10 text-white"
      >
        <h2 className="text-lg md:text-2xl font-michroma  font-bold mb-6">Our Mission</h2>
        <p className="font-josefin text-lg leading-relaxed  mb-4">
          To empower individuals and businesses through innovative technology
          solutions that simplify lives and drive progress.
        </p>
        <p className="font-josefin text-lg text-red-100 leading-relaxed">
          We believe technology should be accessible, intuitive, and
          transformative. Every product we offer is carefully selected to meet
          our high standards of quality, performance, and value.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
