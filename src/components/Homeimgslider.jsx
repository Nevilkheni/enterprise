
import React, { useEffect, useState } from "react";
import image1 from "../assets/image/img1.jpg";
import image2 from "../assets/image/img2.jpg";
import image3 from "../assets/image/img3.jpg";

const images = [image1, image2, image3];

function HomeImgSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true); 

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 200); 
  };

  const goToNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(true);
    }, 200);
  };

  return (
    <div className="relative mt-2 w-full h-[30vh] sm:h-[25vh] md:h-[45vh] lg:h-[50vh] overflow-hidden">
      <div
        className={`w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
          fade ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <button
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-10 h-10"
      >
        &lt;
      </button>
      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-10 h-10"
      >
        &gt;
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-500 rounded-full ${
              currentIndex === index
                ? "bg-white w-6 h-3"
                : "bg-white/50 w-3 h-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeImgSlider;
