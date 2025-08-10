import React, { useEffect, useState } from "react";
import image1 from "../assets/image/img3.png";
import image2 from "../assets/image/img2.png";
import image3 from "../assets/image/img3.jpg";
import middleSectionBg2 from "../assets/image/midelimage2.png";
import submiddleSectionBg from "../assets/image/logo2.png";
import CardShowcase from "../components/CardShowcase";
import OurStory from "../components/ourstory";
import Certificate from "../components/certificate";
import Feature from "../components/feature";

const images = [image1, image2, image3];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div>
      <div className="relative  w-full h-[30vh] sm:h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>

        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
        >
          &lt;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
        >
          &gt;
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                currentIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <OurStory />

      <div
        className="w-full back bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${middleSectionBg2})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="w-full lg:w-2/3 bg-black/70 backdrop-blur-lg rounded-xl p-8 shadow-lg">
              <h2 className="text-4xl font-bold mb-4 text-white">
                Welcome to Jyot sequence{" "}
              </h2>
              <p className="text-xl mb-6 text-gray-200">
                Creating exceptional digital experiences for your talent journey
              </p>
              <p className="text-base text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                in dui mauris. Vivamus hendrerit arcu sed erat molestie
                vehicula. Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </p>
              <button className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition">
                Discover More
              </button>
            </div>
            <div className="overflow-hidden rounded-full">
              <img
                src={submiddleSectionBg}
                alt="Company Logo"
                className="w-full h-full object-contain mt-6 animate-roll"
              />
            </div>
          </div>
        </div>
      </div>

      <CardShowcase />
      <Feature />
      <Certificate />
    </div>
  );
}

export default Home;
